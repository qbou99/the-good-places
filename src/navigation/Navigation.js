import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';

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
      screenOptions={{
        headerShown: false
      }}
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
      screenOptions={{
        headerShown: false
      }}
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

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title='Map' icon={<Icon name={"map-outline"} />} />
    <BottomNavigationTab title='Chercher' icon={<Icon name={"search-outline"} />} />
  </BottomNavigation>
);

function RootStack() {
  return (
    <TabNavigation.Navigator
      screenOptions={{
        headerShown: false
      }} tabBar={BottomTabBar}>
      <TabNavigation.Screen
        name="Map"
        component={mapStackScreens}
      />
      <TabNavigation.Screen
        name="Chercher"
        component={searchStackScreens}
      />
    </TabNavigation.Navigator>
  );
}

export default RootStack;