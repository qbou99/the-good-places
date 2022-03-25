import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from '@ui-kitten/components'
import { SafeAreaView } from 'react-native-safe-area-context';

import FriendList from '../components/FriendList';

const Friends = ({ navigation }) => {
    return (
        <SafeAreaView>
            <Text style={styles.title}>Liste des amis</Text>

            <FriendList navigation={navigation} />

            <Button style={styles.button} onPress={() => { navigation.navigate("ViewAddFriend"); }}>Ajouter un ami</Button>
        </SafeAreaView>
    );

};

export default Friends;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    title: {
        margin: 10,
        fontSize: 16,
        textAlign: 'center'
    },

    button: {
        marginTop: 15,
        backgroundColor: '#6db966',
        borderColor: '#6db966',
        borderRadius: 10,
        height: 45
    },
})