import AppText from '@components/AppText';
import { AppButton, AppInput, ButtobnCenter, Loading } from '@components/index';
import PdfViewer from '@components/PdfViewer';
import { fontFamilies } from '@constants/fontFamilies';
import { globalColor } from '@constants/globalColor';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, Modal, Pressable, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { INote } from 'src/types/iNote';
import { defaultListChapter, IChapter } from '../../../types/iChapter';
import { _createNote, _deleteNote, _getChapterByIdBook, _getNoteByBookId } from '../apis';


const ReadText = ({ navigation, route }: any) => {
    const { path, id } = route?.params;
    const colorScheme = useColorScheme();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [modalNoteVisible, setModalNoteVisible] = useState<boolean>(false);
    const [buttonFocused, setButtonFocused] = useState<string>('mucluc');
    const [selectedPage, setSelectedPage] = useState<number>(1);
    const [chapter, setChapter] = useState<IChapter[]>(defaultListChapter);
    const [page, setPage] = useState<number>(1);
    const [note, setNote] = useState<string>('');
    const [noteList, setNoteList] = useState<INote[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await getChapterByIdBook();
            await getNoteByBookId();
            await handleGetPageReaded();
            setLoading(false);
        }
        fetchData();
    }, []);

    const handleGetPageReaded = async () => {
        const pageReaded = await AsyncStorage.getItem(`pageReaded_${id}`);
        if (pageReaded) {
            setSelectedPage(Number(pageReaded));
        }
    };



    const getChapterByIdBook = async () => {
        try {
            const response = await _getChapterByIdBook(id);
            if (response.status) {
                setChapter(response.data);
            }
        } catch (error) {
            console.log('Error getChapterByIdBook: ', error);
        }
    }

    const getNoteByBookId = async () => {
        try {
            const response = await _getNoteByBookId(id);
            if (response.status) {
                setNoteList(response.data);
            }
        } catch (error) {
            console.log('Error getNoteByBookId: ', error);
        }
    }

    const handleButtonFocused = (button: string) => {
        setButtonFocused(button);
    }

    const handleCreateNote = async () => {
        const data = {
            book: id,
            content: note,
            page: page,
        }
        try {
            const response = await _createNote(data);
            if (response.status) {
                setModalNoteVisible(false);
                setNote('');
                await getNoteByBookId();
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Bạn đã tạo ghi chú thành công',
                    visibilityTime: 2000,
                    text1Style: { fontSize: 18 }
                });
            }
        } catch (error) {
            setModalNoteVisible(false);
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Có lỗi xảy ra',
                visibilityTime: 2000,
                text1Style: { fontSize: 18 }
            });
            console.log('Error handleCreateNote: ', error);
        }
    }

    const handleDeleteNote = async (id: string) => {
        try {
            const response = await _deleteNote(id);
            if (response.status) {
                await getNoteByBookId();
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Bạn đã xóa ghi chú thành công',
                    visibilityTime: 2000,
                    text1Style: { fontSize: 18 }
                });
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Có lỗi xảy ra',
                visibilityTime: 2000,
                text1Style: { fontSize: 18 }
            });
            console.log('Error handleDeleteNote: ', error);
        }
    }

    const randomBackground = () => {
        const colors = [
            '#FFEBEE', // Light Red
            '#FCE4EC', // Light Pink
            '#E1F5FE', // Light Blue
            '#E8F5E9', // Light Green
            '#FFF3E0', // Light Orange
            '#FFFDE7', // Light Yellow
            '#F3E5F5', // Light Purple
            '#F1F8E9', // Light Lime
            '#D7CCC8', // Light Brown
            '#E0F7FA', // Light Cyan
            '#F9FBE7', // Light Lime Yellow
            '#FBE9E7', // Light Peach
            '#F0F4C3', // Light Olive
            '#FFCDD2', // Light Coral
            '#E6EE9C', // Light Olive Green
            '#B2EBF2', // Light Aqua
            '#DCEDC8', // Light Greenish Yellow
            '#D1C4E9', // Light Lavender
            '#FFECB3', // Light Gold
        ];
        const random = Math.floor(Math.random() * colors.length);
        return colors[random];
    }

    const Item = ({ item }: { item: IChapter }) => (
        <Pressable
            className='flex-row justify-between items-center p-4 mb-2 border-b bg-slate-200 rounded-md'
            onPress={() => {
                setSelectedPage(Number(item.startPage))
                setModalVisible(false);
            }}>
            <AppText font={fontFamilies.robotoBold} text={item.title} />
            <AppText text={item.startPage} />
        </Pressable>
    );

    const ItemNote = ({ item }: { item: INote }) => (
        <View style={{ backgroundColor: randomBackground() }} className='px-2 py-2 mb-4 rounded-xl border border-gray-300'>
            <View className='flex-row justify-between'>
                <AppText text='Ghi chú' font={fontFamilies.robotoBold} />
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
            <View className='w-full px-4'>
                <AppText text={item.content} />
                <AppText text={`Trang: ${item.page}`} />
            </View>
            <View className='px-4 flex-row justify-end'>
                <Pressable
                    className='bg-red-400  p-2 rounded-md justify-center items-center mr-2'
                    onPress={() => {
                        handleDeleteNote(item._id);
                    }}>
                    <AntDesign name='delete' size={16} color={globalColor.white} />
                </Pressable>
                <Pressable
                    className='bg-primary-dark  w-20 p-2 rounded-md justify-center items-center'
                    onPress={() => {
                        setSelectedPage(item.page);
                        setModalVisible(false);
                    }}>
                    <AppText font={fontFamilies.robotoBold} text='Đến trang' color={globalColor.white} />
                </Pressable>
            </View>
        </View>
    );

    return (
        loading ? <Loading /> :
            <>
                <SafeAreaView className='flex-1'>
                    <View className='bg-primary-dark w-full h-16 flex-row justify-between px-3'>
                        <Pressable onPress={() => { navigation.goBack() }} className='flex-row justify-center items-center'>
                            <MaterialIcons name='clear' size={28} color={globalColor.white} />
                        </Pressable>
                        <View className='flex-row justify-center items-center'>
                            <Pressable onPress={() => {
                                setModalVisible(true);
                            }}>
                                <FontAwesome5 name='list-ul' size={24} color={globalColor.white} />
                            </Pressable>
                        </View>
                    </View>
                    <View className='h-5/6 bg-slate-200'>
                        <PdfViewer
                            id={id}
                            pdfUrl={path}
                            initialPage={selectedPage}
                            setPage={setPage}
                        />
                    </View>
                    <View className=' bg-primary-light h-20 flex-row justify-around'>
                        <ButtobnCenter
                            icon={<SimpleLineIcons name='note' size={24} color={globalColor.white} />}
                            label='Ghi chú'
                            onPress={() => {
                                setModalNoteVisible(true);
                            }}
                            sizeLabel={16}
                            fontLabel='bold'
                        />
                        <ButtobnCenter
                            icon={<FontAwesome5 name='bookmark' size={24} color={globalColor.white} />}
                            label='Đánh dấu'
                            onPress={() => {
                                Toast.show({
                                    type: 'success',
                                    position: 'bottom',
                                    text1: 'Bạn đã lưu trang hiện tại',
                                    visibilityTime: 2000,
                                    text1Style: { fontSize: 18 }
                                });
                            }}
                            sizeLabel={16}
                            fontLabel='bold'
                        />
                    </View>
                </SafeAreaView>
                <Modal animationType="slide" transparent={true} visible={modalVisible}>
                    <View className={`flex-1 bg-gray-300 w-full h-5/6 absolute bottom-0 rounded-tl-3xl rounded-tr-3xl`}>
                        <View className={`h-16 w-full justify-center items-center border-b`}>
                            <Pressable className='absolute left-3' onPress={() => {
                                setModalVisible(!modalVisible);
                            }}>
                                <MaterialIcons name='clear' size={28} color={globalColor.primary} />
                            </Pressable>
                            <View className='flex-row justify-between items-center w-4/6'>
                                <Pressable
                                    style={{ backgroundColor: buttonFocused == 'mucluc' ? `${globalColor.primary}` : 'gray' }}
                                    className='h-10 w-32 justify-center items-center rounded-md'
                                    onPress={() => {
                                        handleButtonFocused('mucluc');
                                    }}>
                                    <AppText color='white' size={20} font={fontFamilies.robotoBold} text='Mục lục' />
                                </Pressable>
                                <Pressable
                                    style={{ backgroundColor: buttonFocused == 'danhdau' ? `${globalColor.primary}` : 'gray' }}
                                    className='h-10 w-32 justify-center items-center rounded-md' onPress={() => {
                                        handleButtonFocused('danhdau');
                                    }}>
                                    <AppText color={globalColor.white} size={20} font={fontFamilies.robotoBold} text='Ghi chú' />
                                </Pressable>
                            </View>
                        </View>
                        <View className=' flex-1 bg-white'>
                            {
                                buttonFocused == 'mucluc' ? (
                                    <FlatList
                                        data={chapter}
                                        contentContainerStyle={{ padding: 8 }}
                                        keyExtractor={(item) => item._id}
                                        renderItem={({ item }) => (
                                            <Item item={item} />
                                        )}
                                    />
                                ) : (
                                    <FlatList
                                        data={noteList}
                                        contentContainerStyle={{ padding: 8 }}
                                        keyExtractor={(item) => item._id}
                                        renderItem={({ item }) => (
                                            <ItemNote item={item} />
                                        )}
                                    />
                                )
                            }
                        </View>
                    </View>
                </Modal>
                <Modal transparent visible={modalNoteVisible}>
                    <View className='flex-1 justify-center items-center'>
                        <View className='w-9/12 h-5/10 border bg-primary-dark rounded-2xl mb-20'>
                            <View className='px-4'>
                                <AppText text='Ghi chú' size={20} font={fontFamilies.robotoBold} />
                                <View className='flex-row'>
                                    <AppText text='Trang hiện tại:' />
                                    <AppText styles={{
                                        paddingLeft: 5
                                    }}
                                        font={fontFamilies.robotoBold} text={page}
                                    />
                                </View>
                                <AppInput value={note} onChangeText={setNote} containerStyle={{ backgroundColor: globalColor.white }} inputStyles={{ maxHeight: '100%' }} textAreal placeholder='Nhập ghi chú' />
                            </View>
                            <View className='flex-row justify-between px-8'>
                                <AppButton
                                    textStyleProps={{ fontFamily: fontFamilies.robotoBold }}
                                    color={globalColor.danger} styles={{ width: '40%' }}
                                    title='Hủy'
                                    onPress={() => {
                                        setModalNoteVisible(false);
                                    }} />
                                <AppButton
                                    textStyleProps={{ fontFamily: fontFamilies.robotoBold }}
                                    color={globalColor.success} styles={{ width: '40%' }}
                                    title='Lưu'
                                    onPress={() => {
                                        handleCreateNote();
                                    }} />
                            </View>
                        </View>
                    </View>
                </Modal>
            </>
    )
}



export default ReadText;