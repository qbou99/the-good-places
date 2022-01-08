import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, Keyboard } from 'react-native';
import { connect } from 'react-redux';

const Search = ({ navigation }) => {
  return (
    <View></View>
  );
};

const mapStateToProps = (state) => {
  return {
    favRestaurants: state.favRestaurantsID
  }
}

export default connect(mapStateToProps)(Search);

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