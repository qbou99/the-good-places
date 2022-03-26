import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text } from '@ui-kitten/components'
import { Icon } from '@ui-kitten/components';

import { getPlacesById } from '../../config/firebase';
import TagsList from './TagsList';

const PlaceListItem = ({ place, navigation, centerOnPlace }) => {

  const [placeData, setPlaceData] = useState([]);

  function navigateToPlaceDetails() {
    return navigation.navigate("ViewPlaceDetails", { placeData: placeData });
  }

  return (
    <TouchableOpacity style={styles.container} onPress={navigateToPlaceDetails}>
      <View style={styles.informationContainer}>
        <Text style={styles.title}>{place.name}</Text>
        <Text style={styles.city}>{place.description}</Text>
      </View>
      <View style={styles.iconContainer}>
        <TagsList tags={place.tags} />
        <Icon name={"map-outline"} style={styles.icon} fill='#8F9BB3' />
      </View>
    </TouchableOpacity>
  );
};

export default PlaceListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderColor: '#e6e6e6',
  },
  informationContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  city: {
    fontSize: 20,
  },
  iconContainer: {
    flex: 1,
    marginHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    marginLeft: 4,
    marginTop: 4,
    width: 28,
    height: 28,
  },
});
