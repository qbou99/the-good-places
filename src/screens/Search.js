import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import { Input, Button, Text, List, Select, SelectItem, IndexPath } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from "expo-location";

import { forward, reverse } from "../api/positionstack";
import categories from "../helpers/categories";
import { getUserId, getCities, getSearchPlace } from '../../config/firebase'
import PlaceListItem from '../components/PlaceListItem';
import TagsIcon from '../components/TagsIcon';

const Search = ({ navigation }) => {
  const [userId, setUserId] = useState('userId');
  const [isRefreshing, setRefreshing] = useState(false);

  const [places, setPlaces] = useState([]);

  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState([]);
  const [userCities, setUserCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(new IndexPath(0));
  const [selectedCityName, setSelectedCityName] = useState("");
  const [location, setLocation] = useState('');
  const [locationCity, setLocationCity] = useState('');
  const [selectedDistance, setSelectedDistance] = useState('');
  const [searchLocation, setSearchLocation] = useState(false);


  const selectedTagContent = [
    'Bar',
    'Restaurant',
    'Loisir',
    'Nature',
    'Nourriture à emporter',
    'Jeunesse',
  ];

  const distanceContent = [
    10,
    30,
    100,
  ];

  const renderOption = (title) => <SelectItem title={title} key={title} />;

  const groupDisplayValues = selectedTag.map((index) => {
    return selectedTagContent[index.row] + " ";
  });

  const displayCity = userCities[selectedCity.row];

  const displayDistance = distanceContent[selectedDistance.row];

  const toogleLocation = () => {


    if (searchLocation) {
      setSelectedCityName(locationCity)
    }
    else {
      setSelectedCity(new IndexPath(0))
      setSelectedCityName(userCities[0])
    }
    setSearchLocation(!searchLocation);

    searchPlaces();

  }


  useEffect(() => {
    (async () => {
      setUserId(await getUserId());

      const loc = await Location.getCurrentPositionAsync({});
      let addr = "";
      if (loc) {
        setLocation(loc)
        addr = await reverse(loc.coords.latitude, loc.coords.longitude);
        setLocationCity(addr.data[0].locality);

      }

      setUserCities(await getCities());

      setSelectedCityName(userCities[0])


    })();
  }, []);

  const searchPlaces = async () => {
    setRefreshing(true)
    console.log(selectedCityName);
    const p = await getSearchPlace(search, selectedTag, selectedCityName, selectedDistance);

    setPlaces(p);

    setRefreshing(false)
  }

  return (
    <SafeAreaView
      style={styles.container}
    >
      <KeyboardAvoidingView style={styles.container2} behavior="padding">
        <Text style={styles.title}>Rechercher dans mes lieux</Text>
        <Input
          placeholder='Recherche'
          value={search}
          onChangeText={nextValue => setSearch(nextValue)}
          style={styles.textInput}
          onContentSizeChange={() => searchPlaces()}
        />

        <Select
          multiSelect={true}
          selectedIndex={selectedTag}
          onSelect={
            function onSelect(index) {
              setSelectedTag(index);
              searchPlaces()
            }
          }
          style={styles.select}
          placeholder="Choisir des tags"
          value={groupDisplayValues}
        >
          {selectedTagContent.map(renderOption)}
        </Select>

        <View style={styles.selectedCityAndDistance}>
          <TouchableOpacity onPress={toogleLocation}>{searchLocation ? <TagsIcon name="my-location" pack="material" /> : <TagsIcon name="location-searching" pack="material" />}</TouchableOpacity>
          {searchLocation ? <Text>Ma location</Text> : <Select
            multiSelect={false}
            selectedIndex={selectedCity}
            onSelect={
              function onSelect(index) {
                setSelectedCity(index);
                setSelectedCityName(userCities[index.row])
                searchPlaces()
              }
            }
            style={styles.selectedCity}
            placeholder="Choisir une ville"
            value={displayCity}
            disabled={searchLocation}
          >
            {userCities.map(renderOption)}
          </Select>
          }
          <Select
            multiSelect={false}
            selectedIndex={selectedDistance}
            onSelect={
              function onSelect(index) {
                setSelectedDistance(index);
                searchPlaces()
              }
            }
            style={styles.selectedDistance}
            placeholder="Choisir une distance"
            value={displayDistance}
          >
            {distanceContent.map(renderOption)}
          </Select>
        </View>
      </KeyboardAvoidingView>
      <View style={styles.containerList}>
        <List
          data={places}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) =>
            <PlaceListItem
              place={item}
              navigation={navigation}
              map={false}
            />
          }
          refreshing={isRefreshing}
          onRefresh={searchPlaces}
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

  select: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 5,
  },

  selectedCityAndDistance: {
    flexDirection: 'row',
  },

  selectedCity: {
    width: '45%',
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 5,
  },

  selectedDistance: {
    width: '35%',
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 5,
  },
});