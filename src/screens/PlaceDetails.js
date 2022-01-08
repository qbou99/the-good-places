import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, ScrollView, Image, Button } from 'react-native';
import { connect } from 'react-redux';
import Toast from 'react-native-root-toast';

import DisplayError from '../components/DisplayError';

const PlaceDetails = ({ route, dispatch }) => {
  return (
    <View></View>
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