import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import SplashScreen from '../screens/SplashScreen';
import { LoginScreen } from '../screens';
const Stack = createNativeStackNavigator();

const MainRouter = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  )
}

export default MainRouter;