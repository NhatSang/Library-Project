import React from 'react'
import { Text, View } from 'react-native'

const ToastConfig = () => {
    info: (props: any) => {
        <View style={{ padding: 15, backgroundColor: '#333', borderRadius: 10 }}>
            <Text style={{ color: '#fff', fontSize: 18 }}>{props.text1}</Text>
        </View>
    }
    success: (props: any) => {
        <View style={{ padding: 15, backgroundColor: 'green', borderRadius: 10 }}>
            <Text style={{ color: '#fff', fontSize: 18 }}>{props.text1}</Text>
        </View>
    }
    error: (props: any) => {
        <View style={{ padding: 15, backgroundColor: 'red', borderRadius: 10 }}>
            <Text style={{ color: '#fff', fontSize: 18 }}>{props.text1}</Text>
        </View>
    }
}

export default ToastConfig