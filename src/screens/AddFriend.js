import React, { useState, useEffect } from 'react';
import { StyleSheet, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input, Button } from '@ui-kitten/components';
import Toast from 'react-native-root-toast';
import SvgQRCode from 'react-native-qrcode-svg';

import { addFriend, getUserId } from '../../config/firebase'

const AddFriend = ({ navigation }) => {
    const [friendId, setFriendId] = useState('');
    const [userId, setUserId] = useState('userId');



    useEffect(() => {
        (async () => {
            setUserId(await getUserId());
        })();
    }, []);

    return (
        <SafeAreaView style={{}}>
            <SvgQRCode value={userId} />
            <Input
                placeholder='FriendId'
                value={friendId}
                onChangeText={nextValue => setFriendId(nextValue)}
            />

            <Button onPress={async () => {
                if (await addFriend(friendId)) {
                    Toast.show('Ami ajouté', {
                        duration: Toast.durations.LONG,
                    });
                    navigation.goBack();
                }
                else {
                    Toast.show('ID ami non valide', {
                        duration: Toast.durations.LONG,
                    });
                    Keyboard.dismiss();
                }
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