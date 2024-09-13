// App.tsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from './src/providers/AuthProvider';
import {TailwindProvider} from 'tailwind-rn';
import utilities from './tailwind.json';
import RootNavigator from './src/navigator/RootNavigator';
import { AppProvider } from './src/providers/AppProvider';
import { MenuProvider } from 'react-native-popup-menu';
const App: React.FC = () => {
  return (
    <MenuProvider>
      <AppProvider>
        <TailwindProvider utilities={utilities}>
          <AuthProvider>
            <NavigationContainer>
                <RootNavigator />
            </NavigationContainer>
          </AuthProvider>
        </TailwindProvider>
      </AppProvider>
    </MenuProvider>
  );
};

export default App;
