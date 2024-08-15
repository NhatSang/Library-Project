import AppButton from '@components/AppButton';
import React, { useState } from 'react';
import { View } from 'react-native';

const DemoDownLoad = () => {
    const [isLoadding, setIsLoadding] = useState(false);
    const downloadPDF = async (url: string) => { };
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