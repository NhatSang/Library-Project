import AppButton from '@components/AppButton'
import AppText from '@components/AppText'
import Loading from '@components/Loading'
import Rate from '@components/Rate'
import { fontFamilies } from '@constants/fontFamilies'
import { globalColor } from '@constants/globalColor'
import { isAndroid } from '@constants/index'
import { ScreenName } from '@constants/ScreenName'
import { getUserLocalStorage } from '@utils/storage'
import React, { useEffect, useState } from 'react'
import { FlatList, Image, Pressable, View } from 'react-native'
import RNFetchBlob from 'react-native-blob-util'
import ImageColors from 'react-native-image-colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { iBook } from 'src/types/iBook'
import { IReview } from 'src/types/iReview'
import { _createHistory, _getReviewNewest, _updateModel } from '../apis'


const BookDetail = ({ navigation, route }: any) => {
    const { item } = route?.params;
    const [userId, setUserId] = useState<string>('');
    const [book, setBook] = useState<iBook>(item);
    const [background, setBackground] = useState<string>('white');
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingBtn, setLoadingBtn] = useState<boolean>(false);
    const [reviews, setReviews] = useState<IReview[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await getImageColors();
            await getUserLocal();
            setLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getReviewNewest();
        });
        return unsubscribe;
    }, [navigation]);

    const getUserLocal = async () => {
        try {
            const user = await getUserLocalStorage();
            if (user) {
                setUserId(user._id);
            }
        } catch (error) {
            console.log('Error get user local: ', error);
        }
    }

    const getImageColors = async () => {
        try {
            const result: any = await ImageColors.getColors(book.image, {
                fallback: '#fff',
                cache: true,
                key: book.image,
            });
            if (result) {
                setBackground(isAndroid ? result.average : result.secondary);
            }
        } catch (error) {
            console.log('Error get image colors: ', error);
        }
    };



    const getReviewNewest = async () => {
        try {
            const response = await _getReviewNewest(book._id);
            if (response.status) {
                setReviews(response.data);
            }
        } catch (error) {
            console.log('Error get review newest: ', error);
        }
    };

    const getName = (id: string) => {
        if (id === userId) {
            return 'Bạn';
        }
        return reviews.find((item) => item.user._id === id)?.user.name;
    }

    const downloadPDF = async (url: string) => {
        setLoadingBtn(true);
        const { config, fs } = RNFetchBlob;
        const { DocumentDir } = fs.dirs;
        const filePath = `${DocumentDir}/book_${book._id}.pdf`;
        const isFileExist = await RNFetchBlob.fs.exists(filePath);
        if (isFileExist) {
            setLoadingBtn(false);
            navigation.navigate(ScreenName.ReadText, {
                id: book._id,
                path: filePath,
                book: book
            });
        } else {
            try {
                const response = await _createHistory({ book: book._id });
                if (response.status) {
                    await _updateModel('6708c0e4e4d8b3aef5c1ac10')
                }
            } catch (error) {
                console.log('Error create history: ', error);
            }
            Toast.show({
                type: 'info',
                position: 'bottom',
                text1: 'Đang tải sách, bạn đợi xíu nha !!!',
                visibilityTime: 2000,
                text1Style: { fontSize: 18 }
            });
            config({
                fileCache: true,
                path: filePath,
            }).fetch('GET', url)
                .then(async (res) => {
                    setLoadingBtn(false);
                    Toast.show({
                        type: 'success',
                        position: 'bottom',
                        text1: 'Tải sách thành công',
                        visibilityTime: 2000,
                        text1Style: { fontSize: 18 }
                    });
                })
                .catch((err) => {
                    setLoadingBtn(false);
                    console.log('Error download file: ', err);
                });
        }
    };

    return (
        loading ? <Loading /> :
            <SafeAreaView style={{ backgroundColor: background }} className='flex-1 justify-between'>
                <View className='flex-row justify-between h-16 items-center px-3'>
                    <Pressable onPress={() => {
                        navigation.goBack()
                    }}>
                        <AntDesign name='left' size={30} color={globalColor.text_dark} />
                    </Pressable>
                    <AppText size={20} color={globalColor.text_light} text='Sách' font={fontFamilies.robotoBold} />
                    <Pressable>
                        <AntDesign name='heart' color={'red'} size={30} />
                    </Pressable>
                </View>
                <View className='h-5/6   rounded-tl-3xl rounded-tr-3xl relative justify-end'>
                    <View className='h-9/10 bg-white px-3 rounded-tl-3xl rounded-tr-3xl'>
                        <View className='h-32 w-full' />
                        <View className='justify-center items-center'>
                            <AppText font={fontFamilies.robotoBold} size={20} text={item.title} />
                            <AppText size={16} text={item.author} />
                        </View>
                        <View className='py-4'>
                            <View style={{ height: 1 }} className='border-t bg-black' />
                        </View>
                        <View className='flex-row justify-around'>
                            <View className='justify-center items-center'>
                                <AppText text={300} font={fontFamilies.robotoBold} />
                                <View className='flex-row items-center'>
                                    <Feather color={globalColor.bg_dark} size={16} name='book-open' />
                                    <AppText styles={{ paddingLeft: 4 }} text='trang' />
                                </View>
                            </View>
                            <View className='justify-center items-center'>
                                <AppText text='99,9k' font={fontFamilies.robotoBold} />
                                <View className='flex-row items-center'>
                                    <AntDesign color={globalColor.bg_dark} size={16} name='eye' />
                                    <AppText styles={{ paddingLeft: 4 }} text='lượt xem' />
                                </View>
                            </View>
                            <View className='justify-center items-center'>
                                <AppText text={999} font={fontFamilies.robotoBold} />
                                <View className='flex-row items-center'>
                                    <AntDesign name='heart' color={'red'} size={16} />
                                    <AppText styles={{ paddingLeft: 4 }} text='yêu thích' />
                                </View>
                            </View>
                        </View>
                        <View className='py-4'>
                            <View style={{ height: 1 }} className='border-t bg-black' />
                        </View>
                        <View className='flex-row justify-between'>
                            <AppText text='Đánh giá gần đây' font={fontFamilies.robotoBold} />
                            <AppText onPress={() => { navigation.navigate(ScreenName.RatingScreen, { id: book._id, userId }) }} size={16} text='Viết đánh giá' color={globalColor.primary} />
                        </View>
                        {reviews.length > 0 ?
                            (<FlatList
                                showsVerticalScrollIndicator={false}
                                data={reviews}
                                renderItem={({ item }) => {
                                    return (
                                        <View className='py-4 px-4'>
                                            <View className='flex-row justify-between '>
                                                <View className='flex-row'>
                                                    <View className='w-9 h-9 rounded-full border border-red-500 justify-center items-center'>
                                                        <Image source={{ uri: item.user.image }} className='w-8 h-8' />
                                                    </View>
                                                    <View className='pl-3'>
                                                        <AppText text={
                                                            getName(item.user._id)
                                                        } font={fontFamilies.robotoBold} />
                                                        <View>
                                                            <Rate rating={item.rating} />
                                                        </View>
                                                    </View>
                                                </View>
                                                <View>
                                                    <AppText text={
                                                        new Date(item.createdAt).toLocaleDateString('vi-VN', {
                                                            year: 'numeric',
                                                            month: 'numeric',
                                                            day: 'numeric',
                                                            hour: 'numeric',
                                                            minute: 'numeric',
                                                            second: 'numeric',
                                                        })
                                                    } />
                                                </View>
                                            </View>
                                            <AppText text={item.content} />
                                        </View>
                                    )
                                }}
                            />)
                            :
                            (<View className='flex-1 justify-center items-center'>
                                <AppText text={'Chưa có đánh giá'} />
                            </View>)
                        }
                        <View className='h-18 w-full flex-row justify-around py-2'>
                            <AppButton
                                color={globalColor.primary_2}
                                styles={{ width: '40%', height: '80%', borderRadius: 10 }}
                                onPress={() => {
                                    navigation.navigate(ScreenName.ChapterAudio, { bookDetail: book })
                                }}
                                title='Sách nói'
                            />
                            <AppButton
                                loading={loadingBtn}
                                color={globalColor.primary}
                                styles={{ width: '40%', height: '80%', borderRadius: 10 }}
                                onPress={() => { downloadPDF(book.pdfLink) }}
                                title='Đọc sách'
                            />
                        </View>
                    </View>
                    {/* image book */}
                    <View className='h-40 w-full absolute top-0 justify-center items-center'>
                        <Image resizeMode='stretch' source={{ uri: book.image }} className='w-40 h-52 rounded-xl' />
                    </View>
                </View>
            </SafeAreaView>
    )
}

export default BookDetail