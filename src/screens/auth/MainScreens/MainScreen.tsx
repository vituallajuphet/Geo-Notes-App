// screens/MainScreen.tsx
import React, { useContext } from 'react';
import { View, Text, Button, Pressable } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../../../providers/AuthProvider';
import { NoteListScreen, HomeScreen, LogoutScreen, NoteScreen, NoteMapScreen } from './';

import auth from '@react-native-firebase/auth';
import { useTailwind } from 'tailwind-rn';
import Icon from 'react-native-vector-icons/FontAwesome';
import PopupMenu from '../../../components/PopupMenu';

const Tab = createBottomTabNavigator();

const MainScreen: React.FC = ({ navigation }) => {

  const context = useContext(AuthContext);
  const handleLogout = async () => {
    await auth().signOut();
  };

  const tw = useTailwind();

  return (
    <View style={tw('flex-1')}>
      <View style={tw('bg-white dark:bg-slate-800 p-6 px-4')}>
        <View style={tw('flex-row w-full justify-between items-center')}>
          <View>
            <Text style={tw('text-2xl font-bold')}>Hello, </Text>
            <Text style={tw('text-2xl font-bold')}>{context?.user?.meta?.name}</Text>
          </View>
          <View>
            {/* <Pressable onPress={handleLogout}>
            <Icon name="bars" size={25} />
            </Pressable> */}
            <PopupMenu onLogout={handleLogout} />
          </View>
        </View>
        <View style={tw('mt-8')}>
          <Text style={tw('text-xl font-bold')}>Note Lists</Text>
        </View>
      </View>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen name="Home" component={NoteListScreen} options={{
          tabBarLabel: 'List',
          tabBarStyle: tw('bg-white dark:bg-slate-800 p-1'),
          tabBarLabelStyle: tw('text-slate-900 dark:text-white text-sm'),
          tabBarIcon: ({ color, size }) => (
            <Icon name="list" color={color} size={size} />
          ),
        }} />
        <Tab.Screen name="NoteList" component={NoteMapScreen}
          options={{
            tabBarLabel: 'Map',
            tabBarStyle: tw('bg-white dark:bg-slate-800 p-1'),
            tabBarLabelStyle: tw('text-slate-900 dark:text-white text-sm'),
            tabBarIcon: ({ color, size }) => (
              <Icon name="map" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
      <View style={tw('absolute bottom-[4rem] right-2')}>
        <Button title='Add new'
          onPress={() => {
            navigation.navigate('Note')
          }}
        />
      </View>
    </View>
  );
};

export default MainScreen;
