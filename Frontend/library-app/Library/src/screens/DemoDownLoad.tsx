import AppButton from '@components/AppButton';
import { ScreenName } from '@constants/ScreenName';
import React, { useState } from 'react';
import { View } from 'react-native';
import RNFetchBlob from 'react-native-blob-util';


const DemoDownLoad = ({ navigation }: any) => {
    const [isLoadding, setIsLoadding] = useState(false);
    const downloadPDF = async (url: string) => {
        setIsLoadding(true);
        const { config, fs } = RNFetchBlob;
        const { DocumentDir } = fs.dirs;
        const filePath = `${DocumentDir}/thuat-giai-mong-cua-nguoi-xua.pdf`;
        const isFileExist = await RNFetchBlob.fs.exists(filePath);
        if (isFileExist) {
            setIsLoadding(false);
            navigation.navigate(ScreenName.TabRouter, { pdfUrl: filePath });
        } else {
            config({
                fileCache: true,
                path: filePath,
            }).fetch('GET', url)
                .then((res) => {
                    setIsLoadding(false);
                    console.log('The file saved to ', res.path());
                })
                .catch((err) => {
                    setIsLoadding(false);
                    console.log('Error download file: ', err);
                });
        }
    };
    return (
        <View className='flex-1 justify-center items-center'>
            <AppButton
                onPress={() => downloadPDF('https://file.nhasachmienphi.com/pdf/nhasachmienphi-thuat-giai-mong-cua-nguoi-xua.pdf')}
                loading={isLoadding}
                title='Download PDF'
            />
        </View>
    )
}

export default DemoDownLoad