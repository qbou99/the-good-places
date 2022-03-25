import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Text, List } from '@ui-kitten/components';
import { SafeAreaView } from "react-native-safe-area-context";

const FriendDetails = ({ route }) => {

  const { friendData } = route.params;

  const [friend, setFriend] = useState([]);
  const [isRefreshing, setRefreshing] = useState(false);

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
      setRefreshing(false)
    }
  };


  return (
    <SafeAreaView>
      <Text style={styles.title}>{friend.username}</Text>
      <>
        <List
          data={friend}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) =>
            <PlaceListItem
              placeData={item.places}
              onClick={navigateToPlaceDetails}
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