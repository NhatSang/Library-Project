import {View, Text} from 'react-native';
import React, {useState} from 'react';
import SplashScreen from '../screens/SplashScreen';
import MainRouter from './MainRouter';
import {LoginScreen} from '../screens';

const Router = () => {
  const [isWelcome, setIsWelcome] = useState<boolean>(false);
  const user: any = 'nmhan';

  return isWelcome ? <SplashScreen /> : user ? <MainRouter /> : <LoginScreen />;
};

export default Router;
