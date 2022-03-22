import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { List } from '@ui-kitten/components';
import { connect } from "react-redux";
import { getData, getPlaces } from '../../config/firebase'

import PlaceListItem from './PlaceListItem';

const PlaceList = ({ onClick, visiblePlaces, dispatch }) => {
  const [isRefreshing, setRefreshing] = useState(false);
  const [places, setPlaces] = useState([]);

  const navigateToPlaceDetails = (placeID) => {
    navigation.navigate("ViewPlace", { placeID });
  };

  useEffect(() => {
    (async () => {
      await searchPlaces()
    })();
  }, []);

  const searchPlaces = async () => {
    setRefreshing(true)
    const res = await getData('Places')
    setPlaces(res)
    setRefreshing(false)
  };

  return (
    <>
        <List
          data={visiblePlaces}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => 
            <PlaceListItem
              placeData={item}
              onClick={navigateToPlaceDetails}
              />
          }
          refreshing={isRefreshing}
          onRefresh={searchPlaces}
        />
    </>
  );

};

const mapStateToProps = (state) => {
  return {
    visiblePlaces: state.places,
  };
};

export default connect(mapStateToProps)(PlaceList);

const styles = StyleSheet.create({
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