import { MAIN } from '@assets/images'
import AppButton from '@components/AppButton'
import AppText from '@components/AppText'
import Loading from '@components/Loading'
import { fontFamilies } from '@constants/fontFamilies'
import { clearToken } from '@utils/storage'
import React, { ReactNode, useEffect, useState } from 'react'
import { FlatList, Image, View } from 'react-native'
import RNRestart from 'react-native-restart'
import { SafeAreaView } from 'react-native-safe-area-context'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useDispatch } from 'react-redux'
import { iUser } from 'src/types/iUser'
import { _getProfile } from './apis'

interface iSetiing {
    title: string,
    icon: ReactNode,
    onPress: () => void | Promise<void>
}

const AccountScreen = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState<iUser>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDate = async () => {
            await getUser();
            setLoading(false);
        }
        fetchDate();
    }, [])

    const getUser = async () => {
        try {
            const response = await _getProfile();
            if (response.status) {
                setUser(response.data);
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    const settings: iSetiing[] = [
        {
            title: 'Thông tin cá nhân',
            icon: <AntDesign name="idcard" size={24} color="black" />,
            onPress: () => { }
        },
        {
            title: 'Phiên bản: 0.0.1',
            icon: <MaterialIcons name="info" size={24} color="black" />,
            onPress: () => { }
        },
        {
            title: 'Đăng xuất',
            icon: <MaterialIcons name="logout" size={24} color="black" />,
            onPress: async () => {
                RNRestart.restart();
                await clearToken();
            }
        }
    ]


    return (
        loading ? <Loading /> :
            <SafeAreaView className='flex-1'>
                <View className='w-full h-4/10 mb-4'>
                    <Image source={MAIN.LOGOIUH} resizeMode='contain' className='w-full h-3/10' />
                    <View className='justify-center items-center'>
                        <View
                            style={{ width: 161, height: 161, borderWidth: 3 }}
                            className='justify-center items-center  border-blue-400 rounded-full'
                        >
                            <Image source={{ uri: user?.image }} resizeMode='contain' className='w-40 h-40 rounded-full' />
                        </View>
                        <AppText size={24} font={fontFamilies.robotoMedium} text={user?.name} />
                        <AppText text={user?.majors.name} />
                    </View>
                </View>
                <View
                    style={{ backgroundColor: '#E1F5FE', borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
                    className='h-6/10 rounded-t-3xl border border-gray-300 pt-2 mt-4'>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={settings}
                        className='p-4'
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View className='flex-row items-center justify-between'>
                                <AppButton
                                    title={item.title}
                                    onPress={item.onPress}
                                    icon={item.icon}
                                    styles={{ width: '100%', padding: 0 }}

                                />
                            </View>
                        )}
                    />
                </View>
            </SafeAreaView>
    )
}

export default AccountScreen

{/* <Pressable className='bg-red-500'
                onPress={async () => {
                    await clearToken();
                    await clearUserLocalStorage();
                    dispatch(clearAuth());
                    dispatch(clearUser());
                    dispatch(clearUserId());
                }}
            >
                <AppText text='Logout' />
            </Pressable> */}