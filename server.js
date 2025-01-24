import express from 'express';
import { ChzzkClient } from 'chzzk';
import url, { fileURLToPath } from 'url';
import cors from 'cors';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, '/dist')));
const options = {
  baseUrls: {
    chzzkBaseUrl: 'https://api.chzzk.naver.com',
    gameBaseUrl: 'https://comm-api.game.naver.com/nng_main',
  },
};

const client = new ChzzkClient(options);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.get('/stream', async (req, res) => {
  // 헤더 설정 (chunked 전송과 텍스트 스트리밍)
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const params = url.parse(req.url, true).query;
  const channelID = params.channelID; //채널 uid
  try {
    // 채팅 인스턴스 생성
    const chzzkChat = client.chat({
      channelId: channelID,
      // chatChannelId 의 변경을 감지하기 위한 polling 요청의 주기 (선택사항, ms 단위)
      // channelId를 지정할 경우 자동으로 30초로 설정됨, 0초로 설정 시 polling 요청을 하지 않음
      pollInterval: 30 * 1000,
    });
    chzzkChat.on('connect', () => {
      console.log('Connected');
    });
    // 일반 채팅
    chzzkChat.on('chat', (chat) => {
      const message = chat.hidden ? '[블라인드 처리 됨]' : chat.message;
      const data = `{"nick": "${chat.profile.nickname}", "msg": "${message}"}`;
      // 클라이언트에 스트리밍 데이터를 전송
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    });

    // 채팅 연결
    await chzzkChat.connect();
    // 클라이언트 연결 종료 시 처리
    req.on('close', () => {
      console.log('Connection closed by client.');
    });
  } catch (error) {
    res.status(500).json({ error: 'error' });
  }
});

app.listen(port, () => console.log(`Server running on port-${port}`));
