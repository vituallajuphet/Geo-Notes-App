import { View, Text, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { useTailwind } from 'tailwind-rn';
import { AuthContext } from '../../../providers/AuthProvider';
import MapLibreGL, { Camera, PointAnnotation } from '@maplibre/maplibre-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../../../components/Button';
import ListNotes from '../../../components/ListNotes';



// MapLibreGL.setAccessToken(null);
// const apiKey = 'e229690a-f2a0-4915-b43d-b79e90b62832';
// const styleUrl = `https://tiles.stadiamaps.com/styles/alidade_smooth.json?api_key=${apiKey}`;

const HomeScreen = () => {
  const tw = useTailwind();
  const context = useContext(AuthContext);

  return (
    null
  );
};

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

export default HomeScreen;
