import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, SignUpScreen } from '../screens/guest';
import MainScreen from '../screens/auth/MainScreens/MainScreen';
import { AuthContext } from '../providers/AuthProvider';
import { NoteScreen } from '../screens/auth/MainScreens';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const authContext = useContext(AuthContext);

  const initScreens = () => {
    if (authContext?.user) {
      return <>
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Note" component={NoteScreen} />
      </>

    } else {
      return (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      );
    }
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {initScreens()}
    </Stack.Navigator>
  );
};

export default RootNavigator;
