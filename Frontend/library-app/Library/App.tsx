
import Router from '@navigators/Router';
import messaging from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import './reanimatedConfig';
import { ToastConfig } from './src/configs/ToastConfig';
import store from './src/redux/store';



const App = () => {

  const requestUserPermission = async () => {
    const authorizationStatus = await messaging().requestPermission();
    if (authorizationStatus) {
      console.log('Permission status:', authorizationStatus);
    }
  };

  useEffect(() => {
    requestUserPermission();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
        <Toast config={ToastConfig} />
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
