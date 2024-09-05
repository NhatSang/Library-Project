import { View, Text, Pressable, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { _getChapterByIdBook } from '../apis';
import { defaultListChapter, IChapter } from '../../../types/iChapter';
import ImageColors from 'react-native-image-colors';
import { isAndroid } from '@constants/index';
import AppText from '@components/AppText';
import { fontFamilies } from '@constants/fontFamilies';
import { globalColor } from '@constants/globalColor';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Space from '@components/Space';
import { iBook } from 'src/types/iBook';
import { ScreenName } from '@constants/ScreenName';

const ChapterAudio = ({navigation,route}:any) => {
    const { bookDetail } = route?.params;
    const [book, setBook] = useState<iBook>(bookDetail);
    const [chapter, setChapter] = useState<IChapter[]>(defaultListChapter);
    const [background, setBackground] = useState('white');

    useEffect(() => {
        getChapterByIdBook();
    },[]);

    const getChapterByIdBook = async () => {
        try {
            const response = await _getChapterByIdBook(book._id);
            if (response.status === 200) {
                setChapter(response.data);
            }
        } catch (error) {
            console.log('Error getChapterByIdBook: ', error);
        }
    }
    useEffect(() => {
        getImageColors();
    }, [])
    const getImageColors = async () => {
        const result: any = await ImageColors.getColors(book.image, {
            fallback: '#fff',
            cache: true,
            key:book.image,
        });
        setBackground(isAndroid ? result.average : result.secondary);
    };

  return (
    <SafeAreaView className='flex-1' style={{backgroundColor:background}} >
        <View className='flex-row justify-between h-16 items-center px-3'>
                <Pressable onPress={() => {
                    navigation.goBack()
                }}>
                    <AntDesign name='left' size={30} color={globalColor.text_dark} />
                </Pressable>
                <AppText size={28} color={globalColor.text_light} text={book.title} font={fontFamilies.robotoBold} />
                <Space/>
            </View>
            <FlatList
                data={chapter}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <Pressable onPress={() => {
                        navigation.navigate(ScreenName.AudioBook, {
                            chapterBook: item,
                            bookDetail: book
                        });
                    }} className='flex-row justify-between items-center p-6 border-b border-gray-200'>
                        <AppText size={16} color={globalColor.text_light} text={item.title} font={fontFamilies.robotoRegular} />
                        <AntDesign name='right' size={20} color={globalColor.text_dark} />
                    </Pressable>
                )}
            />
    </SafeAreaView>
  )
}

export default ChapterAudio