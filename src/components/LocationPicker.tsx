import { View, Text, StyleSheet, Modal, Pressable } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import MapLibreGL, { Camera, PointAnnotation } from '@maplibre/maplibre-react-native';
import { useTailwind } from 'tailwind-rn';
import Geolocation from '@react-native-community/geolocation';
import { MAPS_API_KEY } from '../utils';

MapLibreGL.setAccessToken(null);
const styleUrl = `https://tiles.stadiamaps.com/styles/alidade_smooth.json?api_key=${MAPS_API_KEY}`;

type LocationPickerProps = {
  open: boolean;
  onClose?: () => void;
  onSelect?: (location: any) => void;
}

const LocationPicker = ({
  open,
  onClose,
  onSelect
}: LocationPickerProps) => {
  const tw = useTailwind();
  const [currentLocation, setLocation] = React.useState<any>(null);
  const [selected, setSelected] = React.useState<any>(null);



  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      setLocation(info);
    }, () => {
      setLocation(null);
    });

    return () => {
      setSelected(null);
    }
  }, [])


  const getPins = useCallback(() => {

    if (selected) {
      return (
        <PointAnnotation
          key="pointAnnotation"
          id="pointAnnotation"
          coordinate={[
            selected.longitude,
            selected.latitude
          ]}
        />
      )
    }
    return null;


  }, [selected]);


  return (
    <Modal transparent visible={open} style={tw('w-full flex-1')}>
      <View style={tw('flex-1 bg-slate-200 dark:bg-slate-700 p-4 py-8')}>
        <View style={tw('flex-row justify-between items-center mb-4')}>
          <View>
            <Text style={tw('text-lg font-bold text-slate-700 dark:text-slate-100')}>Select Location</Text>
            <Text style={tw('text-xs text-slate-700 dark:text-slate-200')}>Tap on the map to select  location</Text>
          </View>
          <View style={tw('flex-row')}>
            {
              selected ? (
                <Pressable onPress={() => {
                  if (onSelect) {
                    onSelect(selected)
                  }
                }}
                  style={tw('mr-2')}
                >
                  <Text style={tw('text-lg font-bold text-green-300')}>Select</Text>
                </Pressable>
              ) : null
            }
            <Pressable onPress={() => {
              if (onClose) {
                setSelected(null);
                onClose()
              }
            }}>
              <Text style={tw('text-lg font-bold text-red-300')}>Close</Text>
            </Pressable>
          </View>
        </View>
        {
          currentLocation ? (
            <MapLibreGL.MapView style={styles.map} logoEnabled={false} styleURL={styleUrl} onPress={(e) => {
              setSelected({
                longitude: e.geometry.coordinates[0],
                latitude: e.geometry.coordinates[1]
              });
            }}
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
    </Modal>
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


export default LocationPicker
