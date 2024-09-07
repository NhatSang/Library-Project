import { HOME } from '@assets/images';
import AppText from '@components/AppText';
import { fontFamilies } from '@constants/fontFamilies';
import { globalColor } from '@constants/globalColor';
import { ScreenName } from '@constants/ScreenName';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, ScrollView, useColorScheme, View } from 'react-native';
import { Badge } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { iBook } from 'src/types/iBook';
import { _getNewestBooks } from './apis';
import SwiperImage from './book/components/SwiperImage';

const HomeScreen = ({ navigation }: any) => {
    const colorScheme = useColorScheme();
    const [listNewBook, setListNewBook] = useState<iBook[]>([]);
    const [loadImage, setLoadImage] = useState<boolean>(false);

    useEffect(() => {
        getNewestBooks();
    }, []);

    const getNewestBooks = async () => {
        setLoadImage(true);
        try {
            const response = await _getNewestBooks();
            if (response.status) {
                setListNewBook(response.data);
                setLoadImage(false);
            }
        } catch (error) {
            console.log('error', error);
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
                                    className="px-3 mx-1 py-2 rounded-md bg-white">
                                    {
                                        loadImage ? (
                                            <View className="w-36 h-44 rounded-md justify-center items-center">
                                                <ActivityIndicator size="large" color={globalColor.primary} />
                                            </View>
                                        ) : (
                                            <Image resizeMode='stretch' source={{ uri: item.image }} className="w-36 h-44 rounded-md" />
                                        )
                                    }
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
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

export default HomeScreen;