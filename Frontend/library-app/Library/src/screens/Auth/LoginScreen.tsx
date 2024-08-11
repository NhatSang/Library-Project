import React, { useCallback } from 'react'
import { Image, ImageBackground, Platform, TouchableHighlight, View } from 'react-native'
import AzureAuth from 'react-native-azure-auth'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LOGIN, MAIN } from '../../assets/images'
import { AppText } from '../../components'
import { envConfig } from '../../constants/envConfig'
import { fontFamilies } from '../../constants/fontFamilies'
import { iUser } from '../../models/iUser'


const azureauth = new AzureAuth({
  clientId: envConfig.CLIENT_ID,
  tenant: envConfig.TENANT,
});

const configs: any = {
  iddentityserver: {
    issuer: envConfig.ISSUER,
    clientId: envConfig.CLIENT_ID,
    redirectUrl:
      Platform.OS === 'ios'
        ? envConfig.REDIRECT_URL_IOS
        : envConfig.REDIRECT_URL_ANDROID,
    scopes: envConfig.SCOPES,
    additionalParameters: envConfig.ADDITIONAL_PARAMETERS,
  },
};

const LoginScreen = ({ navigation }: any) => {

  const handleLogin = useCallback(async (provider: any) => {
    // const config = configs[provider];
    // authorize({
    //   ...config,
    //   connectionTimeoutSeconds: 5,
    //   iosPrefersEphemeralSession: true,
    // })
    //   .then(async (response: any) => {
    //     if (response) {
    //       const info = await azureauth.auth.msGraphRequest({
    //         token: response.accessToken,
    //         path: '/me',
    //       });
    //       login(info);
    //     }
    //   })
    //   .catch((error: any) => {
    //     console.log('error', error);
    //   });
    login('nmhan');
  }, []);

  const isValidStudentEmail = (email: string) => {
    const studentEmailPattern = /@student\.iuh\.edu\.vn$/;
    return studentEmailPattern.test(email);
  };

  const login = (userInfo: iUser) => {
    if (isValidStudentEmail(userInfo.mail)) {
      navigation.navigate('TabRouter');
    } else {
      navigation.navigate('TabRouter');
    }
  };

  return (
    <ImageBackground source={LOGIN.BACKGROUND} className='flex-1' >
      <SafeAreaView className='flex-1 justify-between items-center py-5'>
        <Image source={MAIN.LOGO} className='w-60 h-60' />
        <View className='justify-center items-center mb-40'>
          <AppText text='Wellcome to Library IUH' color='white' size={24} font={fontFamilies.robotoBold} />
          <AppText text='Please login to continue' color='white' size={16} />
        </View>
        <View className='w-full items-center'>
          <TouchableHighlight onPress={() => handleLogin('iddentityserver')} className='bg-primary-dark w-11/12 h-14 justify-center items-center rounded-3xl'>
            <AppText text='Login with mail Student IUH' color='white' size={20} font={fontFamilies.robotoBold} />
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

export default LoginScreen;