import { LoginScreen } from '@screens/index';
import SplashScreen from '@screens/SplashScreen';
import React, { useEffect, useState } from 'react';
import MainRouter from './MainRouter';


const Router = () => {
  const [isWelcome, setIsWelcome] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setIsWelcome(false);
    }, 3000);
  }, []);
  const user: any = 'nmhan';

  return isWelcome ? <SplashScreen /> : user ? <MainRouter /> : <LoginScreen />;
};

export default Router;
