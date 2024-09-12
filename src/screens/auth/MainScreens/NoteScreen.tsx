import { View, Text, TextInput } from 'react-native'
import React, { useContext } from 'react'
import { useTailwind } from 'tailwind-rn';
import Button from '../../../components/Button';
import Geolocation from '@react-native-community/geolocation';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../../providers/AuthProvider';

export default function NoteScreen() {
const [title, setTitle] = React.useState('');
const [body, setBody] = React.useState('');
const [location, setLocation] = React.useState({});
const tw = useTailwind();
const context = useContext(AuthContext);

Geolocation.getCurrentPosition(info => {
    setLocation(info);
});

const handleSave = () => { 
  try {
    const uid = context?.user?.auth?.uid
  const notesCollectionRef = firestore().collection(`Users/${uid}/notes`);

  notesCollectionRef.add({
    title,
    body,
    location,
  }).then(() => {
    console.log("Note saved!");
    setTitle('');
    setBody('');
   });


  } catch (error) {
    console.error("Error saving note: ", error);
  }
}

return (
<View style={tw('bg-white dark:bg-slate-800 p-6 px-4 flex-1')}>
    <Text>NoteScreen</Text>
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
            <TextInput placeholder="Enter Title" style={tw('w-full border border-gray-300 rounded-md p-2')} value={body}
                onChangeText={text=> {
                setBody(text);
                }}
                />
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
