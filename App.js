import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { RootSiblingParent } from 'react-native-root-siblings';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { MaterialIconsPack } from './src/helpers/material-icons'
import { MaterialCommunityIconsPack } from './src/helpers/materialcommunity-icons'
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import Navigation from './src/navigation/Navigation';
import { Store } from './src/store/config';
import { default as theme } from './src/theme/theme.json';

// Suppression de warning provenant du package 'firebase' (pas d'autre solution à ce jour)
LogBox.ignoreLogs(['Setting a timer for a long period of time']);
LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core and will be removed in a future release']);

export default function App() {
  const auth = getAuth();
  const [isSignedIn, setSignedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user)
          setSignedIn(true);
      else
          setSignedIn(false);
  });
  }, [auth])

  return (
    <Provider store={Store}>
      <IconRegistry icons={[EvaIconsPack, MaterialIconsPack, MaterialCommunityIconsPack]} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <RootSiblingParent>
          <NavigationContainer>
            <Navigation isSignedIn={isSignedIn} />
            <StatusBar style="auto" />
          </NavigationContainer>
        </RootSiblingParent>
      </ApplicationProvider>
    </Provider>
  );
}