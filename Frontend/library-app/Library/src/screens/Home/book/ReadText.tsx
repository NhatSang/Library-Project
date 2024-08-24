import AppText from '@components/AppText';
import { AppButton, AppInput, ButtobnCenter } from '@components/index';
import PdfViewer from '@components/PdfViewer';
import { fontFamilies } from '@constants/fontFamilies';
import { globalColor } from '@constants/globalColor';
import React, { useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const data = Array.from({ length: 10 }, (_, index) => ({
    id: String(index + 1),
    name: `Item ${index + 1}`,
    page: `Page ${index + 1}`
}));

const ReadText = ({ navigation, route }: any) => {
    const { path } = route?.params;
    const colorScheme = useColorScheme();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [modalNoteVisible, setModalNoteVisible] = useState<boolean>(false);
    const [buttonFocused, setButtonFocused] = useState<string>('mucluc');
    const [selectedPage, setSelectedPage] = useState<number | null>(null);

    const handleButtonFocused = (button: string) => {
        setButtonFocused(button);
    }

    const Item = ({ item }: { item: any }) => (
        <Pressable onPress={() => {
            setSelectedPage(Number(item.id))
            setModalVisible(false);
        }} style={styles.item}>
            <AppText styles={styles.name} text={item.name} />
            <AppText styles={styles.page} text={item.page} />
        </Pressable>
    );

    return (
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
                        pdfUrl={path}
                        initialPage={selectedPage || 1}
                    />
                </View>
                <View className=' bg-primary-light flex-1 flex-row justify-around'>
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
                                    data={data}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) => (
                                        <Item item={item} />
                                    )}
                                    contentContainerStyle={styles.container}
                                />
                            ) : (
                                <AppText text='Bạn chưa có ghi chú nào' />
                            )
                        }
                    </View>
                </View>
            </Modal>
            <Modal transparent visible={modalNoteVisible}>
                <View className='flex-1 justify-center items-center'>
                    <View className='w-9/12 h-5/10 border bg-white'>
                        <View className='px-4'>
                            <AppText text='Ghi chú' size={20} font={fontFamilies.robotoBold} />
                            <AppText text='Trang hiện tại: 1' />
                            <AppText text='Nội dung ghi chú' />
                            <AppInput inputStyles={{ maxHeight: '100%' }} textAreal placeholder='Nhập ghi chú' />
                        </View>
                        <View className='flex-row justify-between px-8'>
                            <AppButton color={globalColor.danger} styles={{ width: '40%' }} title='Hủy' onPress={() => {
                                setModalNoteVisible(false);
                            }} />
                            <AppButton color={globalColor.success} styles={{ width: '40%' }} title='Lưu' onPress={() => { }} />
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    item: {
        padding: 16,
        marginBottom: 8,
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    page: {
        fontSize: 14,
        color: '#555',
    },
});


export default ReadText;