
import { LOGIN, MAIN } from '@assets/images'
import AppButton from '@components/AppButton'
import AppText from '@components/AppText'
import { envConfig } from '@constants/envConfig'
import { fontFamilies } from '@constants/fontFamilies'
import { globalColor } from '@constants/globalColor'
import { ScreenName } from '@constants/ScreenName'
import React, { useCallback, useState } from 'react'
import { Image, ImageBackground, Platform, View } from 'react-native'
import { authorize } from 'react-native-app-auth'
import AzureAuth from 'react-native-azure-auth'
import { SafeAreaView } from 'react-native-safe-area-context'
import { iUser } from 'src/types/iUser'


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
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = useCallback(async (provider: any) => {
    setIsLoading(true);
    // const config = configs[provider];
    // authorize({
    //   ...config,
    //   connectionTimeoutSeconds: 5,
    //   iosPrefersEphemeralSession: false,
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
    try {
      const response = await authorize(configs[provider]);
      if (response) {
        const info = await azureauth.auth.msGraphRequest({
          token: response.accessToken,
          path: '/me',
        });
        login(info);
      }
    } catch (error) {
      console.log('error', error);
    }
  }, []);

  const isValidStudentEmail = (email: string) => {
    const studentEmailPattern = /@student\.iuh\.edu\.vn$/;
    return studentEmailPattern.test(email);
  };

  const login = (userInfo: iUser) => {
    setIsLoading(false);
    if (isValidStudentEmail(userInfo.mail)) {
      navigation.navigate(ScreenName.UserFormScreen);
    } else {
      navigation.navigate(ScreenName.UserFormScreen);
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
          <AppButton
            loading={isLoading}
            onPress={() => { handleLogin('iddentityserver') }}
            title='Tiếp tục'
            type='primary'
            color={globalColor.primary}
            styles={{ width: '80%' }}
            textStyleProps={{ color: globalColor.white, fontSize: 20, fontFamily: fontFamilies.robotoBold }}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

export default LoginScreen;