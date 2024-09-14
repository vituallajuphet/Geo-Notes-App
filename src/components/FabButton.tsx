import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import React from 'react'
import { useTailwind } from 'tailwind-rn'
import Icon from 'react-native-vector-icons/FontAwesome';

type FabButtonProps = TouchableOpacityProps

const FabButton = (props: FabButtonProps) => {
    const tw = useTailwind();
    return (
        <TouchableOpacity
            {...props}
            style={tw('items-center absolute justify-center p-3 bg-blue-500 rounded-full bottom-2 w-14 h-14 self-end right-2')}
        >
            <Icon name="plus" size={25} />
        </TouchableOpacity>
    )
}

export default FabButton