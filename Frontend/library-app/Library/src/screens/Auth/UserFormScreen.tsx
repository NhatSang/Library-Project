import { AppButton, AppDropdown, AppInput, AppText } from '@components/index'
import { fontFamilies } from '@constants/fontFamilies'
import { globalColor } from '@constants/globalColor'
import { isiOS } from '@constants/index'
import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { RadioButton } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { iMajor } from 'src/types/iUser'
import { dataMajor } from './data'

const UserFormScreen = () => {
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

    const onChangeName = (text: string) => {
        setName(text);
    }
    const onChangeStudentCode = (text: string) => {
        setStudentCode(text);
    }
    const onChangeStudentYear = (text: string) => {
        setStudentYear(text);
    }

    return (

        <SafeAreaView style={{ paddingTop: isiOS ? 50 : 0 }} className='flex-1'>
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
                    <View className='flex-row items-start py-3'>
                        <AppDropdown
                            items={majorList}
                            onMenuClick={(key: string) => setMajor(key)}
                            width={250}
                        >
                            <View className='h-8 w-32 bg-primary-dark rounded-lg justify-center items-center border'>
                                <AppText color={globalColor.text_light} font={fontFamilies.robotoBold} text='Chuyên ngành' />
                            </View>
                        </AppDropdown>
                        <View className='flex-1 justify-center'>
                            <AppText font={fontFamilies.robotoBold} size={18} text={majorList.find(item => item.key === major)?.label} />
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
                            return ''
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
                        onPress={() => { }}
                        title='Tiếp tục'
                        type='primary'
                        color={globalColor.primary}
                        textStyleProps={{ color: globalColor.white, fontSize: 20, fontFamily: fontFamilies.robotoBold }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

export default UserFormScreen