import { View, Text, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { useTailwind } from 'tailwind-rn';
import { AuthContext } from '../../../providers/AuthProvider';


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
