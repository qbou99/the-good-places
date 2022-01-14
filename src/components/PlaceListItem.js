import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { Icon } from '@ui-kitten/components';

import TagsIcon from './TagsIcon';

const PlaceListItem = ({ onClick }) => {
  return (
    <View style={styles.container}>
      <View style={styles.informationContainer}>
        <Text style={styles.title}>Bonjour</Text>
        <Text style={styles.city}>Aurevoir</Text>
      </View>
      <View style={styles.iconContainer}>
        <TagsIcon />
        <Icon name={"map-outline"} style={styles.icon} fill='#8F9BB3' />
      </View>
    </View>
  );

};

export default PlaceListItem;

const styles = StyleSheet.create({

  container: {
    flexDirection: 'row',
    paddingVertical: 8,
    backgroundColor: 'red'
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