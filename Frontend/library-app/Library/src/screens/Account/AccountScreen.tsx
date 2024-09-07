import AppText from '@components/AppText'
import { clearAuth, clearUser, clearUserId } from '@redux/authReducer'
import { clearToken, clearUserLocalStorage } from '@utils/storage'
import React from 'react'
import { Pressable, View } from 'react-native'
import { useDispatch } from 'react-redux'

const AccountScreen = () => {
    const dispatch = useDispatch()
    return (
        <View className='justify-center items-center'>
            <Pressable className='bg-red-500'
                onPress={async () => {
                    await clearToken();
                    await clearUserLocalStorage();
                    dispatch(clearAuth());
                    dispatch(clearUser());
                    dispatch(clearUserId());
                }}
            >
                <AppText text='Logout' />
            </Pressable>
        </View>
    )
}

export default AccountScreen