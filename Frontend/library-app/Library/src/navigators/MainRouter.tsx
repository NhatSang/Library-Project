import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '@screens/index';
import React from 'react';
import TabRouter from './TabRouter';
const Stack = createNativeStackNavigator();


const MainRouter = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="TabRouter" component={TabRouter} />
    </Stack.Navigator>
  )
}

export default MainRouter;