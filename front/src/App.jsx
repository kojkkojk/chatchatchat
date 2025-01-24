import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import './App.css';
import StreamComponent from './components/StreamComponent';

function App() {
  return (
    <>
      <Routes>
        {/* 루트 공통 레이아웃 */}
        <Route path="/" element={<Layout />}>
          {/* 인덱스 라우트 */}
          <Route index element={<Home />} />
          <Route path="/stream" element={<StreamComponent />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
