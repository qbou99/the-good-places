import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@ui-kitten/components';

import DisplayError from '../components/DisplayError';
import TagsIcon from '../components/TagsIcon';
import TagsList from '../components/TagsList';

const PlaceDetails = ({ route, dispatch }) => {

  const { placeData } = route.params;


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>{placeData.name}</Text>
        <TagsList tags={placeData.tags} />
      </View>

      <View style={styles.containerInfo}>
        <View style={styles.textContainer}>
          <Text style={styles.text}><Text style={styles.text2}>Address :</Text> {placeData.address}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}><Text style={styles.text2}>Description :</Text> {placeData.description}</Text>
        </View>
      </View>

    </SafeAreaView>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    margin: 5,
    paddingTop: 20,
  },

  containerTitle: {
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  containerInfo: {
    //width: "95%",
    borderTopWidth: 3,
    borderColor: '#6db966',
  },

  title: {
    margin: 10,
    fontSize: 35,
    textAlign: 'center',
    fontWeight: 'bold'
  },

  text: {
    margin: 10,
    fontSize: 17,
  },

  text2: {
    fontWeight: 'bold',
  },

  textContainer: {
    borderBottomWidth: 1,
  },
});