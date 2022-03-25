import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from 'react-native';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from "@ui-kitten/components";

import Home from "../screens/Home";
import Search from "../screens/Search";
import PlaceDetails from "../screens/PlaceDetails";
import EditPlace from "../screens/EditPlace";
import Authentication from "../screens/Authentication";
import Friends from "../screens/Friends";
import AddFriend from "../screens/AddFriend";
import ScanQrCode from "../screens/ScanQrCode";
import Settings from "../screens/Settings";

const MapNavigation = createStackNavigator();
const SearchNavigation = createStackNavigator();
const FriendsNavigation = createStackNavigator();
const SettingsNavigation = createStackNavigator();
const TabNavigation = createBottomTabNavigator();

const MainNavigation = createStackNavigator();

function MapStackScreens() {
  return (
    <MapNavigation.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="ViewHome"
    >
      <MapNavigation.Screen
        name="ViewHome"
        component={Home}
        options={{ title: "Map" }}
      />
      <MapNavigation.Screen
        name="ViewPlaceDetails"
        component={PlaceDetails}
        options={{ title: "Détails" }}
      />
      <MapNavigation.Screen
        name="ViewEditPlace"
        component={EditPlace}
        options={{ title: "Editer" }}
      />
    </MapNavigation.Navigator>
  );
}

function SearchStackScreens() {
  return (
    <SearchNavigation.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="ViewSearch"
    >
      <SearchNavigation.Screen
        name="ViewSearch"
        component={Search}
        options={{ title: "Chercher" }}
      />
      <SearchNavigation.Screen
        name="ViewPlaceDetails"
        component={PlaceDetails}
        options={{ title: "Détails" }}
      />
    </SearchNavigation.Navigator>
  );
}

function FriendsStackScreens() {
  return (
    <FriendsNavigation.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="ViewFriends"
    >
      <FriendsNavigation.Screen
        name="ViewFriends"
        component={Friends}
        options={{ title: "Amis" }}
      />
      <FriendsNavigation.Screen
        name="ViewAddFriend"
        component={AddFriend}
        options={{ title: "Amis" }}
      />
      <FriendsNavigation.Screen
        name="ViewScanQrCode"
        component={ScanQrCode}
        options={{ title: "Amis" }}
      />
    </FriendsNavigation.Navigator>
  );
}

function SettingsStackScreens() {
  return (
    <SettingsNavigation.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="ViewSettings"
    >
      <SettingsNavigation.Screen
        name="ViewSettings"
        component={Settings}
        options={{ title: "Paramètres" }}
      />
    </SettingsNavigation.Navigator>
  );
}

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    style={styles.bottomTabNav}
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title="Map" icon={<Icon name={"map-outline"} />} />
    <BottomNavigationTab
      title="Chercher"
      icon={<Icon name={"search-outline"} />}
    />
    <BottomNavigationTab title="Amis" icon={<Icon name={"people-outline"} />} />
    <BottomNavigationTab
      title="Paramètres"
      icon={<Icon name={"settings-2-outline"} />}
    />
  </BottomNavigation>
);

function RootStack({ isSignedIn }) {
  return !isSignedIn ? (
    <MainNavigation.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Authentification"
    >
      <MainNavigation.Screen
        name="ViewAuthentication"
        component={Authentication}
        options={{ title: "Authentification" }}
      />
    </MainNavigation.Navigator>
  ) : (
    <TabNavigation.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={BottomTabBar}
    >
      <TabNavigation.Screen name="Map" component={MapStackScreens} />
      <TabNavigation.Screen name="Chercher" component={SearchStackScreens} />
      <TabNavigation.Screen name="Amis" component={FriendsStackScreens} />
      <TabNavigation.Screen name="Paramètres" component={SettingsStackScreens} />
    </TabNavigation.Navigator>
  );
}

export default RootStack;

const styles = StyleSheet.create({
  bottomTabNav: {
    height: 75,
    paddingBottom: 20,
  },
})