import { View, Text, TextInput, Platform } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useTailwind } from 'tailwind-rn';
import Button from '../../../components/Button';
import Geolocation from '@react-native-community/geolocation';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../../providers/AuthProvider';
import { AppContext } from '../../../providers/AppProvider';
import { withLoading } from '../../../HOC/withLoading';
import ImagePicker from '../../../components/ImagePicker';
import storage from '@react-native-firebase/storage';
import uuid from 'react-native-uuid';
import { getFileExtension } from '../../../utils';

const  NoteScreen =()  => {
  const [title, setTitle] = React.useState('');
  const [selectedImage, setSelectedImage] = React.useState<any>(null);
  const [body, setBody] = React.useState('');
  const [location, setLocation] = React.useState({});
  const tw = useTailwind();
  const context = useContext(AuthContext);

  const {send} = useContext(AppContext);

  Geolocation.getCurrentPosition(info => {
      setLocation(info);
  });

useEffect(() => {

  const getImages = async () => { 
    const reference = storage().ref('/images/image.png');

    const url = await reference.getDownloadURL();
    console.log("Image url: ", url);
  }

  getImages();

}, [])


  const handleSave = async () => { 
    if(selectedImage) {
      const uploadUri = Platform.OS === 'ios' ? selectedImage.uri.replace('file://', '') : selectedImage.uri;
      const ext = getFileExtension(uploadUri);
      const uid = uuid.v4();
      const fullPath = `images/${uid}.${ext}`;
      const res = await storage().ref(fullPath).putFile(uploadUri);

      send(prev => ({...prev, loading: true}));
      try {
        const uid = context?.user?.auth?.uid
        const notesCollectionRef = firestore().collection(`Users/${uid}/notes`);

        notesCollectionRef.add({
          title,
          body, 
          location,
          imagepath: fullPath
        }).then(() => {
          send(prev => ({...prev, loading: false}));
          setTitle('');
          setBody('');
        });

      } catch (error) {
        console.error("Error saving note: ", error);
        send(prev => ({...prev, loading: false}));
      }
    }    
  }

 
  return (
    <View style={tw('bg-white dark:bg-slate-800 p-6 px-4 flex-1')}>
        <Text style={tw('text-2xl font-bold')}>Note</Text>
        <Text style={tw('text-sm text-gray-500 mt-2')}>Fill the form to add new note</Text>
        <View style={tw('mt-8')}>
            <View>
                <Text style={tw('font-bold text-sm mb-1')}>Title</Text>
                <TextInput placeholder="Enter Title" style={tw('w-full border border-gray-300 rounded-md p-2')} value={title}
                    onChangeText={text=> {
                    setTitle(text);
                    }}
                    />
            </View>
            <View style={tw('mt-4')}>
                <Text style={tw('font-bold text-sm mb-1')}>Body</Text>
                <TextInput multiline placeholder="Enter Content" style={tw('w-full border border-gray-300 rounded-md p-2')} value={body}
                    onChangeText={text=> {
                    setBody(text);
                    }}
                    />
            </View>
            <View style={tw('mt-4 mb-4')}>
                    <ImagePicker onImageSelected={(res) => {
                      setSelectedImage(res.assets[0]);
                    }}/>
            </View>
            <View style={tw('mt-4')}>
                <Button title="Save Note" onPress={()=> {
                    handleSave()
                    }}/>
            </View>
        </View>
    </View>
  )
}

export default withLoading(NoteScreen);