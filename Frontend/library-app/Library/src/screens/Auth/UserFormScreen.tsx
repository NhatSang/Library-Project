import { MAIN } from '@assets/images';
import AppButton from '@components/AppButton';
import AppText from '@components/AppText';
import { fontFamilies } from '@constants/fontFamilies';
import { globalColor } from '@constants/globalColor';
import { Input } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { ImageBackground, Pressable, ScrollView, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { eGender, iMajor } from '../../types/iUser';
import { _getMajors } from './apis';


const UserFormScreen = ({ route }: any) => {
    const { email } = route?.params;
    const [majors, setMajors] = useState<iMajor[]>([]);
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [rePassword, setRePassword] = useState<string>('');
    const [showRePassword, setShowRePassword] = useState<boolean>(false);
    const [fullName, setFullName] = useState<string>('');
    const [date, setDate] = useState(new Date());
    const [openPicker, setOpenPicker] = useState<boolean>(false)
    const [code, setCode] = useState<string>("");
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [selectedGender, setSelectedGender] = useState<eGender>(eGender.nam);

    useEffect(() => {
        getMajors();
    }, [])

    const getMajors = async () => {
        try {
            const res = await _getMajors();
            if (res.data) {
                setMajors(res.data.data);
            }
        } catch (error: any) {
            console.log(error?.response?.data?.error?.message)
        }
    }

    const validate = () => {
        if (password !== rePassword) {
            Toast.show({
                type: 'error',
                text1: 'Lỗi',
                text2: 'Mật khẩu không trùng khớp',
                position: 'bottom',
            });
            return false;
        }
        if (!password || !rePassword || !fullName || !value || !selectedGender) {
            Toast.show({
                type: 'error',
                text1: 'Lỗi',
                text2: 'Vui lòng nhập đầy đủ thông tin',
                position: 'bottom',
            });
            return false;
        }
        const now = new Date();
        const age = now.getFullYear() - date.getFullYear();
        if (age < 18) {
            Toast.show({
                type: 'error',
                text1: 'Lỗi',
                text2: 'Bạn chưa đủ 18 tuổi',
                position: 'bottom',
            });
            return false;
        }
        if (code.length !== 8) {
            Toast.show({
                type: 'error',
                text1: 'Lỗi',
                text2: 'Mã số sinh viên không hợp lệ',
                position: 'bottom',
            });
            return false;
        }
        return true;
    }

    const handleConfirm = async () => {
        if (!validate()) return;
        try {

        } catch (error: any) {
            console.log(error)

        }
    }


    return (
        <>
            <ImageBackground className='flex-1' source={MAIN.BACKGROUND}>
                <SafeAreaView>
                    <View className="flex-row justify-center items-center h-16 px-3 bg-primary-dark">
                        <AppText color={globalColor.white} size={24} font={fontFamilies.robotoBold} text='Nhập thông tin cá nhân' />
                    </View>
                    <ScrollView className='px-2'>
                        <View className='pt-4'>
                            <Input
                                leftIcon={<AntDesign name='lock' size={24} color={globalColor.dark} />}
                                rightIcon={<Entypo onPress={
                                    () => setShowPassword(!showPassword)
                                } name={
                                    showPassword ? 'eye' : 'eye-with-line'
                                } size={24} color={globalColor.dark} />}
                                label='Mật khẩu'
                                value={password}
                                onChangeText={setPassword}
                                placeholder='Nhập mật khẩu'
                                secureTextEntry={showPassword}
                            />
                        </View>
                        <View>
                            <Input
                                leftIcon={<AntDesign name='lock' size={24} color={globalColor.dark} />}
                                rightIcon={<Entypo onPress={
                                    () => setShowRePassword(!showRePassword)
                                } name={
                                    showRePassword ? 'eye' : 'eye-with-line'
                                } size={24} color={globalColor.dark} />}
                                label='Nhập lại mật khẩu'
                                value={rePassword}
                                onChangeText={setRePassword}
                                placeholder='Nhập lại mật khẩu'
                                secureTextEntry={showRePassword}
                            />
                        </View>
                        <View>
                            <Input
                                leftIcon={<AntDesign name='user' size={24} color={globalColor.dark} />}
                                label='Họ và tên'
                                placeholder='Nhập họ và tên'
                                value={fullName}
                                onChangeText={setFullName}
                            />
                        </View>
                        <View>
                            <Input
                                leftIcon={<AntDesign name='idcard' size={24} color={globalColor.dark} />}
                                label='Mã số sinh viên / giảng viên'
                                placeholder='Nhập mã'
                                value={code}
                                keyboardType='number-pad'
                                onChangeText={setCode}
                            />
                        </View>
                        <View className='px-2'>
                            <Pressable
                                onPress={() => setOpenPicker(true)}
                                className='h-[50px] rounded-lg border border-primary-dark justify-center px-2'>
                                <AppText
                                    text={date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                                    size={16}
                                    color={globalColor.dark}
                                />
                            </Pressable>
                            <DatePicker
                                locale='vi'
                                modal
                                mode='date'
                                open={openPicker}
                                date={date}
                                onConfirm={(date) => {
                                    setOpenPicker(false)
                                    setDate(date)
                                }}
                                onCancel={() => {
                                    setOpenPicker(false)
                                }}
                            />
                        </View>
                        <View>

                        </View>

                    </ScrollView>
                    <View className='p-4 pt-6'>
                        <DropDownPicker
                            listMode='MODAL'
                            open={open}
                            value={value}
                            items={majors ? majors.map((major, index) => ({
                                label: major.name,
                                value: major._id ?? `major-${index}`
                            })) : []}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setMajors}
                            placeholder={'Chuyên ngành'}
                            modalAnimationType='slide'
                            modalTitle='Chọn chuyên ngành'
                            modalTitleStyle={{ color: globalColor.primary_2, fontFamily: fontFamilies.robotoBold }}
                            modalContentContainerStyle={{ padding: 10 }}
                            modalProps={{ animationType: 'slide' }}
                            style={{ borderColor: globalColor.primary_2, backgroundColor: 'transparent' }}
                        />
                    </View>
                    <View className="px-4 justify-center">
                        <AppText text="Giới tính" />
                        <View className="flex-row justify-around mt-2">
                            <Pressable
                                onPress={() => setSelectedGender(eGender.nam)}
                                className="flex-row w-14 justify-between items-center"
                            >
                                <View
                                    className={`h-4 w-4 rounded-full ${selectedGender === 'Male' ? 'bg-blue-500' : 'bg-transparent border border-gray-400'}`}
                                />
                                <AppText text="Nam" />
                            </Pressable>
                            <Pressable
                                onPress={() => setSelectedGender(eGender.nu)}
                                className="flex-row w-14 justify-between items-center"
                            >
                                <View
                                    className={`h-4 w-4 rounded-full ${selectedGender === 'Female' ? 'bg-blue-500' : 'bg-transparent border border-gray-400'}`}
                                />
                                <AppText text="Nữ" />
                            </Pressable>
                        </View>
                    </View>
                    <View className='px-4 pt-6'>
                        <AppButton
                            title='Xác nhận'
                            color={globalColor.primary_2}
                            onPress={() => {
                                handleConfirm()
                            }}
                            textStyleProps={{ color: globalColor.white, fontFamily: fontFamilies.robotoBold, fontSize: 22 }}
                        />
                    </View>
                </SafeAreaView>
            </ImageBackground>
        </>
    )
}

export default UserFormScreen