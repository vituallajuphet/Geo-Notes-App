import { View, Text, FlatList, Pressable } from 'react-native'
import React, { useContext } from 'react'
import { useTailwind } from 'tailwind-rn';
import { AuthContext } from '../providers/AuthProvider';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../providers/AppProvider';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';

const ListNotes = () => {

  const tw = useTailwind();
  const context = useContext(AuthContext);
  const { state } = useContext(AppContext);

  const nav = useNavigation();

  return (
    <FlatList
      data={state?.notes}
      contentContainerStyle={[tw('p-4 py-0 '), !state?.notes.length ? tw('flex-1 justify-center items-center') : {}]}
      keyExtractor={(item) => item.id}
      scrollEnabled={true}
      ListEmptyComponent={() => {
        return (
          <View style={tw('flex-1 justify-center items-center h-full')}>
            <Icon name="exclamation-circle" size={50} color="#ccc" />
            <Text style={tw('text-lg font-bold')}>No notes found</Text>
          </View>
        )
      }}
      renderItem={({ item }) => {
        return (
          (
            <Pressable style={tw('bg-slate-100 dark:bg-slate-900   p-4 my-1 rounded-md')}
              onPress={() => {
                nav.navigate('Note', { note: item })
              }}
            >
              <Text style={tw('text-lg text-slate-900 dark:text-white font-bold')}>{item.title}</Text>
              <Text style={tw('text-slate-900 dark:text-white')} >{item.body}</Text>
              <Text style={tw('text-xs mt-4 text-slate-900 dark:text-white')}>{moment(new Date(item.date)).fromNow()}</Text>
            </Pressable>
          )
        )
      }}
    />
  )
}

export default ListNotes