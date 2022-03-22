import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from '@ui-kitten/components'
import { SafeAreaView } from 'react-native-safe-area-context';

//import FriendList from '../components/FriendList';

const Friends = ({ navigation }) => {
    return (
        <SafeAreaView>
            <Button onPress={() => { navigation.navigate("ViewAddFriend"); }}>Ajouter un ami</Button>
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
})