import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Button } from '@ui-kitten/components'
import { signOut, getAuth } from 'firebase/auth';

import Map from "../components/Map"
import PlaceList from '../components/PlaceList';
import PlaceListItem from '../components/PlaceListItem';
import TagsIcon from '../components/TagsIcon';
import TagsList from '../components/TagsList';

const auth = getAuth();

const Home = ({ navigation }) => {

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                navigation.navigate("Authentification");
            })
            .catch(error => alert(error.message))
    }

    return (
        <View><Map /><Button onPress={() => { navigation.navigate("ViewEditPlace"); }}>Ajouter</Button><TagsList tags={[{ name: "camera-alt", pack: "material" }, { name: "local-pizza", pack: "material" }, { name: "glass-cocktail", pack: "materialcommunity" }]} /><PlaceList />
            <TouchableOpacity
                onPress={handleSignOut}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Déco</Text>
            </TouchableOpacity>
        </View>
    );

};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#0782F9',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
})