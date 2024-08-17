import { ScreenName } from '@constants/ScreenName';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { AccountScreen, HomeScreen } from '../screens';
const Tab = createBottomTabNavigator();

const TabRouter = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name={ScreenName.HomeScreen} component={HomeScreen} />
      <Tab.Screen name={ScreenName.AccountScreen} component={AccountScreen} />
    </Tab.Navigator>
  )
}

export default TabRouter