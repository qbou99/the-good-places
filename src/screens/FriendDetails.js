import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Text } from '@ui-kitten/components';

import DisplayError from '../components/DisplayError';
import TagsIcon from '../components/TagsIcon';

const FriendDetails = ({ route, dispatch }) => {
  return (
    <View>
      <Text>{"Lorem ipsum"}</Text>
      <TagsIcon />
      <Text>Ami</Text>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    favRestaurants: state.favRestaurantsID
  }
}

export default connect(mapStateToProps)(FriendDetails);

const styles = StyleSheet.create({

});