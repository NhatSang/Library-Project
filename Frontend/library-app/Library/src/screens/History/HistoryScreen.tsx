import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import SoundPlayer from 'react-native-sound-player';
import { globalColor } from '@constants/globalColor';

const HistoryScreen = () => {
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        const setupSoundPlayer = async () => {
            try {
                SoundPlayer.playUrl('https://storage.googleapis.com/audio-book-2024/1725432037712_undefined.wav');
                const info = await SoundPlayer.getInfo(); // Lấy thông tin về file âm thanh
                setDuration(info.duration); // Cập nhật thời lượng
            } catch (e) {
                console.log('Cannot play the sound file', e);
            }
        };

        setupSoundPlayer();

        // Xử lý sự kiện cập nhật vị trí phát nhạc
        const interval = setInterval(async () => {
            try {
                const info = await SoundPlayer.getInfo();
                setPosition(info.currentTime);
            } catch (e) {
                console.log('Error getting sound info', e);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
            SoundPlayer.stop();
        };
    }, []);

    const playSoundFromUrl = () => {
        try {
            SoundPlayer.playUrl('https://pdf8888.s3.ap-southeast-1.amazonaws.com/SampleAudio_0.4mb.mp3');
        } catch (e) {
            console.log('Cannot play the sound file', e);
        }
    };

    const pauseSound = () => {
        SoundPlayer.pause();
    };

    const stopSound = () => {
        SoundPlayer.stop();
        setPosition(0); // Reset vị trí về 0 khi dừng
    };

    const seekTo = async (value) => {
        try {
            SoundPlayer.seek(value);
            setPosition(value);
        } catch (e) {
            console.log('Error seeking sound', e);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>HistoryScreen</Text>
            <View style={styles.controls}>
                <Button title="Play" onPress={playSoundFromUrl} />
                <Button title="Pause" onPress={pauseSound} />
                <Button title="Stop" onPress={stopSound} />
            </View>
            <View style={styles.progressContainer}>
                <Text style={styles.progressText}>{`Position: ${Math.floor(position)}s`}</Text>
                <Text style={styles.progressText}>{`Duration: ${Math.floor(duration)}s`}</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={duration}
                    value={position}
                    onSlidingComplete={seekTo}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: globalColor.dark,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    controls: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    progressContainer: {
        width: '80%',
    },
    progressText: {
        fontSize: 16,
        color: 'white',
        marginBottom: 10,
    },
    slider: {
        width: '100%',
        height: 40,
    },
});

export default HistoryScreen;
