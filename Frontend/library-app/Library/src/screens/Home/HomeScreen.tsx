import { HOME } from '@assets/images';
import AppText from '@components/AppText';
import { fontFamilies } from '@constants/fontFamilies';
import { globalColor } from '@constants/globalColor';
import { ScreenName } from '@constants/ScreenName';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, ScrollView, useColorScheme, View } from 'react-native';
import { Badge } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SwiperImage from './book/components/SwiperImage';
import { _getNewestBooks } from './apis';
import { defaultListBook } from '../../types/iBook';

const HomeScreen = ({ navigation, route }: any) => {
    const colorScheme = useColorScheme();
    const [listNewBook, setListNewBook] = useState(defaultListBook);

    useEffect(()=>{
        getNewestBooks();
    },[]);

    const getNewestBooks = async () => {
        try {
            const response = await _getNewestBooks();
            if(response.status === 200){
                setListNewBook(response.data);
            }
        } catch (error) {
            console.log('error',error);
        }
    }

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
                        data={listNewBook}
                        renderItem={({ item }) => {
                            return (
                                <Pressable
                                    onPress={() => navigation.navigate(ScreenName.BookDetail, { item })}
                                    className='px-6'>
                                    <Image source={{uri:item.image}} className='w-36 h-48' />
                                    <View className='w-36 justify-center items-center pt-3'>
                                        <AppText center numberOfLines={2} size={16} font={fontFamilies.robotoBold} text={item.title} />
                                        <AppText numberOfLines={1} size={12} text={item.author} />
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