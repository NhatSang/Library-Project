import AppText from '@components/AppText';
import { fontFamilies } from '@constants/fontFamilies';
import { globalColor } from '@constants/globalColor';
import { isiOS } from '@constants/index';
import { ScreenName } from '@constants/ScreenName';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AccountScreen, HistoryScreen, HomeScreen } from '../screens';
const Tab = createBottomTabNavigator();

const TabRouter = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: globalColor.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        height: isiOS ? 100 : 70,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
      },
      tabBarIcon: ({ focused, color, size }) => {
        color = focused ? globalColor.primary : globalColor.text_dark;
        size = focused ? 28 : 24;
        let name = '';
        let icon = <Entypo name='home' size={size} color={color} />;
        switch (route.name) {
          case ScreenName.HomeScreen:
            name = 'Trang chủ';
            icon = <Entypo name='home' size={size} color={color} />;
            break;
          case ScreenName.HistoryScreen:
            name = 'Lịch sử';
            icon = <MaterialCommunityIcons name='history' size={size} color={color} />
            break;
          case ScreenName.AccountScreen:
            name = 'Cá nhân';
            icon = <MaterialCommunityIcons name='account' size={size} color={color} />
            break;
        }
        return (
          <View
            style={
              focused
                ? {
                  flexDirection: 'row',
                  height: 40,
                  borderRadius: 50,
                  backgroundColor: globalColor.bg_dark,
                }
                : { flexDirection: 'row' }
            }>
            <View
              style={
                focused
                  ? {
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: globalColor.dark,
                  }
                  : undefined
              }>
              {icon}
            </View>
            {focused && <AppText color={globalColor.text_light} styles={{
              alignSelf: 'center',
              fontFamily: fontFamilies.robotoBold,
              paddingHorizontal: 6,
              paddingRight: 9,
            }} text={name} size={14} />}
          </View>
        );
      },
    })}>
      <Tab.Screen name={ScreenName.HomeScreen} component={HomeScreen} />
      <Tab.Screen name={ScreenName.HistoryScreen} component={HistoryScreen} />
      <Tab.Screen name={ScreenName.AccountScreen} component={AccountScreen} />
    </Tab.Navigator>
  )
}

export default TabRouter