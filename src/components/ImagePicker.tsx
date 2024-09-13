import {  Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { useTailwind } from 'tailwind-rn';

const ImagePicker = () => {
    const tw = useTailwind();
  return (
    <View style={tw('bg-slate-600 justify-center items-center  p-4 rounded-md')}>
        <TouchableOpacity
            style={tw(' items-center w-full justify-center border border-white rounded-md h-24')} 
            onPress={() => {
                launchImageLibrary({ mediaType: 'photo', quality: 0.2, selectionLimit: 1 }, (response) => {
                console.log(response)});
            }}
        >
            <Text style={tw('text-sm text-white')}>Upload Image</Text>
        </TouchableOpacity>
        <Text style={tw('text-sm my-2 text-white')}>Or</Text>
        <TouchableOpacity
            style={tw(' items-center justify-center p-3 bg-blue-500 rounded-md self-center')} 
            onPress={() => {
                launchCamera({ mediaType: 'photo' }, (response) => {
                console.log(response)});
            }}
        >
            <Text style={tw('text-sm text-white ')}>Capture Camera</Text>
        </TouchableOpacity>
    </View>
  )
}

export default ImagePicker