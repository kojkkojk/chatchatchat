import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  checkTextWithMultipleFields,
  dcConsData,
  findNameByMatchingFields,
  imgURL,
} from '../data';

const StreamComponent = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const theme = searchParams.get('theme');
  const [data, setData] = useState([]);

  useEffect(() => {
    switch (theme) {
      case 'neos':
        import('../theme/neos/theme.css');
        break;
      case 'pokemon':
        import('../theme/Pokemon/theme.css');
        break;
      case 'PUBG':
        import('../theme/PUBG/theme.css');
        break;
      case 'mac':
        import('../theme/mac/theme.css');
        break;
      case 'basic':
        import('../theme/basic/theme.css');
        break;
      case 'mario':
        import('../theme/mario/theme.css');
        break;
      case 'newdc':
        import('../theme/newdc/theme.css');
        break;
      case 'overwatch':
        import('../theme/overwatch/theme.css');
        break;
      case 'retro':
        import('../theme/retro/theme.css');
        break;
      default:
        import('../theme/default/theme.css');
        break;
    }
  }, [theme]);
  useEffect(() => {
    // const eventSource = new EventSource(`/stream?channelID=${id}`);
    const eventSource = new EventSource(
      `http://localhost:8080/stream?channelID=${id}`
    );
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const parseData = JSON.parse(data);
      setData((prev) => {
        const updated = [...prev, parseData];
        return updated.slice(-10); // 마지막 10개만 유지
      });
    };
    eventSource.onerror = (error) => {
      console.error(error);
      eventSource.close();
    };
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div id="chat_wrapper">
      {data.map((item, index) => (
        <div className="chat_outer_box" key={index}>
          <div className="chat_upper_box">
            <div className="chat_nickname_box">{item.nick}</div>
          </div>
          <div className="chat_lower_box">
            <div className="chat_msg_box">
              {checkTextWithMultipleFields(item.msg, '~', dcConsData, [
                'keywords',
              ]) ? (
                <img
                  className="dccon"
                  src={`${imgURL}${findNameByMatchingFields(
                    item.msg,
                    '~',
                    dcConsData,
                    ['keywords']
                  )}`}
                />
              ) : (
                item.msg
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StreamComponent;
