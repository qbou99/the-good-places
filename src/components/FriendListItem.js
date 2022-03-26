import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '@ui-kitten/components'
import { getUserById } from '../../config/firebase';



const FriendListItem = ({ navigation, friendData }) => {
    const [friend, setFriend] = useState([]);

    function goTofriendDetails() {
        return navigation.navigate("ViewFriendDetails", { friendData: friendData, friendName: friend.username });
    }

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
        <TouchableOpacity style={styles.container} onPress={goTofriendDetails} >
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
        //paddingVertical: 8,
    },
    informationContainer: {
        flex: 1,
        justifyContent: 'center',
        borderColor: '#e6e6e6',
        height: 60,
        borderBottomWidth: 2,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
    },
});