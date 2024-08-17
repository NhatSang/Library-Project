import { HOME } from '@assets/images'
import AppButton from '@components/AppButton'
import AppInput from '@components/AppInput'
import AppText from '@components/AppText'
import Rate from '@components/Rate'
import Space from '@components/Space'
import { fontFamilies } from '@constants/fontFamilies'
import { globalColor } from '@constants/globalColor'
import React from 'react'
import { FlatList, Image, Pressable, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AntDesign from 'react-native-vector-icons/AntDesign'


const RatingScreen = ({ navigation, route }: any) => {
    const { id } = route?.params;
    return (
        <SafeAreaView className='flex-1'>
            <View className='flex-row justify-between h-16 items-center px-3'>
                <Pressable onPress={() => {
                    navigation.goBack()
                }}>
                    <AntDesign name='left' size={30} color={globalColor.text_dark} />
                </Pressable>
                <AppText size={20} text='Đánh giá' font={fontFamilies.robotoBold} />
                <Space width={30} />
            </View>
            <View className='pl-3'>
                <AppText size={20} text='Tất cả đánh giá' font={fontFamilies.robotoBold} />
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={{ length: 10 }}
                renderItem={({ item }) => {
                    return (
                        <View className='py-4 px-4'>
                            <View className='flex-row justify-between pb-2'>
                                <View className='flex-row'>
                                    <Image source={HOME.AVATAR} className='w-8 h-8' />
                                    <View className='pl-3'>
                                        <AppText text='Nguyễn Văn A' font={fontFamilies.robotoBold} />
                                        <View>
                                            <Rate rating={4} />
                                        </View>
                                    </View>
                                </View>
                                <AppText text='1 ngày trước' />
                            </View>
                            <AppText text='Sách rất hay, nội dung rất bổ ích, tôi rất thích' />
                        </View>
                    )
                }}
            />
            {/* <View className='flex-1'>
                <View className='flex-row justify-center items-center'>
                    <AppText text={'chưa có đánh giá'} />
                </View>
            </View> */}
            <View className='px-2 h-26 w-full pt-4'>
                <AppText text='Viết đánh giá của bạn' font={fontFamilies.robotoBold} />
                <View className='flex-row px-6 justify-between'>
                    <View className='w-3/4'>
                        <AppInput />
                    </View>
                    <AppButton color={globalColor.primary} styles={{ borderRadius: 10 }} onPress={() => { }} title='Gửi' />
                </View>
                {/* <View className='justify-center items-center'>
                    <AppText font={fontFamilies.robotoBold} text={'Bạn đã đánh giá sách này rồi'} />
                </View> */}
            </View>
        </SafeAreaView>
    )
}

export default RatingScreen