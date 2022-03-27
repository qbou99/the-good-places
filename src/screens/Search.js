import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Input, Button, Text, List } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getUserId } from '../../config/firebase'
import PlaceListItem from '../components/PlaceListItem';

const Search = ({ navigation }) => {
  const [userId, setUserId] = useState('userId');
  const [search, setSearch] = useState('');
  const [placeData, setPlaceData] = useState([]);
  const [isRefreshing, setRefreshing] = useState(false);

  useEffect(() => {
    (async () => {
      setUserId(await getUserId());
    })();
  }, []);

  const searchInfo = async () => {
    setRefreshing(true)
    console.log(placeData)
    setRefreshing(false)
  }

  return (
    <SafeAreaView
      style={styles.container}
    >
        <KeyboardAvoidingView style={styles.container2} behavior="padding">
          <Text style={styles.title}>Rechercher un lieu</Text>
          <Input
            placeholder='Recherche'
            value={search}
            onChangeText={nextValue => setSearch(nextValue)}
            style={styles.textInput}
          />
          <Button style={styles.button} onPress={() => {
            console.log(search);
          }}>
            Rechercher
          </Button>
        </KeyboardAvoidingView>
      <View style={styles.containerList}>
        <List
          data={placeData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) =>
            <PlaceListItem
              place={item}
              navigation={navigation}
              map={false}
            />
          }
          refreshing={isRefreshing}
          onRefresh={searchInfo}
        />
      </View>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  container2: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    paddingTop: 20
  },

  containerList: {
    margin: 5,
  },

  title: {
    margin: 10,
    fontSize: 16,
    textAlign: 'center'
  },

  buttons: {
    flexDirection: 'row',
    margin: 10,
  },

  button: {
    marginTop: 12,
    backgroundColor: '#6db966',
    borderColor: '#6db966',
    borderRadius: 10,
    height: 45
  },

  textInput: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
});