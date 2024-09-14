import { View, Text, FlatList, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useTailwind } from 'tailwind-rn';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../providers/AuthProvider';
import { useNavigation } from '@react-navigation/native';

const ListNotes = () => {

  const tw = useTailwind();
  const context = useContext(AuthContext);
  const [notelists, setNotelists] = useState<any[]>([]);

  const nav = useNavigation();

  const getAllNotes = async () => {
    try {
      const uid = context?.user?.auth?.uid
      const notesCollectionRef = firestore().collection(`Users/${uid}/notes`);
      const snapshot = await notesCollectionRef.get();

      const notes = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setNotelists(notes);
    } catch (e) {
      console.error("Error fetching notes: ", e);

    }
  };

  useEffect(() => {
    getAllNotes()
  }, [])


  return (
    <FlatList
      data={notelists}
      contentContainerStyle={tw('p-4 py-0 flex-1')}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={() => {
        return (
          <View style={tw('flex-1 justify-center items-center')}>
            <Text style={tw('text-lg font-bold')}>No notes found</Text>
          </View>
        )
      }}
      renderItem={({ item }) => (
        <Pressable style={tw('bg-white dark:bg-slate-900   p-4 my-2 rounded-md')}
          onPress={() => {
            nav.navigate('Note', { id: item.id })
          }}
        >
          <Text style={tw('text-lg text-slate-900 dark:text-white font-bold')}>{item.title}</Text>
          <Text>{item.body}</Text>
        </Pressable>
      )}
    />
  )
}

export default ListNotes