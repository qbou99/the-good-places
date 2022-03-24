import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';

import Home from '../screens/Home'
import Search from '../screens/Search';
import PlaceDetails from '../screens/PlaceDetails';
import EditPlace from '../screens/EditPlace';
import Authentication from '../screens/Authentication';
import Friends from '../screens/Friends';
import AddFriend from '../screens/AddFriend';
import ScanQrCode from '../screens/ScanQrCode';

const MapNavigation = createStackNavigator();
const SearchNavigation = createStackNavigator();
const TabNavigation = createBottomTabNavigator();

const MainNavigation = createStackNavigator();

function MapStackScreens() {
  return (
    <MapNavigation.Navigator
      screenOptions={{
        headerShown: false
      }}
      initialRouteName="Authentification"
    >
      <MapNavigation.Screen
        name="Authentification"
        component={Authentication}
      />
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
      <MapNavigation.Screen
        name="ViewFriends"
        component={Friends}
        options={{ title: 'Amis' }}
      />
      <MapNavigation.Screen
        name="ViewAddFriend"
        component={AddFriend}
        options={{ title: 'Amis' }}
      />
      <MapNavigation.Screen
        name="ViewScanQrCode"
        component={ScanQrCode}
        options={{ title: 'Amis' }}
      />
    </MapNavigation.Navigator>
  )
};

function SearchStackScreens() {
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

function InAppNavigation() {
  return (
    <TabNavigation.Navigator
      screenOptions={{
        headerShown: false
      }} tabBar={BottomTabBar}>
      <TabNavigation.Screen
        name="Map"
        component={MapStackScreens}
      />
      <TabNavigation.Screen
        name="Chercher"
        component={SearchStackScreens}
      />
    </TabNavigation.Navigator>
  );
}

function RootStack() {
  return (
    <MainNavigation.Navigator screenOptions={{
      headerShown: false
    }}
      initialRouteName="Authentification"
    >
      <MainNavigation.Screen
        name="ViewAuthentication"
        component={Authentication}
        options={{ title: 'Authentification' }}
      />
    </MainNavigation.Navigator>,
    InAppNavigation()
  );
}

export default RootStack;