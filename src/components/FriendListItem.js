import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '@ui-kitten/components'
import { getUserById } from '../../config/firebase';



const FriendListItem = ({ friendData, onClick }) => {
    const [friend, setFriend] = useState([]);

    useEffect(() => {
        (async () => {
            await searchFriendInfo()
        })();
    }, []);

    const searchFriendInfo = async () => {
        const res = await getUserById(friendData)
        if (res != null)
            setFriend(res)
    };

    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.informationContainer}>
                <Text style={styles.title}>{friend.username}</Text>
            </View>
        </TouchableOpacity>
    );

};

export default FriendListItem;

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        paddingVertical: 8,
    },
    informationContainer: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});