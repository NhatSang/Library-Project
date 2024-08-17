import { LoginScreen, SplashScreen } from '@screens/index';
import React, { useEffect, useState } from 'react';
import MainRouter from './MainRouter';


const Router = () => {
  const [isWelcome, setIsWelcome] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setIsWelcome(false);
    }, 3000);
  }, []);
  const user: any = 'nhan';

  return isWelcome ? <SplashScreen /> : user === 'nhan' ? <MainRouter /> : <LoginScreen />;
};

export default Router;
