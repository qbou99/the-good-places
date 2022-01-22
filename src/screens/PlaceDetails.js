import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Text } from '@ui-kitten/components';

import DisplayError from '../components/DisplayError';
import TagsIcon from '../components/TagsIcon';

const PlaceDetails = ({ route, dispatch }) => {
  return (
    <View>
      <Text>{"Lorem ipsum"}</Text>
      <TagsIcon />
      <Text>Address</Text>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    favRestaurants: state.favRestaurantsID
  }
}

export default connect(mapStateToProps)(PlaceDetails);

const styles = StyleSheet.create({

});