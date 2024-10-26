import { MAIN } from '@assets/images'
import AppText from '@components/AppText'
import Space from '@components/Space'
import { fontFamilies } from '@constants/fontFamilies'
import { globalColor } from '@constants/globalColor'
import React from 'react'
import { ImageBackground, Pressable, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AntDesign from 'react-native-vector-icons/AntDesign'

const AccountDetail = ({ navigation }: any) => {
    return (
        <ImageBackground className='flex-1' source={MAIN.BACKGROUND}>
            <SafeAreaView className='flex-1'>
                <View className='flex-row justify-between h-16 items-center px-3'>
                    <Pressable onPress={() => {
                        navigation.goBack()
                    }}>
                        <AntDesign name='left' size={30} color={globalColor.text_dark} />
                    </Pressable>
                    <AppText size={20} color={globalColor.dark} text='Thông tin cá nhân' font={fontFamilies.robotoBold} />
                    <Space width={30} />
                </View>
                <View className='flex-1 justify-center items-center'>
                    <AppText size={20} color={globalColor.dark} text='Thông tin cá nhân' font={fontFamilies.robotoBold} />
                </View>
            </SafeAreaView>
        </ImageBackground>
    )
}

export default AccountDetail