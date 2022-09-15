import React, { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { Modal } from 'antd';
import './App.scss';
import Layout from './component/layout';
import Main from './component/main';
import Random from './component/random';
import Releases from './component/releases';
import Schedule from './component/schedule';
import Team from './component/team';
import Login from './component/login';
import Title from './component/common/title';


const modalVpnInfo = () => {
  Modal.info({
    title: 'Необходим VPN для загрузки картинок',
    content: (
      <>
      </>
    ),
    onOk() {},
  });
};

function App() {
  
  function useScript(url: string) {
    useEffect(() => {
      const script = document.createElement("script");
      script.src = url;
      script.async = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }, [url]);
  }

  useEffect(() => {
    modalVpnInfo()
  },[])
  
  useScript('https://cdn.plrjs.com/player/dznytyh3bkh3i/faq2j9euwcuh.js');
  return (
    <div className='appContainer'>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="releases" element={<Releases />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="random" element={<Random />} />
          <Route path="title">
            <Route path=":titleCode" element={<Title />} />
          </Route>
          <Route path="team" element={<Team />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Main />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
