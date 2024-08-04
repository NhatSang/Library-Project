import { View, Text } from 'react-native'
import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

const TabRouter = () => {
  return (
    <Tab.Navigator  screenOptions={{headerShown:false}}>
        <Tab.Screen name="Home" component={() => <View><Text>Home</Text></View>} />
        <Tab.Screen name="Profile" component={() => <View><Text>Profile</Text></View>} />
    </Tab.Navigator>
  )
}

export default TabRouter