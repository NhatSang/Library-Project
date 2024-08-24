import { HOME } from '@assets/images';
import AppText from '@components/AppText';
import { fontFamilies } from '@constants/fontFamilies';
import { globalColor } from '@constants/globalColor';
import { ScreenName } from '@constants/ScreenName';
import React from 'react';
import { FlatList, Image, Pressable, ScrollView, useColorScheme, View } from 'react-native';
import { Badge } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SwiperImage from './book/components/SwiperImage';

const HomeScreen = ({ navigation, route }: any) => {
    const colorScheme = useColorScheme();

    return (
        <SafeAreaView className='flex-1 px-3'>
            <View className='flex-row justify-between py-4 pb-8'>
                <Pressable>
                    <Image source={HOME.AVATAR} className='w-10 h-10' />
                </Pressable>
                <Pressable>
                    <Ionicons name='notifications-sharp' size={40} color={globalColor.primary} />
                    <Badge className='absolute'>3</Badge>
                </Pressable>
                <Pressable
                    onPress={() => { navigation.navigate(ScreenName.SearchScreen) }}
                    className='w-4/6 bg-gray-400 items-center flex-row rounded-xl px-4'>
                    <Ionicons name='search' size={32} />
                    <AppText size={16} color={globalColor.text_light} text='Tên sách, tên ngành ....' />
                </Pressable>
            </View>
            <ScrollView>
                <View className='h-40'>
                    <SwiperImage />
                </View>
                <View className='py-4'>
                    <View className='py-2'>
                        <AppText size={20} font={fontFamilies.robotoBold} text='Sách mới' />
                    </View>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={{ length: 5 }}
                        renderItem={({ item }) => {
                            return (
                                <Pressable
                                    onPress={() => navigation.navigate(ScreenName.BookDetail, { id: '12345678' })}
                                    className='px-6'>
                                    <Image source={HOME.BOOK1} className='w-36 h-48' />
                                    <View className='w-36 justify-center items-center pt-3'>
                                        <AppText center numberOfLines={2} size={16} font={fontFamilies.robotoBold} text='Tư tưởng Hồ Chí Minh' />
                                        <AppText numberOfLines={1} size={12} text='Bộ giáo duc và dào tạo' />
                                    </View>
                                </Pressable>
                            )
                        }}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                    />
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

export default HomeScreen;