import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';

import Home from '../screens/Home'
import Search from '../screens/Search';
import PlaceDetails from '../screens/PlaceDetails';
import EditPlace from '../screens/EditPlace';

const MapNavigation = createStackNavigator();
const SearchNavigation = createStackNavigator();
const TabNavigation = createBottomTabNavigator();

function mapStackScreens() {
  return (
    <MapNavigation.Navigator
      initialRouteName="ViewHome"
    >
      <MapNavigation.Screen
        name="ViewHome"
        component={Home}
        options={{ title: 'Map' }}
      />
      <MapNavigation.Screen
        name="ViewPlaceDetails"
        component={PlaceDetails}
        options={{ title: 'Détails' }}
      />
      <MapNavigation.Screen
        name="ViewEditPlace"
        component={EditPlace}
        options={{ title: 'Editer' }}
      />
    </MapNavigation.Navigator>
  )
};

function searchStackScreens() {
  return (
    <SearchNavigation.Navigator
      initialRouteName="ViewSearch"
    >
      <SearchNavigation.Screen
        name="ViewSearch"
        component={Search}
        options={{ title: 'Chercher' }}
      />
      <SearchNavigation.Screen
        name="ViewPlaceDetails"
        component={PlaceDetails}
        options={{ title: 'Détails' }}
      />
    </SearchNavigation.Navigator>
  )
};

function RootStack() {
  return (
    <TabNavigation.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <TabNavigation.Screen
        name="Map"
        component={mapStackScreens}
        options={() => ({
          tabBarIcon: ({ color }) => {
            return <View style={{ tintColor: color }} />;
          }
        })}
      />
      <TabNavigation.Screen
        name="Chercher"
        component={searchStackScreens}
        options={() => ({
          tabBarIcon: ({ color }) => {
            return <View style={{ tintColor: color }} />;
          }
        })}
      />
    </TabNavigation.Navigator>
  );
}

export default RootStack;