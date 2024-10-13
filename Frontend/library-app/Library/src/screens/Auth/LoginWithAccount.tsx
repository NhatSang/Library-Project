import { MAIN } from '@assets/images'
import AppButton from '@components/AppButton'
import AppInput from '@components/AppInput'
import { setAuth, setMajorId, setUser, setUserId } from '@redux/authReducer'
import { saveToken, saveUserLocalStorage } from '@utils/storage'
import React, { useState } from 'react'
import { ImageBackground } from 'react-native'
import { useDispatch } from 'react-redux'
import { _loginWithAccount } from './apis'

const LoginWithAccount = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const handleLogin = async () => {
        const user: any = { email, password };
        try {
            const res = await _loginWithAccount(user);
            if (res.status) {
                dispatch(setUserId(res.data.user._id));
                dispatch(setMajorId(res.data.user.majors));
                dispatch(setUser(res.data.user));
                dispatch(setAuth(res.data.accessToken));
                await saveToken(res.data.accessToken);
                await saveUserLocalStorage(res.data.user);
                setIsLoading(false);
            }
        } catch (error) {

            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <ImageBackground className='flex-1' source={MAIN.BACKGROUND}>
            <AppInput
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <AppInput
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <AppButton loading={isLoading} onPress={handleLogin} title='Login' />
        </ImageBackground>
    )
}

export default LoginWithAccount