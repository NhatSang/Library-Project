import AppText from '@components/AppText'
import { clearAuth, clearUser } from '@redux/authReducer'
import React from 'react'
import { Pressable, View } from 'react-native'
import { useDispatch } from 'react-redux'

const AccountScreen = () => {
    const dispatch = useDispatch()
    return (
        <View className='justify-center items-center'>
            <Pressable className='bg-red-500'
                onPress={() => {
                    dispatch(clearAuth());
                    dispatch(clearUser());
                }}
            >
                <AppText text='Logout' />
            </Pressable>
        </View>
    )
}

export default AccountScreen