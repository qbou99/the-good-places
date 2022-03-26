import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { List } from '@ui-kitten/components';
import { connect } from "react-redux";
import { getUserId, getUserPlaces } from '../../config/firebase'

import PlaceListItem from './PlaceListItem';

const PlaceList = ({ onClick, visiblePlaces, dispatch, navigation }) => {
  const [isRefreshing, setRefreshing] = useState(false);
  const [userId, setUserId] = useState('userId');

  useEffect(() => {
    (async () => {
      setUserId(await getUserId());
    })();
  }, []);

  const centerCoords = (coords) => {
    const action = { type: "CENTER_MAP", value: coords };
    dispatch(action);
  }

  return (
    <>
      <List
        data={visiblePlaces}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) =>
          <PlaceListItem
            place={item}
            navigation={navigation}
            centerOnPlace={()=>centerCoords(item.coordinates)}
            map={true}
          />
        }
        refreshing={isRefreshing}
      />
    </>
  );

};

const mapStateToProps = (state) => {
  return {
    visiblePlaces: state.visiblePlaces.visiblePlaces,
    centerCoords: state.centerCoords.centerCoords,
    places: state.places.places,
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