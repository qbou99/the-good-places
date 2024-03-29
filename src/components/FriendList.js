import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { List } from '@ui-kitten/components';
import { getFriends } from '../../config/firebase'

import FriendListItem from './FriendListItem';

const FriendList = ({ navigation, onClick, dispatch }) => {
    const [isRefreshing, setRefreshing] = useState(false);
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        (async () => {
            await searchFriends()
        })();
    }, []);

    const searchFriends = async () => {
        setRefreshing(true)
        const res = await getFriends()
        setFriends(res)
        setRefreshing(false)
    };

    return (
        <>
            <List
                data={friends}
                keyExtractor={(item) => item}
                renderItem={({ item }) =>
                    <FriendListItem
                        friendData={item}
                        navigation={navigation}
                    />
                }
                refreshing={isRefreshing}
                onRefresh={searchFriends}
            />
        </>
    );
};

export default FriendList;

const styles = StyleSheet.create({
    iconContainer: {
        flex: 1,
        marginHorizontal: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    icon: {
        marginLeft: 4,
        marginTop: 4,
        width: 28,
        height: 28,
    },
});