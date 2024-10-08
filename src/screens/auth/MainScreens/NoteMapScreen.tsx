import { View, Text, StyleSheet } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import MapLibreGL, { Camera, PointAnnotation } from '@maplibre/maplibre-react-native';
import { useTailwind } from 'tailwind-rn';
import Geolocation from '@react-native-community/geolocation';
import { AuthContext } from '../../../providers/AuthProvider';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../../../providers/AppProvider';
import { MAPS_API_KEY } from '../../../utils';

MapLibreGL.setAccessToken(null);
const styleUrl = `https://tiles.stadiamaps.com/styles/alidade_smooth.json?api_key=${MAPS_API_KEY}`;

const NoteMapScreen = () => {
  const tw = useTailwind();
  const [currentLocation, setLocation] = React.useState<any>(null);

  const { state } = useContext(AppContext)
  const notelists = state?.notes;
  const nav = useNavigation();


  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      setLocation(info);
    }, () => {
      setLocation(null);
    });
  }, [])


  const getPins = useCallback(() => {
    return notelists.map(note => {
      if (!note?.location?.coords) {
        return null
      }
      return (
        <PointAnnotation
          key={note.id}
          id={note.id}
          coordinate={[note.location.coords.longitude, note.location.coords.latitude]}
          title={note.title}
          onSelected={() => {
            nav.navigate('Note', { note: note })
          }}
        />
      )
    })


  }, [notelists]);


  return (
    <View style={tw('flex-1 bg-slate-200 dark:bg-slate-700 p-2')}>
      {
        currentLocation ? (
          <MapLibreGL.MapView style={styles.map} logoEnabled={false} styleURL={styleUrl} onPress={(e) => console.log(e)}
          >
            <Camera
              zoomLevel={10}
              centerCoordinate={
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
