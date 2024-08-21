import { HOME } from '@assets/images';
import AppText from '@components/AppText';
import Space from '@components/Space';
import { fontFamilies } from '@constants/fontFamilies';
import { globalColor } from '@constants/globalColor';
import { isAndroid } from '@constants/index';
import Slider from '@react-native-community/slider';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Image, Pressable, View } from 'react-native';
import ImageColors from 'react-native-image-colors';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import TrackPlayer, { useProgress } from 'react-native-track-player';
import AntDesign from 'react-native-vector-icons/AntDesign';

const AudioBook = ({ navigation }: any) => {
    const [color1, setColor1] = useState('white');
    const [color2, setColor2] = useState('white');
    const [isPlaying, setIsPlaying] = useState(true);
    const progress = useProgress();
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);
    const image: any = HOME.BOOK1;

    const spinValue = useRef(new Animated.Value(0)).current;
    const spinAnimation = useRef<any>(null);

    useEffect(() => {
        getImageColors();
    }, []);

    const getImageColors = async () => {
        const result: any = await ImageColors.getColors(image, {
            fallback: '#fff',
            cache: true,
            key: image,
        });
        setColor1(isAndroid ? result.lightVibrant : result.lightVibrant);
        setColor2(isAndroid ? result.vibrant : result.darkMuted);
    };


    useEffect(() => {
        const setupPlayer = async () => {
            await TrackPlayer.setupPlayer();
            await TrackPlayer.add({
                url: 'https://pdf8888.s3.ap-southeast-1.amazonaws.com/1h.mp3',
            });
        };
        setupPlayer();
        play();

        return () => {
            TrackPlayer.stop();
        };
    }, []);


    useEffect(() => {
        setPosition(progress.position);
        setDuration(progress.duration);
        console.log('progress', Number.isNaN((position / duration) * 100) ? 0 : (position / duration) * 100);
    }, [progress]);

    const play = async () => {
        toggleSpinning();
        await TrackPlayer.play();
    };

    const pause = async () => {
        toggleSpinning();
        await TrackPlayer.pause();
    };

    const stop = async () => {
        await TrackPlayer.stop();
    };

    const seekTo = async (time: number) => {
        await TrackPlayer.seekTo(time);
    };

    const startSpinning = () => {
        spinValue.setValue(0);
        spinAnimation.current = Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 8000,
                useNativeDriver: true,
                easing: Easing.linear,
            })
        );
        spinAnimation.current.start();
    };

    const stopSpinning = () => {
        if (spinAnimation.current) {
            spinAnimation.current.stop();
        }
    };

    const toggleSpinning = () => {
        if (spinAnimation.current) {
            stopSpinning();
            spinAnimation.current = null;
        } else {
            startSpinning();
        }
    };

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <SafeAreaView className='flex-1'>
            <LinearGradient
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                className='flex-1'
                colors={[color1, color2]}
                style={{ flex: 1 }}
            >
                <View className='flex-row justify-between h-16 items-center px-3'>
                    <Pressable onPress={() => navigation.goBack()}>
                        <AntDesign name='left' size={30} color={globalColor.text_dark} />
                    </Pressable>
                    <AppText size={20} color={globalColor.text_light} text='Sách' font={fontFamilies.robotoBold} />
                    <Space width={30} />
                </View>
                <View className='h-6/10 justify-center items-center'>
                    <Animated.View
                        className='w-96 h-96 justify-center items-center rounded-full bg-black'
                        style={{
                            transform: [{ rotate: spin }],
                        }}
                    >
                        <View className='h-1 bg-white w-full' />
                    </Animated.View>
                    <Image
                        className='absolute top-1/4'
                        source={HOME.BOOK1}
                    />
                </View>
                <View className='w-full h-2/10 justify-center items-center'>
                    <Slider
                        style={{ width: '90%', height: 5 }}
                        minimumValue={0}
                        maximumValue={duration}
                        value={position}
                        onSlidingComplete={seekTo}
                        thumbTintColor={globalColor.primary}
                        minimumTrackTintColor={globalColor.white}
                        maximumTrackTintColor={globalColor.text_light}
                    />
                </View>
                <View className=' flex-1 w-full flex-row justify-center items-start'>
                    <View className='flex-row w-full justify-around items-center'>
                        <Pressable onPress={stop}>
                            <AntDesign name='stepbackward' size={30} color={globalColor.text_light} />
                        </Pressable>
                        <Pressable onPress={stop}>
                            <AntDesign name='fastbackward' size={30} color={globalColor.text_light} />
                        </Pressable>
                        <Pressable onPress={() => {
                            isPlaying ? play() : pause();
                            setIsPlaying(!isPlaying);
                        }}>
                            <AntDesign name={isPlaying ? 'play' : 'pause'} size={60} color={globalColor.text_light} />
                        </Pressable>
                        <Pressable onPress={stop}>
                            <AntDesign name='fastforward' size={30} color={globalColor.text_light} />
                        </Pressable>
                        <Pressable onPress={stop}>
                            <AntDesign name='stepforward' size={30} color={globalColor.text_light} />
                        </Pressable>
                    </View>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default AudioBook;
