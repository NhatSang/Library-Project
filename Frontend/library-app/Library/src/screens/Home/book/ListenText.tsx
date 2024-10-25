import React, { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Tts, { Voice } from 'react-native-tts';
import { _getBookContentBypage } from '../apis';

function splitIntoSentences(content: string) {
    // Xóa dòng đầu tiên
    const contentWithoutFirstLine = content.split('\n').slice(1).join(' ');
    // Tách các câu dựa trên điều kiện ít nhất hai từ và dấu chấm, dấu chấm hỏi hoặc dấu chấm than
    return contentWithoutFirstLine.split(/(?<=[.!?])\s+(?=\S{4,})/);
}

const ListentText = ({ navigation, route }: any) => {
    const { bookId } = route.params;
    const currentSentenceIndex = useRef(0);  // Bắt đầu từ câu đầu tiên
    const currentPage = useRef(2);  // Trang hiện tại
    const isPaused = useRef(false);  // Trạng thái tạm dừng
    const [renderIndex, setRenderIndex] = useState(0);  // Dùng để cập nhật giao diện
    const [speechRate, setSpeechRate] = useState(0.5);  // Tốc độ đọc
    const [voices, setVoices] = useState<Voice[]>([]);  // Lưu danh sách các giọng đọc
    const [currentVoice, setCurrentVoice] = useState('');  // Giọng đọc hiện tại
    const [sentences, setSentences] = useState<string[]>([]);  // Tách nội dung thành các câu
    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        const onTtsFinish = () => {
            if (!isPaused.current && currentSentenceIndex.current < sentences.length - 1) {
                currentSentenceIndex.current += 1;
                setRenderIndex(currentSentenceIndex.current);  // Cập nhật chỉ số render
                Tts.speak(sentences[currentSentenceIndex.current]);  // Đọc câu tiếp theo
            } else if (currentSentenceIndex.current >= sentences.length - 1) {
                nextPage();  // Khi hết câu của trang hiện tại, chuyển sang trang tiếp theo
            }
        };

        Tts.getInitStatus().then(() => {
            Tts.voices().then(availableVoices => {
                // Lọc danh sách giọng chỉ lấy những giọng có language là 'vi-VN' (giọng tiếng Việt)
                const vietnameseVoices = availableVoices.filter(voice => voice.language === 'vi-VN');
                if (vietnameseVoices.length > 0) {
                    setVoices(vietnameseVoices);  // Cập nhật danh sách giọng tiếng Việt
                    setCurrentVoice(vietnameseVoices[0]?.id);  // Chọn giọng tiếng Việt đầu tiên
                } else {
                    console.log('No Vietnamese voices available.');
                }
            });
        });

        const finishListener = Tts.addListener('tts-finish', onTtsFinish);
        Tts.setDefaultRate(speechRate);

        if (sentences.length > 0) {
            Tts.speak(sentences[0]);
        }

        return () => {
            finishListener.remove();
        };
    }, [speechRate, sentences]);

    useEffect(() => {
        getContent();
    }, []);

    useEffect(() => {
        scrollToIndex(renderIndex);
    }, [renderIndex]);

    const getContent = async () => {
        const res: any = await _getBookContentBypage(bookId, currentPage.current);
        if (res.status) {
            const content = res.data.content;
            setSentences(splitIntoSentences(content));
        }
    };

    // Hàm chuyển sang trang tiếp theo
    const nextPage = async () => {

        Tts.stop();  // Dừng đọc hiện tại
        isPaused.current = false;  // Reset tạm dừng
        currentPage.current += 1;  // Tăng số trang hiện tại
        currentSentenceIndex.current = 0;  // Reset chỉ số câu về 0
        setRenderIndex(0);  // Cập nhật lại renderIndex

        // Lấy nội dung của trang tiếp theo
        await getContent();

        // // Bắt đầu đọc lại từ câu đầu tiên của trang mới
        // if (sentences.length > 0) {
        //     Tts.speak(sentences[1]);
        // }
    };

    // Bắt đầu hoặc tiếp tục đọc
    const startReading = () => {
        if (isPaused.current) {
            isPaused.current = false;
            Tts.speak(sentences[currentSentenceIndex.current]);
        } else {
            currentSentenceIndex.current = 0;
            setRenderIndex(0);
            Tts.speak(sentences[0]);
        }
    };

    // Tạm dừng đọc
    const pauseReading = () => {
        isPaused.current = true;
        Tts.stop();
    };

    // Reset và bắt đầu lại từ đầu
    const resetReading = () => {
        isPaused.current = false;
        Tts.stop();
        currentSentenceIndex.current = 0;
        setRenderIndex(0);
        Tts.speak(sentences[0]);
    };

    // Thay đổi tốc độ đọc
    const changeRate = (rate: number) => {
        setSpeechRate(rate);
        Tts.setDefaultRate(rate);
    };

    // Thay đổi giọng đọc
    const switchVoice = (voiceId: string) => {
        setCurrentVoice(voiceId);
        Tts.setDefaultVoice(voiceId);  // Thiết lập giọng đọc mới
    };

    const renderItem = ({ item, index }: { item: string; index: number }) => {
        return (
            <Text style={[styles.sentence, renderIndex === index && styles.highlighted]}>
                {item}
            </Text>
        );
    };

    const scrollToIndex = (index: number) => {
        if (index > 0) {
            flatListRef.current?.scrollToIndex({ animated: true, index });
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={startReading} style={styles.button}>
                    <Text style={styles.buttonText}>
                        {'Bắt đầu'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={pauseReading} style={styles.button}>
                    <Text style={styles.buttonText}>
                        {'Tạm dừng'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={resetReading} style={[styles.button, styles.resetButton]}>
                    <Text style={styles.buttonText}>
                        {'Đoc lại từ đầu'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={nextPage} style={styles.button}>
                    <Text style={styles.buttonText}>Chuyển trang</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.rateContainer}>
                <Text style={styles.label}>Chọn tốc độ:</Text>
                <View style={styles.rateButtons}>
                    {[0.5, 1.0, 1.5, 2.0].map(rate => (
                        <TouchableOpacity key={rate} onPress={() => changeRate(rate)} style={styles.rateButton}>
                            <Text style={styles.rateButtonText}>{rate}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.voiceContainer}>
                <Text style={styles.label}>Chọn giọng:</Text>
                <View style={styles.voiceButtons}>
                    {voices.slice(0, 3).map(voice => (
                        <TouchableOpacity key={voice.id} onPress={() => switchVoice(voice.id)} style={[styles.voiceButton, {
                            backgroundColor: voice.id === currentVoice ? '#007bff' : '#e0e0e0',
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
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        paddingHorizontal: 30
    },
    sentence: {
        fontSize: 18,
        marginVertical: 5,
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
