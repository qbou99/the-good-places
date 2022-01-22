import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { List } from '@ui-kitten/components';

import PlacelistItem from './PlaceListItem';

const PlaceList = ({ onClick }) => {
  const [isRefreshing, setRefreshing] = useState(false);
  let places = []

  const navigateToPlaceDetails = (placeID) => {
    navigation.navigate("ViewPlace", { placeID });
  };

  const searchPlaces = () => {
    
  };

  return (
    <>
        <List
          data={places}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PlacelistItem
              placeData={item}
              onClick={navigateToPlaceDetails} />
          )}
          refreshing={isRefreshing}
          onRefresh={searchPlaces}
        />
    </>
  );

};

export default PlaceList;

const styles = StyleSheet.create({

});