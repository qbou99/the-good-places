import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Text } from '@ui-kitten/components';

import DisplayError from '../components/DisplayError';
import TagsIcon from '../components/TagsIcon';

const PlaceDetails = ({ route, dispatch }) => {

  const { placeData } = route.params;

  
  return (
    <View>
      <Text>{placeData.address}</Text>
      <TagsIcon />
      <Text>Address</Text>
    </View>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({

});