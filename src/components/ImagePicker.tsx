import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useTailwind } from 'tailwind-rn';
import Icon from 'react-native-vector-icons/FontAwesome';

type ImagePickerProps = {
  onImageSelected: (image: any) => void
  selected?: any
  onRemove?: () => void
}

const ImagePicker = ({ onImageSelected, selected, onRemove }: ImagePickerProps) => {
  const tw = useTailwind();
  return (
    <View style={tw('bg-slate-600 justify-center items-center  p-4 rounded-md')}>
      {selected ? (
        <View style={tw('w-full h-40 rounded-md')}>
          <TouchableOpacity
            style={tw('absolute -top-2 w-8 items-center justify-center h-8 -right-2 p-1 bg-red-500 rounded-full z-20')}
            onPress={() => {
              if (onRemove) {
                onRemove()
              }
            }}
          >
            <Icon name="times" size={20} color="white" />
          </TouchableOpacity>
          <Image source={{ uri: selected.uri }} style={tw('w-full h-full rounded-md')} />
        </View>
      ) : (
        <>
          <TouchableOpacity
            style={[
              tw('items-center w-full justify-center  rounded-md h-24'),
              styles.dashed,
            ]}
            onPress={() => {
              launchImageLibrary({ mediaType: 'photo', quality: 0.1, selectionLimit: 1 }, (response) => {
                if (response.assets) {
                  onImageSelected(response)
                }
              });
            }}
          >
            <Text style={tw('text-sm text-white font-semibold')}>Upload Image</Text>
          </TouchableOpacity>
          <Text style={tw('text-sm my-2 text-white')}>Or</Text>
          <TouchableOpacity
            style={tw('items-center justify-center p-3 bg-blue-500 rounded-md self-center flex-row')}
            onPress={() => {
              launchCamera({ mediaType: 'photo', quality: 0.1 }, (response) => {
                if (response.assets) {
                  onImageSelected(response)
                }
              });
            }}
          >
            <Icon name="camera" size={20} color="white" />
            <Text style={tw('text-sm text-white font-semibold ml-2')}>Capture Camera</Text>
          </TouchableOpacity></>
      )}

    </View>
  )
}

const styles = StyleSheet.create({
  gap4: {
    gap: 20,
  },
  dashed: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: 'white'
  }
})

export default ImagePicker