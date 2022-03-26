import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Text, List } from '@ui-kitten/components';
import { SafeAreaView } from "react-native-safe-area-context";

import { getUserById, getPlacesById } from '../../config/firebase';
import PlaceListItem from '../components/PlaceListItem';

const FriendDetails = ({ route, navigation }) => {

  const { friendData } = route.params;

  const [friend, setFriend] = useState([]);
  const [isRefreshing, setRefreshing] = useState(false);
  const [placeData, setPlaceData] = useState([]);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    (async () => {
      await searchFriendInfo()
    })();
  }, []);

  const searchFriendInfo = async () => {
    setRefreshing(true)
    const res = await getUserById(friendData)
    if (res != null) {
      setFriend(res)
      let tabPlace = []
      for (const element of res.places) {
        const place = await getPlacesById(element)
        if (place != null)
          if (!tabPlace.includes(place))
            tabPlace.push(place)
      }
      setPlaceData(tabPlace)
      console.log(placeData)
      setRefreshing(false)
    }
  }

  return (
    <SafeAreaView>
      <Text style={styles.title}>Lieux enregistrés de {friend.username}</Text>
      <>
        <List
          data={placeData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) =>
            <PlaceListItem
              place={item}
              navigation={navigation}
            />
          }
          refreshing={isRefreshing}
          onRefresh={searchFriendInfo}
        />
      </>
    </SafeAreaView>
  );
};

export default FriendDetails;

const styles = StyleSheet.create({
  title: {
    margin: 10,
    fontSize: 16,
    textAlign: 'center'
  },
});