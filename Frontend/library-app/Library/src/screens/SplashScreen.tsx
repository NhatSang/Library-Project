import React from 'react';
import {
    ActivityIndicator,
    Image,
    useColorScheme,
    View
} from 'react-native';
import { SPLASH } from '../assets/image';

const SplashScreen = () => {
  const colorScheme = useColorScheme();
  return (
    <View
      className={`flex-1 bg-background-${colorScheme} items-center justify-center `}>
      <Image source={SPLASH.LOGO} className="w-72 h-72" />
      <ActivityIndicator
        size={50}
        className="color-primary absolute bottom-10"
      />
    </View>
  );
};

export default SplashScreen;
