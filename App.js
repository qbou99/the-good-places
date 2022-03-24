import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { RootSiblingParent } from 'react-native-root-siblings';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { MaterialIconsPack } from './src/helpers/material-icons'
import { MaterialCommunityIconsPack } from './src/helpers/materialcommunity-icons'

import Navigation from './src/navigation/Navigation';
import { Store, Persistor } from './src/store/config';

// Suppression de warning provenant du package 'firebase' (pas d'autre solution à ce jour)
LogBox.ignoreLogs(['Setting a timer for a long period of time']);
LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core and will be removed in a future release']);

export default function App() {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={Persistor}>
        <IconRegistry icons={[EvaIconsPack, MaterialIconsPack, MaterialCommunityIconsPack]} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <RootSiblingParent>
            <NavigationContainer>
              <Navigation />
              <StatusBar style="auto" />
            </NavigationContainer>
          </RootSiblingParent>
        </ApplicationProvider>
      </PersistGate>
    </Provider>
  );
}