import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

import DisplayError from './DisplayError';

const Map = ({ navigation }) => {

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isError, setIsError] = useState(false);
  const [location, setLocation] = useState(null);

 

  const navigateToRestaurantDetails = (restaurantID) => {
    navigation.navigate("ViewRestaurant", { restaurantID });
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(JSON.stringify(location))
      setLocation(location);
    })();
  }, []);

  return (
      <>
        {(location === null ? null : <MapView showsPointsOfInterest={false} region={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }} style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height - 450}}
        customMapStyle={[
          {
            featureType: "administrative",
            elementType: "geometry",
            stylers: [
            {
                visibility: "off"
            }
            ]
          },
          {
            featureType: "poi",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "labels.icon",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            featureType: "transit",
            stylers: [
              {
                visibility: "off"
              }
            ]
          }
        ]}/>)}
      </>
  );
};

const mapStateToProps = (state) => {
  return {
    favRestaurants: state.favRestaurantsID
  }
}

export default connect(mapStateToProps)(Map);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    marginTop: 16,
  },
  searchContainer: {
    marginBottom: 16,
  },
  inputRestaurantName: {
    marginBottom: 8,
  },
});