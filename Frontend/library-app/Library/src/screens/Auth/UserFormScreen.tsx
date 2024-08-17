import { AppButton, AppInput, AppText } from '@components/index'
import { fontFamilies } from '@constants/fontFamilies'
import { globalColor } from '@constants/globalColor'
import { saveToken } from '@utils/storage'
import React, { useEffect, useState } from 'react'
import { Alert, FlatList, Modal, Pressable, ScrollView, TouchableHighlight, View } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { RadioButton } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { useDispatch } from 'react-redux'
import { iMajor, iUser } from 'src/types/iUser'
import { setAuth, setUser } from '../../redux/authReducer'
import { eGender } from '../../types/iUser'
import { _loginMS } from './apis'
import { dataMajor } from './data'

const UserFormScreen = ({ navigation, route }: any) => {
    const { email, password } = route?.params;
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [studentCode, setStudentCode] = useState('');
    const [studentYear, setStudentYear] = useState('');
    const [major, setMajor] = useState('');
    const yearNow = new Date().getFullYear();
    const monthNow = new Date().getMonth();
    const beforeYear = yearNow - 2010;
    let afterYear;
    monthNow > 10 ? afterYear = yearNow - 2005 + 1 : afterYear = yearNow - 2005;
    const majorList: iMajor[] = dataMajor;
    const [checked, setChecked] = useState('nam');
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(new Date());
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        validateForm();
    }, [name, studentCode, studentYear, major]);

    const onChangeName = (text: string) => {
        setName(text);
    }
    const onChangeStudentCode = (text: string) => {
        setStudentCode(text);
    }
    const onChangeStudentYear = (text: string) => {
        setStudentYear(text);
    }

    const validateForm = () => {
        let valid = true;
        const age = new Date().getFullYear() - date.getFullYear();
        if (age < 18) {
            setError('Bạn phải đủ 18 tuổi');
            valid = false;
        }
        if (major === '') {
            setError('Chuyên ngành là bắt buộc');
            valid = false;
        }
        const year = parseInt(studentYear);
        if (!studentYear || isNaN(year) || year < beforeYear || year > afterYear) {
            setError('Khóa học không hợp lệ');
            valid = false;
        }
        if (!studentCode || studentCode.length !== 8) {
            setError('Mã số sinh viên không hợp lệ');
            valid = false;
        }
        if (!name) {
            setError('Họ và tên là bắt buộc');
            valid = false;
        }

        return valid;
    };

    const handleSignUp = async () => {
        const nameMajor = majorList.find(item => item.id === major)?.name;
        const data: iUser = {
            name: name,
            gender: checked === 'nam' ? eGender.nam : eGender.nu,
            majors: { id: '', name: nameMajor },
            email: email,
            password: password,
            role: 'user',
            active: true,
            studentCode: studentCode,
            studnetYear: parseInt(studentYear),
            dob: date,
        }
        try {
            const res = await _loginMS(data);
            if (res.status) {
                dispatch(setUser(res.data.user));
                dispatch(setAuth(res.data.accessToken));
                await saveToken(res.data.accessToken);

            }
        } catch (error) {
            console.log('error', error);
        }
    };

    const handleSubmit = () => {
        setIsLoading(true);
        if (validateForm()) {
            handleSignUp();
            setIsLoading(false);

        } else {
            Alert.alert('Thông báo', error);
            setIsLoading(false);
        }
    }


    return (
        <>
            <SafeAreaView className='flex-1 z-10'>
                <View className='w-full h-16 bg-primary-dark justify-center pl-4 '>
                    <AppText color={globalColor.white} size={20} font={fontFamilies.robotoBold} text='Nhập thông tin cá nhân' />
                </View>
                <ScrollView className='p-4'>
                    <AppText
                        color={globalColor.text_dark}
                        text='Bạn vui lòng cung cấp thông tin cá nhân để chúng tôi có thể gợi ý nhưng mục tiêu phù hợp cho bạn.' />
                    <View className='pt-3'>
                        <AppInput
                            prefix={<AntDesign name="user" size={18} color={'gray'} />}
                            placeholder='Họ và tên'
                            value={name}
                            onChangeText={onChangeName}
                            onClear={() => setName('')}
                            label='Họ và tên'
                            required
                            clear />
                        <View className='flex-row items-start py-1 pb-3'>
                            <TouchableHighlight
                                className='h-8 w-32 bg-primary-dark rounded-lg justify-center items-center border'
                                onPress={() => {
                                    setVisible(true)
                                }}>
                                <AppText color={globalColor.text_light} font={fontFamilies.robotoBold} text='Chuyên ngành' />
                            </TouchableHighlight>
                            <View className='flex-1 items-center justify-center'>
                                <AppText font={fontFamilies.robotoBold} size={16} text={majorList.find(item => item.id === major)?.name} />
                            </View>

                        </View>
                        <AppInput
                            prefix={<AntDesign name="idcard" size={18} color={'gray'} />}
                            placeholder='Mã số sinh viên'
                            keyboardType='number-pad'
                            maxLength={8} value={studentCode}
                            onChangeText={onChangeStudentCode}
                            onClear={() => setStudentCode('')}
                            label='Mã số sinh viên'
                            required
                            clear
                            onEndEditing={() => {
                                if (studentCode.length !== 0) {
                                    if (studentCode.length !== 8) {
                                        return 'Mã số sinh viên không hợp lệ'
                                    }
                                }
                                return '';
                            }}
                        />
                        <AppInput
                            prefix={<Fontisto name="date" size={18} color={'gray'} />}
                            placeholder={`Khóa học (${beforeYear} - ${afterYear})`}
                            maxLength={2}
                            keyboardType='number-pad'
                            value={studentYear}
                            onChangeText={onChangeStudentYear}
                            onClear={() => setStudentYear('')}
                            label={`Bạn là sinh viên khóa bao nhiêu? (${beforeYear} - ${afterYear})`}
                            required
                            clear
                            onEndEditing={() => {
                                if (studentYear.length !== 0) {
                                    if (parseInt(studentYear) < beforeYear || parseInt(studentYear) > afterYear) {
                                        return 'Khóa học không hợp lệ'
                                    }
                                }
                                return ''
                            }}
                        />

                        <View className='py-1'>
                            <View className='flex-row'>
                                <AppText styles={{ paddingRight: 5 }} text='*' color='red' />
                                <AppText
                                    size={16}
                                    color={globalColor.text_dark}
                                    text='Giới tính'
                                    font={fontFamilies.robotoBold}
                                />
                            </View>
                            <View className='flex-row items-center'>
                                <RadioButton
                                    value="nam"
                                    status={checked === 'nam' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked('nam')}
                                    color={globalColor.primary}
                                />
                                <AppText
                                    onPress={() => setChecked('nam')}
                                    color={globalColor.text_dark}
                                    text='Nam'
                                    font={fontFamilies.robotoBold}
                                />
                            </View>
                            <View className='flex-row items-center'>
                                <RadioButton
                                    value="nu"
                                    status={checked === 'nu' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked('nu')}
                                    color={globalColor.primary}
                                />
                                <AppText
                                    onPress={() => setChecked('nu')}
                                    color={globalColor.text_dark}
                                    text='Nữ'
                                    font={fontFamilies.robotoBold}
                                />
                            </View>
                        </View>
                        <View>
                            <View className='flex-row pb-2'>
                                <AppText styles={{ paddingRight: 5 }} text='*' color='red' />
                                <AppText
                                    size={16}
                                    color={globalColor.text_dark}
                                    text='Ngày sinh'
                                    font={fontFamilies.robotoBold}
                                />
                            </View>
                            <AppButton
                                onPress={() => {
                                    setOpen(true);
                                }}
                                title={date.toLocaleDateString()}
                                textStyleProps={{ color: globalColor.text_dark, fontSize: 16, fontFamily: fontFamilies.robotoBold }}
                                styles={{ width: 150, borderRadius: 10, padding: 0 }}
                            />
                            <DatePicker
                                locale='vi'
                                mode='date'
                                modal
                                open={open}
                                date={date}
                                onConfirm={(date) => {
                                    setOpen(false)
                                    setDate(date)
                                    console.log('date', date);
                                }}
                                onCancel={() => {
                                    setOpen(false)
                                }}
                            />
                        </View>
                    </View>

                    <View className='flex-1 justify-end pb-6 px-5'>
                        <AppButton
                            loading={isLoading}
                            onPress={handleSubmit}
                            title='Tiếp tục'
                            type='primary'
                            color={globalColor.primary}
                            textStyleProps={{ color: globalColor.white, fontSize: 20, fontFamily: fontFamilies.robotoBold }}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView >
            <Modal visible={visible} transparent>
                <View className='flex-1 justify-center items-center bg-opacity-80 '>
                    <View className='bg-white w- h-4/5 rounded-xl border'>
                        <View className='flex-row justify-between items-center px-4 py-2 border-b'>
                            <AppText text='Chọn chuyên ngành' font={fontFamilies.robotoBold} size={20} />
                            <AppButton
                                onPress={() => { setVisible(false) }}
                                icon={<AntDesign name="close" size={20} />}
                                textStyleProps={{ color: globalColor.primary, fontSize: 16, fontFamily: fontFamilies.robotoBold }}
                            />
                        </View>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={majorList}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <Pressable onPress={() => {
                                    setMajor(item.id)
                                    setVisible(false)
                                }} className='flex-row justify-between px-4 py-4 border-b border-primary-light '>
                                    <AppText text={item.name} font={fontFamilies.robotoRegular} size={16} />
                                </Pressable>
                            )}
                        />
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default UserFormScreen