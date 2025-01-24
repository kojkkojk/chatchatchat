import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import '../App.css';

function Home() {
  const [channelid, setChannelid] = useState('');
  const [themes, setThemes] = useState('default');
  const navigate = useNavigate();

  const handleGoToUser = (id, themes) => {
    // 동적으로 userId를 포함한 URL로 이동
    navigate(`/stream?id=${id}&theme=${themes}`);
  };
  return (
    <div className="urlCreate">
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth style={{ marginBottom: '50px' }}>
          <InputLabel>채널 ID</InputLabel>
          <Input
            type="text"
            name=""
            id=""
            defaultValue={channelid}
            onChange={(e) => {
              setChannelid(e.target.value);
            }}
          />
        </FormControl>
        <FormControl fullWidth style={{ marginBottom: '50px' }}>
          <InputLabel>테마</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Theme"
            defaultValue="default"
            onChange={(e) => {
              setThemes(e.target.value);
            }}
          >
            <MenuItem value="default">기본</MenuItem>
            <MenuItem value="pokemon">포켓몬</MenuItem>
            <MenuItem value="PUBG">PUBG</MenuItem>
            <MenuItem value="mac">MAC</MenuItem>
            <MenuItem value="neos">네오스</MenuItem>
            <MenuItem value="mario">마리오</MenuItem>
            <MenuItem value="newdc">DC</MenuItem>
            <MenuItem value="overwatch">오버워치</MenuItem>
            <MenuItem value="retro">레트로</MenuItem>
          </Select>
        </FormControl>
        <Stack spacing={2} direction="row">
          <Button
            variant="contained"
            onClick={() => handleGoToUser(channelid, themes)}
          >
            생성
          </Button>
        </Stack>
      </Box>
    </div>
  );
}

export default Home;
