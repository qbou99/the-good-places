import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { List } from '@ui-kitten/components';
import { connect } from "react-redux";
import { getUserId, getUserPlaces } from '../../config/firebase'

import PlaceListItem from './PlaceListItem';

const PlaceList = ({ onClick, visiblePlaces, dispatch, navigation }) => {
  const [isRefreshing, setRefreshing] = useState(false);
  const [places, setPlaces] = useState([]);
  const [userId, setUserId] = useState('userId');

  useEffect(() => {
    (async () => {
      setUserId(await getUserId());
      console.log(userId)

      await searchPlaces()
    })();
  }, []);

  const searchPlaces = async () => {
    setRefreshing(true)
    const res = await getUserPlaces(userId)
    setPlaces(res);
    setRefreshing(false)
  };

  return (
    <>
      <List
        data={visiblePlaces}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) =>
          <PlaceListItem
            place={item}
            navigation={navigation}
            map={true}
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