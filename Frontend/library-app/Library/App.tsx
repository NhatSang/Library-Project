
import Router from '@navigators/Router';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import store from './src/redux/store';



const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <Toast />
    </Provider>
  );
};

export default App;
