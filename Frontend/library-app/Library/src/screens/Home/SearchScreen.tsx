import AppText from '@components/AppText'
import { fontFamilies } from '@constants/fontFamilies'
import { globalColor } from '@constants/globalColor'
import React, { useEffect, useRef, useState } from 'react'
import { TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const SearchScreen = ({ navigation }: any) => {
    const [searchText, setSearchText] = useState<string>('');
    const inputRef: any = useRef(null);
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [])
    return (
        <SafeAreaView className='flex-1 bg-primary-dark'>
            <View className='h-20  justify-between items-center flex-row px-4 border-b'>
                <AppText onPress={() => { navigation.goBack() }} font={fontFamilies.robotoBold} size={16} text='Huỷ' />
                <View className='w-5/6 h-5/6 justify-center'>
                    <TextInput
                        value={searchText}
                        ref={inputRef}
                        onChangeText={(text) => setSearchText(text)}
                        className='text-black text-xl w-full h-5/6 border self-center rounded-2xl px-4 bg-white'
                        placeholder='Tìm kiếm...'
                        placeholderTextColor={globalColor.text_dark}
                    />
                </View>
            </View>
            <View className='flex-1 bg-white'></View>
        </SafeAreaView>
    )
}

export default SearchScreen