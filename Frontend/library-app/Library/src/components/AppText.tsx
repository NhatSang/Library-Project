import React from 'react'
import { StyleProp, Text, TextStyle } from 'react-native'

type Props = {
    text: string,
    size: number,
    font?: string,
    numberOfLines?: number,
    color?: string,
    styles?:StyleProp<TextStyle>
}

const AppText = (props:Props) => {
    const {text, size, font, numberOfLines, color, styles} = props
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