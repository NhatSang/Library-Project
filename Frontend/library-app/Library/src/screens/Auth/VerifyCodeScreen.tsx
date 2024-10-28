import { MAIN } from '@assets/images';
import AppButton from '@components/AppButton';
import AppText from '@components/AppText';
import Space from '@components/Space';
import { fontFamilies } from '@constants/fontFamilies';
import { globalColor } from '@constants/globalColor';
import { ScreenName } from '@constants/ScreenName';
import React, { useEffect, useRef, useState } from 'react';
import { ImageBackground, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useCountdown } from '../../hooks/useCountDown';

const VerifyCodeScreen = ({ navigation, route }: any) => {
    const { email } = route.params;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [count, {
        startCountdown,
        resetCountdown
    }] = useCountdown({
        countStart: 60,
        countStop: 0,
        intervalMs: 1000,
    });
    useEffect(() => {
        if (isLoading) {
            startCountdown();
        } else {
            resetCountdown();
        }
        if (count === 0) {
            setIsLoading(false);
        }
    }, [isLoading, count, startCountdown, resetCountdown])

    const [code, setCode] = useState(["", "", "", ""]);

    const inputRefs: any = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
    ];

    const handleChangeText = (text: string, index: number) => {
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);

        if (text.length === 1 && index < inputRefs.length - 1) {
            inputRefs[index + 1].current?.focus();
        } else if (text.length === 0 && index > 0 && code[index] === "") {
            inputRefs[index - 1].current?.focus();
        }
    };

    return (
        <ImageBackground className="flex-1" source={MAIN.BACKGROUND}>
            <SafeAreaView>
                <View className="flex-row justify-between h-16 items-center px-3">
                    <Pressable onPress={() => navigation.goBack()}>
                        <AntDesign name="left" size={30} color={globalColor.text_dark} />
                    </Pressable>
                    <Space width={30} />
                </View>
                <Text className="text-center text-3xl font-bold text-primary-dark">Nhập mã xác nhận</Text>
                <View className='h-[350px] justify-around items-center'>
                    <Space height={20} />
                    <Text className="text-center text-sm text-black">
                        Mã xác nhận đã được gửi đến email của bạn
                    </Text>
                    <View className="flex-row justify-center">
                        {inputRefs.map((ref: any, index: any) => (
                            <React.Fragment key={index}>
                                <TextInput
                                    ref={ref}
                                    maxLength={1}
                                    value={code[index]}
                                    onChangeText={(text) => handleChangeText(text, index)}
                                    className="w-14 h-14 mx-2 text-3xl font-bold text-center border-2 border-black text-black rounded-lg"
                                />
                                {index < inputRefs.length - 1 && <Space width={10} />}
                            </React.Fragment>
                        ))}
                    </View>
                    <View className='w-full px-20'>
                        <AppButton
                            color={globalColor.primary_2}
                            title="Xác nhận"
                            onPress={() => {
                                navigation.navigate(ScreenName.UserFormScreen, { email });
                            }}
                            textStyleProps={{ color: globalColor.white, fontFamily: fontFamilies.robotoBold, fontSize: 22 }}
                        />
                    </View>
                    <AppText onPress={() => {
                        console.log("Resend code");
                        setIsLoading(true);
                    }} disabled={isLoading} color={isLoading ? globalColor.text_dark : globalColor.primary} font={fontFamilies.robotoBold} size={16} text={`${isLoading ? `${count}s` : "Gửi lại mã xác nhân"}`} />
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

export default VerifyCodeScreen;
