import React, { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Tts, { Voice } from 'react-native-tts';
import { _getBookContentBypage } from '../apis';

function splitIntoSentences(content: string) {
    const contentWithoutFirstLine = content.split('\n').slice(1);
    return contentWithoutFirstLine.filter(sentence => sentence.trim() !== '');
}

const ListentText = ({ navigation, route }: any) => {
    const { bookId } = route.params;
    const currentSentenceIndex = useRef(0);
    const currentPage = useRef(2);
    const isPaused = useRef(false);
    const renderIndex = useRef(0);
    const speechRate = useRef(0.5);
    const voices = useRef<Voice[]>([]);
    const currentVoice = useRef('');
    const [sentences, setSentences] = useState<string[]>([]);
    const [renderTrigger, setRenderTrigger] = useState(0);
    const flatListRef = useRef<FlatList>(null);
    const speechRates = [
        {id:1, label: 'x0.5', value: 0.1 },
        { id:2,label: 'x1.0', value: 0.5 },
     { id:3,label: 'x1.5', value: 0.75 },
        { id:4,label: 'x2.0', value: 0.99 },
    ]

    useEffect(() => {
        const onTtsFinish = () => {
            if (!isPaused.current && currentSentenceIndex.current < sentences.length - 1) {
                currentSentenceIndex.current += 1;
                renderIndex.current = currentSentenceIndex.current;
                setRenderTrigger((prev) => prev + 1);
                Tts.speak(sentences[currentSentenceIndex.current]);
            } else if (currentSentenceIndex.current >= sentences.length - 1) {
                nextPage();
            }
        };

        Tts.getInitStatus().then(() => {
            Tts.voices().then(availableVoices => {
                const vietnameseVoices = availableVoices.filter(voice => voice.language === 'vi-VN');
                if (vietnameseVoices.length > 0) {
                    voices.current = vietnameseVoices;
                    currentVoice.current = vietnameseVoices[0]?.id;
                } else {
                    console.log('No Vietnamese voices available.');
                }
            });
        });

        const finishListener = Tts.addListener('tts-finish', onTtsFinish);
        Tts.setDefaultRate(speechRate.current);

        if (sentences.length > 0) {
           
            Tts.speak(sentences[0]);
            scrollToIndex(1);
        }

        return () => {
            Tts.stop();
            finishListener.remove();
        };
    }, [sentences]);

    useEffect(() => {
        getContent();
    }, []);

    useEffect(() => {
        scrollToIndex(renderIndex.current);
    }, [renderTrigger]);

    const getContent = async () => {
        const res: any = await _getBookContentBypage(bookId, currentPage.current);
        if (res.status) {
            const content = res.data.content;
            setSentences(splitIntoSentences(content));
        }
    };

    const nextPage = async () => {
        Tts.stop();
        isPaused.current = false;
        currentPage.current += 1;
        currentSentenceIndex.current = 0;
        renderIndex.current = 0;
        setRenderTrigger((prev) => prev + 1);

        await getContent();
        scrollToIndex(0);
    };

    const prevPage = async () => {
        Tts.stop();
        isPaused.current = false;
        currentPage.current -= 1;
        currentSentenceIndex.current = 0;
        renderIndex.current = 0;
        setRenderTrigger((prev) => prev + 1);

        await getContent();
        
    }

    const startReading = () => {
        if (isPaused.current) {
            isPaused.current = false;
            Tts.speak(sentences[currentSentenceIndex.current]);
        } else {
            currentSentenceIndex.current = 0;
            renderIndex.current = 0;
            setRenderTrigger((prev) => prev + 1);
            Tts.speak(sentences[0]);
        }
    };

    const pauseReading = () => {
        isPaused.current = true;
        Tts.stop();
    };

    const resetReading = () => {
        isPaused.current = false;
        Tts.stop();
        currentSentenceIndex.current = 0;
        renderIndex.current = 0;
        setRenderTrigger((prev) => prev + 1);
        Tts.speak(sentences[0]);
    };

    const changeRate = (rate: number) => {
        pauseReading();
        speechRate.current = rate;
        Tts.setDefaultRate(rate);
        startReading();
    };

    const switchVoice = (voiceId: string) => {
        pauseReading();
        currentVoice.current = voiceId;
        Tts.setDefaultVoice(voiceId);
        startReading();
    };

    const renderItem = ({ item, index }: { item: string; index: number }) => (
        <Text style={[styles.sentence, renderIndex.current === index && styles.highlighted]}>
            {item}
        </Text>
    );

    const scrollToIndex = (index: number) => {
        if (index > 0) {
            flatListRef.current?.scrollToIndex({ animated: true, index,viewPosition: 0.2 });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={startReading} style={styles.button}>
                    <Text style={styles.buttonText}>Đọc</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={pauseReading} style={styles.button}>
                    <Text style={styles.buttonText}>Tạm dừng</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={resetReading} style={[styles.button, styles.resetButton]}>
                    <Text style={styles.buttonText}>Đọc lại từ đầu</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={nextPage} style={styles.button}>
                    <Text style={styles.buttonText}>Chuyển trang</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={prevPage} style={styles.button}>
                    <Text style={styles.buttonText}>Trang trước</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.rateContainer}>
                <Text style={styles.label}>Chọn tốc độ:</Text>
                <View style={styles.rateButtons}>
                    {speechRates.map(rate => (
                        <TouchableOpacity key={rate.id} onPress={() => changeRate(rate.value)} style={styles.rateButton}>
                            <Text style={styles.rateButtonText}>{rate.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.voiceContainer}>
                <Text style={styles.label}>Chọn giọng:</Text>
                <View style={styles.voiceButtons}>
                    {voices.current.slice(0, 3).map(voice => (
                        <TouchableOpacity key={voice.id} onPress={() => switchVoice(voice.id)} style={[styles.voiceButton, {
                            backgroundColor: voice.id === currentVoice.current ? '#007bff' : '#e0e0e0',
                        }]}>
                            <Text style={styles.voiceButtonText}>{voice.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <FlatList
                ref={flatListRef}
                data={sentences}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 220 }}
                keyExtractor={(item, index) => index.toString()}
                getItemLayout={(data, index) => ({
                    length: 30,
                    offset: 30 * index,
                    index,
                })}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        paddingHorizontal: 30
    },
    sentence: {
        fontSize: 18,
        marginTop:5
    },
    highlighted: {
        backgroundColor: 'yellow',
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
        marginBottom: 10,
    },
    resetButton: {
        backgroundColor: 'red',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    rateContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    rateButtons: {
        flexDirection: 'row',
    },
    rateButton: {
        backgroundColor: '#e0e0e0',
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    rateButtonText: {
        fontSize: 16,
    },
    voiceContainer: {
        marginBottom: 20,
    },
    voiceButtons: {
        flexDirection: 'row',
    },
    voiceButton: {
        backgroundColor: '#e0e0e0',
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    voiceButtonText: {
        fontSize: 16,
    },
});

export default ListentText;
