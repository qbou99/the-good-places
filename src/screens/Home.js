import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import Map from "../components/Map"
import PlaceList from '../components/PlaceList';
import PlaceListItem from '../components/PlaceListItem';
import TagsIcon from '../components/TagsIcon';
import TagsList from '../components/TagsList';

const Home = () => {
    return (
        <View><Map /><TagsList tags={["camera-outline","map-outline","search-outline"]}/><PlaceList /></View>
    );

};

export default Home;