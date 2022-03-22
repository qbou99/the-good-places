import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input, Button } from '@ui-kitten/components';

import { addFriend } from '../../config/firebase'
import { Colors } from 'react-native/Libraries/NewAppScreen';

const AddFriend = ({ navigation }) => {
    const [friendId, setFriendId] = useState('');

    return (
        <SafeAreaView style={{  }}>
            <Input
                placeholder='FriendId'
                value={friendId}
                onChangeText={nextValue => setFriendId(nextValue)}
            />

            <Button onPress={async () => {
                await addFriend(friendId)
                navigation.goBack()
            }}>
                Ajouter
            </Button>

        </SafeAreaView>
    );
};

export default AddFriend;

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});