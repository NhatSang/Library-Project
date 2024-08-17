import { ScreenName } from '@constants/ScreenName';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DemoDownLoad from '@screens/DemoDownLoad';
import { BookDetail, RatingScreen, ReadText } from '@screens/index';
import React from 'react';
import TabRouter from './TabRouter';
const Stack = createNativeStackNavigator();


const MainRouter = () => {
  return (
    <Stack.Navigator initialRouteName={ScreenName.TabRouter} screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name={ScreenName.LoginScreen} component={LoginScreen} /> */}
      {/* <Stack.Screen name={ScreenName.UserFormScreen} component={UserFormScreen} /> */}
      <Stack.Screen name={ScreenName.DemoDownLoad} component={DemoDownLoad} />
      <Stack.Screen name={ScreenName.TabRouter} component={TabRouter} />
      <Stack.Screen name={ScreenName.BookDetail} component={BookDetail} />
      <Stack.Screen name={ScreenName.ReadText} component={ReadText} />
      <Stack.Screen name={ScreenName.RatingScreen} component={RatingScreen} />
    </Stack.Navigator>
  )
}

export default MainRouter;