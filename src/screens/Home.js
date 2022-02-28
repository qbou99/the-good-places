import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Button } from '@ui-kitten/components'

import Map from "../components/Map"
import PlaceList from '../components/PlaceList';
import PlaceListItem from '../components/PlaceListItem';
import TagsIcon from '../components/TagsIcon';
import TagsList from '../components/TagsList';

const Home = ( { navigation }) => {
    return (
        <View><Map /><Button onPress={() => {navigation.navigate("ViewEditPlace");}}>Ajouter</Button><TagsList tags={[{name:"camera-alt",pack:"material"},{name:"local-pizza", pack:"material"},{name: "glass-cocktail", pack:"materialcommunity"}]}/><PlaceList /></View>
    );

};

export default Home;