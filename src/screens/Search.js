import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import { Input, Button, Text, List, Select, SelectItem, IndexPath } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from "expo-location";

import { forward, reverse } from "../api/positionstack";
import categories from "../helpers/categories";
import { getUserId, getCities, getUserPlaces } from '../../config/firebase'
import PlaceListItem from '../components/PlaceListItem';
import TagsIcon from '../components/TagsIcon';
import categoriesList from '../helpers/categories';

const Search = ({ navigation }) => {
  const [userId, setUserId] = useState('userId');
  const [isRefreshing, setRefreshing] = useState(false);

  const [places, setPlaces] = useState([]);
  const [visiblePlaces, setVisiblePlaces] = useState([]);

  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [userCities, setUserCities] = useState([]);
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
    20,
    30,
    40,
    50,
    75,
    100,
  ];

  function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }
  
  const renderOption = (title) => <SelectItem title={title} key={title} />;

  const toogleLocation = () => {

    if (searchLocation) {
      setSelectedCityName(locationCity)
    }
    
    setSearchLocation(!searchLocation);

  }


  useEffect(() => {
    (async () => {
      setRefreshing(true)
      setUserId(await getUserId());

      const cities = await getCities()
      setUserCities(cities);

      const p = await getUserPlaces();
      setPlaces(p);
      setVisiblePlaces(p);

      const loc = await Location.getCurrentPositionAsync({});
      let addr = "";
      if (loc) {
        setLocation(loc)
        addr = await reverse(loc.coords.latitude, loc.coords.longitude);
        setLocationCity(addr.data[0].locality);

      }

      setRefreshing(false)

    })();
  }, []);

  useEffect(() => {
    (async () => {
      let coords
      if(selectedCityName != '' && selectedDistance != ''){
        const res = await forward(selectedCityName);
        coords = {
          latitude: res[0].latitude,
          longitude: res[0].longitude
        }
        console.log(coords)
      }
      let pl = places.filter((p) => {
        let condTag = true
        if(selectedTag != ''){
          condTag = p.tags.find(t => categoriesList[selectedTag].name === t.name)
        }
        let condDistance = true
        if(selectedCityName != '' && selectedDistance != ''){
          const distance = getDistanceFromLatLonInKm(coords.latitude, coords.longitude, p.coordinates.latitude, p.coordinates.longitude)
          condDistance = distance <= parseInt(selectedDistance)
        }
          
        return p.name.toLowerCase().includes(search.toLowerCase()) && condTag && condDistance
      })
      setVisiblePlaces(pl)
    })();
  }, [search, selectedTag, selectedCityName, selectedDistance]);
  
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
        />

        <Select
          multiSelect={false}
          onSelect={
            function onSelect(index) {
              setSelectedTag(selectedTagContent[index.row]);
            }
          }
          style={styles.select}
          placeholder="Choisir des tags"
          value={selectedTag}
        >
          {selectedTagContent.map(renderOption)}
        </Select>

        <View style={styles.selectedCityAndDistance}>
          <TouchableOpacity onPress={toogleLocation}>{searchLocation ? <TagsIcon name="my-location" pack="material" /> : <TagsIcon name="location-searching" pack="material" />}</TouchableOpacity>
          {searchLocation ? <Text style={styles.locationCity}>{locationCity}</Text> : <Select
            multiSelect={false}
            onSelect={
              function onSelect(index) {
                setSelectedCityName(userCities[index.row])
              }
            }
            style={styles.selectedCity}
            placeholder="Choisir une ville"
            value={selectedCityName}
            disabled={searchLocation}
          >
            {userCities.map(renderOption)}
          </Select>
          }
          <Select
            multiSelect={false}
            onSelect={
              function onSelect(index) {
                setSelectedDistance(distanceContent[index.row]);
              }
            }
            style={styles.selectedDistance}
            placeholder="Choisir une distance"
            value={selectedDistance}
          >
            {distanceContent.map(renderOption)}
          </Select>
        </View>

      </KeyboardAvoidingView>
      <View style={styles.containerList}>
        <List
          data={visiblePlaces}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) =>
            <PlaceListItem
              place={item}
              navigation={navigation}
              map={false}
              search={true}
            />
          }
          refreshing={isRefreshing}
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

  locationCity: {
    width: '45%',
    backgroundColor: 'white',
    borderRadius: 10,
    textAlign: 'center',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    paddingTop: 10,
  },

  selectedDistance: {
    width: '35%',
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 5,
  },
});