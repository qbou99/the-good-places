import React, { useState, useEffect } from 'react';
import { StyleSheet, Keyboard, KeyboardAvoidingView, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input, Button, Text } from '@ui-kitten/components';
import Toast from 'react-native-root-toast';
import SvgQRCode from 'react-native-qrcode-svg';
import * as Clipboard from 'expo-clipboard';

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
        <SafeAreaView
            style={styles.container}
        //contentContainerStyle={styles.container2}
        >
            <ScrollView>
                <KeyboardAvoidingView style={styles.container2} behavior="padding">

                    <Text style={styles.title}>Montrer ce QrCode à quelqu'un pour qu'il puisse vous ajouter dans sa liste d'amis</Text>
                    <SvgQRCode value={userId} size={300} />

                    <View style={styles.buttons}>
                        <Input
                            placeholder='FriendId'
                            value={friendId}
                            onChangeText={nextValue => setFriendId(nextValue)}
                            style={styles.textInput}
                        />


                        <Button style={styles.button} onPress={async () => {
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
                    </View>

                    <Button style={styles.button} onPress={() => { navigation.navigate("ViewScanQrCode"); }}>
                        Scanner un QRCode
                    </Button>
                    <Button style={styles.button} onPress={() => {
                        Clipboard.setString(userId);
                        Toast.show('ID Copié', {
                            duration: Toast.durations.LONG,
                        });
                    }}>
                        Copié mon ID
                    </Button>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>);
};

export default AddFriend;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    container2: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        paddingTop: 20
    },

    title: {
        margin: 10,
        fontSize: 16,
        textAlign: 'center'
    },

    buttons: {
        flexDirection: 'row',
        margin: 10,
    },

    button: {
        marginTop: 12,
        backgroundColor: '#6db966',
        borderColor: '#6db966',
        borderRadius: 10,
        height: 45
    },

    textInput: {
        width: '80%',
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
});