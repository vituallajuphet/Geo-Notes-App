import { Text, TouchableOpacity,  TextStyle, TouchableOpacityProps, ViewProps } from 'react-native'
import React, { forwardRef } from 'react'
import { useTailwind } from 'tailwind-rn';

type ButtonProps  = {
    textStyle?: TextStyle;
    disabled?: boolean;
    title?: string

  } & TouchableOpacityProps;
  
  const Button = forwardRef<any , ButtonProps>(
    ({  onPress, style, textStyle, disabled = false, title, ...rest }, ref) => {

        const tw = useTailwind();

        const isDisabled = disabled ? tw('opacity-50') : {};
      return (
        <TouchableOpacity
          ref={ref}
          style={[
            style,
            tw('bg-blue-500 p-2 py-3 rounded-md items-center justify-center'),
            isDisabled
          ]}
          onPress={onPress}
          activeOpacity={0.7}
          disabled={disabled}
          {...rest}
        >
            <Text style={[textStyle, tw('text-white text-base font-semibold uppercase')]}>{title}</Text>
        </TouchableOpacity> 
      );
    }
  );
  

export default Button