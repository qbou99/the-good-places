import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { Icon } from '@ui-kitten/components';

import TagsList from './TagsList';

const PlaceListItem = ({ placeData, onClick }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.informationContainer}>
        <Text style={styles.title}>{placeData.name}</Text>
        <Text style={styles.city}>{placeData.description}</Text>
      </View>
      <View style={styles.iconContainer}>
        <TagsList tags={placeData.tags} />
        <Icon name={"map-outline"} style={styles.icon} fill='#8F9BB3' />
      </View>
    </TouchableOpacity>
  );

};

export default PlaceListItem;

const styles = StyleSheet.create({

  container: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  informationContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  city: {
    fontSize: 20,
  },
  iconContainer: {
    flex: 1,
    marginHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    marginLeft: 4,
    marginTop: 4,
    width: 28,
    height: 28,
  },
});