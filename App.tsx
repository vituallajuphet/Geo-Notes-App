// App.tsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from './src/providers/AuthProvider';
import {TailwindProvider} from 'tailwind-rn';
import utilities from './tailwind.json';
import RootNavigator from './src/navigator/RootNavigator';



const App: React.FC = () => {
  return (
    <TailwindProvider utilities={utilities}>
      <AuthProvider>
        <NavigationContainer>
            <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </TailwindProvider>
  );
};

export default App;
