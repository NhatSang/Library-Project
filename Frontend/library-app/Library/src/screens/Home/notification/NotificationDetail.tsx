import React, { useEffect, useState } from 'react'
import { FlatList, Image, ImageBackground, Pressable, Text, View } from 'react-native'
import { _getNotificationById } from '../apis';
import { MAIN } from '@assets/images';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalColor } from '@constants/globalColor';
import AppText from '@components/AppText';
import Space from '@components/Space';
import { fontFamilies } from '@constants/fontFamilies';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ScreenName } from '@constants/ScreenName';

const NotificationDetail = ({navigation,route}:any) => {
    const { notification_id } = route.params;
    console.log('notification_id', notification_id);
    const [notificationDetail, setNotificationDetail] = useState<any>({});

    useEffect(() => {
        getNotificationDetail();
    }, []);

    const getNotificationDetail = async () => {
        try {
            const response = await _getNotificationById(notification_id);
            if (response.data) {
                setNotificationDetail(response.data);
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    return (
        <ImageBackground className='flex-1' source={MAIN.BACKGROUND}>
            <SafeAreaView className='flex-1'>
                <View className='flex-row justify-between h-16 items-center px-3'>
                    <Pressable onPress={() => {
                        navigation.goBack()
                    }}>
                        <AntDesign name='left' size={30} color={globalColor.text_dark} />
                    </Pressable>
                    <AppText size={20} color={globalColor.dark} text='Thông báo chi tiết' font={fontFamilies.robotoBold} />
                    <Space width={30} />
                </View>
                <View className='py-4'>
                        {
                            notificationDetail.length > 0 && (
                                <>
                                    <View className='py-2'>
                                        <AppText size={20} font={fontFamilies.robotoBold} text='Gợi ý dành riêng cho bạn' />
                                    </View>
                                    <FlatList
                                        showsHorizontalScrollIndicator={false}
                                        data={notificationDetail}
                                        renderItem={({ item }) => {
                                            console.log('item', item);
                                            return (
                                                <Pressable
                                                    onPress={() => navigation.navigate(ScreenName.BookDetail, { item })}
                                                    className="px-3 mx-1 py-2 rounded-md bg-white">
                                                            <Image resizeMode='stretch' source={{ uri: item.image }} className="w-36 h-44 rounded-md" />
                                                    <View className="w-32 justify-center items-center pt-2">
                                                        <AppText center numberOfLines={2} size={14} font={fontFamilies.robotoBold} text={item.title} />
                                                        <AppText numberOfLines={1} size={11} text={item.author} />
                                                    </View>
                                                </Pressable>
                                            )
                                        }}
                                        keyExtractor={(item, index) => index.toString()}
                                        horizontal
                                    />
                                </>
                            )
                        }

                </View>
            </SafeAreaView>
        </ImageBackground>
    )
}

export default NotificationDetail