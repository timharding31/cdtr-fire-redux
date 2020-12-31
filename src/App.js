import React from 'react';
import './App.css';
import { useDeviceDetect } from './util/hooks/';
import DesktopApp from './components/desktop';
import MobileApp from './components/mobile';

const App = () => {
  const isMobile = useDeviceDetect();

  return (
    <>
      {isMobile ? <MobileApp /> : <DesktopApp />}
    </>
  );
};

export default App;
