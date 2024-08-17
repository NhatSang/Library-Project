
import { SplashScreen } from '@screens/index';
import { getToken } from '@utils/storage';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../redux/authReducer';
import AuthStack from './AuthStack';
import MainRouter from './MainRouter';


const Router = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);
  const [isWelcome, setIsWelcome] = useState<boolean>(true);

  useEffect(() => {
    checkAuth();
    const timeout = setTimeout(() => {
      setIsWelcome(false);
    }, 3000);
    return () => {
      clearTimeout(timeout);
    }
  }, []);

  const checkAuth = async () => {
    const token = await getToken();
    if (token) {
      dispatch(setAuth(token));
    }
  };

  return isWelcome ? <SplashScreen /> : auth.accessToken ? <MainRouter /> : <AuthStack />;
};

export default Router;
