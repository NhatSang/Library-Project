import { globalColor } from '@constants/globalColor';
import Slider from '@react-native-community/slider';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import TrackPlayer, { usePlaybackState, useProgress } from 'react-native-track-player';

const HistoryScreen = () => {
    const playbackState = usePlaybackState();
    const progress = useProgress();
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        const setupPlayer = async () => {
            await TrackPlayer.setupPlayer();
            await TrackPlayer.add({
                url: 'https://file-examples.com/storage/fe519944ff66ba53b99c446/2017/11/file_example_MP3_700KB.mp3',
            });
        };
        setupPlayer();

        return () => {
            TrackPlayer.stop();
        };
    }, []);


    useEffect(() => {
        setPosition(progress.position);
        setDuration(progress.duration);
        console.log('progress', (position / duration) * 100);
    }, [progress]);



    const play = async () => {
        await TrackPlayer.play();
    };

    const pause = async () => {
        await TrackPlayer.pause();
    };

    const stop = async () => {
        await TrackPlayer.stop();
    };

    const seekTo = async (time: number) => {
        await TrackPlayer.seekTo(time);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>HistoryScreen</Text>
            <View style={styles.controls}>
                <Button title="Play" onPress={play} />
                <Button title="Pause" onPress={pause} />
                <Button title="Stop" onPress={stop} />
            </View>
            <View style={styles.progressContainer}>
                <Text style={styles.progressText}>{`Position: ${Math.floor(progress.position)}s`}</Text>
                <Text style={styles.progressText}>{`Duration: ${Math.floor(progress.duration)}s`}</Text>
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
    },
    slider: {
        width: '100%',
        height: 40,
    },
});

export default HistoryScreen;
