import { HOME } from '@assets/images'
import AppButton from '@components/AppButton'
import AppText from '@components/AppText'
import Rate from '@components/Rate'
import { fontFamilies } from '@constants/fontFamilies'
import { globalColor } from '@constants/globalColor'
import { isAndroid } from '@constants/index'
import { ScreenName } from '@constants/ScreenName'
import React, { useEffect, useState } from 'react'
import { FlatList, Image, Pressable, View } from 'react-native'
import RNFetchBlob from 'react-native-blob-util'
import ImageColors from 'react-native-image-colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'


const BookDetail = ({ navigation, route }: any) => {
    const { id } = route?.params;
    console.log('id', id);
    const [background, setBackground] = useState('white');
    const [loading, setLoading] = useState(false);
    const image: any = HOME.BOOK1;
    useEffect(() => {
        getImageColors();
    }, [])
    const getImageColors = async () => {
        const result: any = await ImageColors.getColors(image, {
            fallback: '#fff',
            cache: true,
            key: image,
        });
        setBackground(isAndroid ? result.average : result.secondary);
    };


    const downloadPDF = async (url: string) => {
        setLoading(true);
        const { config, fs } = RNFetchBlob;
        const { DocumentDir } = fs.dirs;
        const filePath = `${DocumentDir}/book_${id}.pdf`;
        const isFileExist = await RNFetchBlob.fs.exists(filePath);
        if (isFileExist) {
            setLoading(false);
            navigation.navigate(ScreenName.ReadText, { path: filePath });
        } else {
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
                    setLoading(false);
                    Toast.show({
                        type: 'success',
                        position: 'bottom',
                        text1: 'Tải sách thành công',
                        visibilityTime: 2000,
                        text1Style: { fontSize: 18 }
                    });
                })
                .catch((err) => {
                    setLoading(false);
                    console.log('Error download file: ', err);
                });
        }
    };

    return (
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
                        <AppText font={fontFamilies.robotoBold} size={20} text='Tư tưởng Hồ Chí Minh' />
                        <AppText size={16} text='Bộ giáo duc và dào tạo' />
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
                        <AppText onPress={() => { navigation.navigate(ScreenName.RatingScreen, { id }) }} size={16} text='Viết đánh giá' color={globalColor.primary} />
                    </View>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={{ length: 5 }}
                        renderItem={({ item }) => {
                            return (
                                <View className='py-4 px-4'>
                                    <View className='flex-row justify-between '>
                                        <View className='flex-row'>
                                            <Image source={HOME.AVATAR} className='w-8 h-8' />
                                            <View className='pl-3'>
                                                <AppText text='Phạm Đức Nhân' font={fontFamilies.robotoBold} />
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
                    {/* <View className='flex-1 justify-center items-center'>
                        <AppText text={'chưa có đánh giá'} />
                    </View> */}
                    <View className='h-18 w-full flex-row justify-around py-2'>
                        <AppButton
                            color={globalColor.primary_2}
                            styles={{ width: '40%', height: '80%', borderRadius: 10 }}
                            onPress={() => {
                                Toast.show({
                                    type: 'info',
                                    position: 'bottom',
                                    text1: 'Mình chưa có voice nhé',
                                    visibilityTime: 2000,
                                    text1Style: { fontSize: 18 }
                                });
                            }}
                            title='Nghe sách'
                        />
                        <AppButton
                            loading={loading}
                            color={globalColor.primary}
                            styles={{ width: '40%', height: '80%', borderRadius: 10 }}
                            onPress={() => { downloadPDF('http://www.ctump.edu.vn/DesktopModules/NEWS/DinhKem/8496_GIAO-TRINH-TT-HCM.pdf') }}
                            title='Đọc sách'
                        />
                    </View>
                </View>
                {/* image book */}
                <View className='h-40 w-full absolute top-0 justify-center items-center'>
                    <Image source={image} className='w-40 h-52 rounded-xl' />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default BookDetail