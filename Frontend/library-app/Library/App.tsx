
import Router from '@navigators/Router';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Toast from 'react-native-toast-message';



const App = () => {
  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <Toast />
    </>
  );
};

export default App;
