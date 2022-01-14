import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import Map from "../components/Map"
import PlaceListItem from '../components/PlaceListItem';
import TagsIcon from '../components/TagsIcon';

const Home = () => {
    return (
        <View><Map /><PlaceListItem /></View>
    );

};

export default Home;