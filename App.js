/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AppStackScreen from './src/navigation/AppStackScreen';
import { AuthProvider } from './src/context/AuthContext';

const App = () => {
  return(
    <AuthProvider>
      <NavigationContainer>
        <SafeAreaProvider>
          <AppStackScreen />
        </SafeAreaProvider>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
