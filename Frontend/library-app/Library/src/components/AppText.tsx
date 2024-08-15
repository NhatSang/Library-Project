import React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';

type Props = {
    text: string | number | undefined,
    size?: number,
    font?: string,
    numberOfLines?: number,
    color?: string,
    className?: string,
    styles?: StyleProp<TextStyle>
}

const AppText = (props: Props) => {
    const { text, size, font, numberOfLines, color, className, styles } = props
    return (
        <Text
            numberOfLines={numberOfLines}
            style={[
                {
                    fontFamily: font ?? 'Roboto-Regular',
                    fontSize: size ?? 14,
                    color: color ?? 'black'
                },
                styles
            ]}
        >
            {text}
        </Text>
    )
}

export default AppText