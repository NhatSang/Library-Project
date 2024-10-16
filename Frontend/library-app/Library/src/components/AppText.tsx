import React from 'react';
import { Pressable, StyleProp, Text, TextStyle } from 'react-native';

type Props = {
    text: string | number | undefined,
    size?: number,
    font?: string,
    numberOfLines?: number,
    color?: string,
    styles?: StyleProp<TextStyle>,
    onPress?: () => void,
    center?: boolean
}

const AppText = (props: Props) => {
    const { text, center, size, font, numberOfLines, color, styles, onPress } = props;

    const textComponent = (
        <Text
            numberOfLines={numberOfLines}
            style={[
                {
                    textAlign: center ? 'center' : 'left',
                    fontFamily: font ?? 'Roboto-Regular',
                    fontSize: size ?? 14,
                    color: color ?? 'black'
                },
                styles
            ]}
        >
            {text}
        </Text>
    );

    return onPress ? (
        <Pressable onPress={onPress}>
            {textComponent}
        </Pressable>
    ) : (
        textComponent
    );
}

export default AppText;
