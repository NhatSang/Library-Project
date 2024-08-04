import React, {useCallback} from 'react';
import {Alert, Button, Platform, View} from 'react-native';
import {authorize} from 'react-native-app-auth';
import AzureAuth from 'react-native-azure-auth';
import {envConfig} from './src/constants/envConfig';
import {iUser} from './src/models/iUser';
import SplashScreen from './src/screens/SplashScreen';
import Router from './src/routers/Router';
import { NavigationContainer } from '@react-navigation/native';

const azureauth = new AzureAuth({
  clientId: envConfig.CLIENT_ID,
  tenant: envConfig.TENANT,
});

const configs: any = {
  iddentityserver: {
    issuer: envConfig.ISSUER,
    clientId: envConfig.CLIENT_ID,
    redirectUrl:
      Platform.OS === 'ios'
        ? envConfig.REDIRECT_URL_IOS
        : envConfig.REDIRECT_URL_ANDROID,
    scopes: envConfig.SCOPES,
    additionalParameters: envConfig.ADDITIONAL_PARAMETERS,
  },
};

const App = () => {
  const loginWithMicrosoft = useCallback(async (provider: any) => {
    const config = configs[provider];
    authorize({
      ...config,
      connectionTimeoutSeconds: 5,
      iosPrefersEphemeralSession: true,
    })
      .then(async (response: any) => {
        if (response) {
          const info = await azureauth.auth.msGraphRequest({
            token: response.accessToken,
            path: '/me',
          });
          login(info);
        }
      })
      .catch((error: any) => {
        console.log('error', error);
      });
  }, []);

  const isValidStudentEmail = (email: string) => {
    const studentEmailPattern = /@student\.iuh\.edu\.vn$/;
    return studentEmailPattern.test(email);
  };

  const login = (userInfo: iUser) => {
    if (isValidStudentEmail(userInfo.mail)) {
      console.log('login success');
    } else {
      Alert.alert('Login failed', 'Please use student email to login');
    }
  };

  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
};

export default App;
