// screens/MainScreen.tsx
import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../../../providers/AuthProvider';
import { NoteListScreen, NoteMapScreen } from './';

import auth from '@react-native-firebase/auth';
import { useTailwind } from 'tailwind-rn';
import Icon from 'react-native-vector-icons/FontAwesome';
import PopupMenu from '../../../components/PopupMenu';
import FabButton from '../../../components/FabButton';
import { ellipsis } from '../../../utils';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const MainScreen: React.FC = ({ }) => {

  const context = useContext(AuthContext);
  const nav = useNavigation()
  const handleLogout = async () => {
    await auth().signOut();
  };

  const tw = useTailwind();

  return (
    <View style={tw('flex-1')}>
      <View style={tw('bg-white dark:bg-slate-800 ')}>
        <View style={tw('flex-row w-full justify-between items-center p-6 px-4')}>
          <View style={[
            tw('flex-row items-center justify-center'),
            { columnGap: 10 }
          ]}>
            <View style={[
              tw('h-12 w-12 bg-slate-200 dark:bg-slate-600 rounded-full items-center justify-center'),
            ]}>
              <Icon name="user" size={25} style={tw('text-slate-600 dark:text-white')} />
            </View>
            <View>
              <Text style={tw('text-2xl font-bold text-slate-600 dark:text-white')}>Hello, </Text>
              <Text style={tw('text-2xl font-bold text-slate-600 dark:text-white')}>{ellipsis(context?.user?.meta?.name, 17)}</Text>
            </View>
          </View>
          <View>
            {/* <Pressable onPress={handleLogout}>
            <Icon name="bars" size={25} />
            </Pressable> */}
            <PopupMenu onLogout={handleLogout} />
          </View>
        </View>
        <View style={tw('mt-8 bg-slate-200 dark:bg-slate-700 p-4 rounded-t-full px-8')}>
          <Text style={tw('text-xl font-bold text-slate-700 dark:text-slate-200')}>Note Lists</Text>
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
        <FabButton
          onPress={() => {
            nav.navigate('Note')
          }}
        />
      </View>
    </View>
  );
};

export default MainScreen;
