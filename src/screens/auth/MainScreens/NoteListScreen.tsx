import { View } from 'react-native'
import React from 'react'
import { useTailwind } from 'tailwind-rn';

import ListNotes from '../../../components/ListNotes';

const NoteListScreen = () => {

  const tw = useTailwind();

  return (
    <View style={tw('flex-1 bg-white dark:bg-slate-800  py-0')}>
      <ListNotes />
    </View>
  )
}

export default NoteListScreen