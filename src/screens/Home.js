import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import Map from "../components/Map"
import PlaceList from '../components/PlaceList';
import PlaceListItem from '../components/PlaceListItem';
import TagsIcon from '../components/TagsIcon';

const Home = () => {
    return (
        <View><Map /><PlaceList /></View>
    );

};

export default Home;