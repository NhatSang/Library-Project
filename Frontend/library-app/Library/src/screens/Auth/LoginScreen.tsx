import React from 'react'
import { Image, ImageBackground, View } from 'react-native'
import { LOGIN, SPLASH } from '../../assets/image'
import { SafeAreaView } from 'react-native-safe-area-context'

const LoginScreen = () => {
  return (
    <ImageBackground source={LOGIN.BACKGROUND} className='flex-1' >
     <SafeAreaView className='flex-1 justify-between items-center'>
     <Image source={SPLASH.LOGO} className='w-60 h-60' />
      <View>
        
      </View>
     </SafeAreaView>
    </ImageBackground>
  )
}

export default LoginScreen