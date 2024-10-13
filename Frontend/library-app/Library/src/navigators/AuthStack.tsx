import { ScreenName } from '@constants/ScreenName';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginWithAccount from '@screens/Auth/LoginWithAccount';
import { LoginScreen, UserFormScreen } from '@screens/index';
import React from 'react';
const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator initialRouteName={ScreenName.LoginScreen} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={ScreenName.LoginScreen} component={LoginScreen} />
            <Stack.Screen name={ScreenName.UserFormScreen} component={UserFormScreen} />
            <Stack.Screen name={ScreenName.LoginWithAccount} component={LoginWithAccount} />
        </Stack.Navigator>
    )
}

export default AuthStack