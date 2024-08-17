import React from 'react';
import { FlatList, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Props {
    rating: number;
}

const Rate = (props: Props) => {
    const { rating } = props;
    return (
        <View>
            <FlatList
                data={{ length: 5 }}
                renderItem={({ item, index }) => {
                    return (
                        <AntDesign
                            name={index < rating ? 'star' : 'staro'}
                            size={14}
                            color='#FFD700'
                        />
                    )
                }}
                keyExtractor={(item, index) => index.toString()}
                horizontal
            />
        </View>
    )
}

export default Rate