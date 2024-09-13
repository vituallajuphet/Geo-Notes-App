import React, { useContext } from 'react';
import { ActivityIndicator, Modal, Pressable } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { AppContext } from '../providers/AppProvider';

export const withLoading = (Component: any) => {
    return (props: any) => {
        const tw = useTailwind();
        const { state } = useContext(AppContext);
        const isLoading = state?.loading;

        return (
        <>
             {
                isLoading ? (
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={isLoading}
                        style={tw('flex-1 h-full w-full')}
                    >
                        <Pressable style={tw('justify-center items-center bg-black bg-opacity-70 z-20 absolute w-full h-full')} onPress={() => {}}>
                            <ActivityIndicator size="large" color="#fff" />
                        </Pressable>
                    </Modal> ) : null
             }
           <Component {...props} />
      </>
        )
    };
}