import AppText from '@components/AppText'
import { clearAuth, clearUser } from '@redux/authReducer'
import { clearToken } from '@utils/storage'
import React from 'react'
import { Pressable, View } from 'react-native'
import { useDispatch } from 'react-redux'

const AccountScreen = () => {
    const dispatch = useDispatch()
    return (
        <View className='justify-center items-center'>
            <Pressable className='bg-red-500'
                onPress={async () => {
                    dispatch(clearAuth());
                    dispatch(clearUser());
                    await clearToken();
                }}
            >
                <AppText text='Logout' />
            </Pressable>
        </View>
    )
}

export default AccountScreen