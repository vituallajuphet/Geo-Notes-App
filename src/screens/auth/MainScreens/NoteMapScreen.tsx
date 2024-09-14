import { View, Text, StyleSheet } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import MapLibreGL, { Camera, PointAnnotation } from '@maplibre/maplibre-react-native';
import { useTailwind } from 'tailwind-rn';
import Geolocation from '@react-native-community/geolocation';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../../providers/AuthProvider';

MapLibreGL.setAccessToken(null);
const apiKey = 'e229690a-f2a0-4915-b43d-b79e90b62832';
const styleUrl = `https://tiles.stadiamaps.com/styles/alidade_smooth.json?api_key=${apiKey}`;

const NoteMapScreen = () => {
  const tw = useTailwind();
  const [currentLocation, setLocation] = React.useState<any>(null);

  const context = useContext(AuthContext);
  const [notelists, setNotelists] = useState<any[]>([]);

  const getAllNotes = async () => {
    try {
      const uid = context?.user?.auth?.uid
      const notesCollectionRef = firestore().collection(`Users/${uid}/notes`);
      const snapshot = await notesCollectionRef.get();

      const notes = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("notes", notes)

      setNotelists(notes);
    } catch (e) {
      console.error("Error fetching notes: ", e);

    }
  };

  useEffect(() => {
    getAllNotes()
  }, [])


  Geolocation.getCurrentPosition(info => {
    setLocation(info);
  }, () => {
    setLocation(null);
  });

  const getPins = useCallback(() => {
    return notelists.map(note => {
      return (
        <PointAnnotation key={note.id} id={note.id} coordinate={[note.location.coords.longitude, note.location.coords.latitude]} title={note.title} onSelected={() => console.log('onSelected')} />
      )
    })


  }, [notelists]);


  return (
    <View style={tw('flex-1 bg-white dark:bg-slate-900')}>
      {
        currentLocation ? (
          <MapLibreGL.MapView style={styles.map} logoEnabled={false} styleURL={styleUrl} onPress={(e) => console.log(e)}
          >
            <Camera zoomLevel={10} centerCoordinate={
              [currentLocation.coords.longitude, currentLocation.coords.latitude]
            } />
            {getPins()}

          </MapLibreGL.MapView>
        ) : (
          <View style={tw('flex-1 items-center justify-center')}>
            <Text style={tw('text-red-300 font-semibold text-base')}>
              Enable location to view map
            </Text>
          </View>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    flex: 1,
    alignSelf: 'stretch',
  },
});


export default NoteMapScreen
