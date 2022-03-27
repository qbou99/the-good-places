import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { addFriend } from '../../config/firebase';
import Toast from 'react-native-root-toast';

export default function ScanQrCode({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [friendId, setFriendId] = useState("friendId");


    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setFriendId(data);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            {!scanned ?
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            /> :
            
                <View>
                    <Button style={styles.button} title={'Réessayer'} onPress={() => setScanned(false)} />
                    <Button style={styles.button} title={'Ajouter l\'ami'} onPress={async () => {
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
                        }
                    }}>
                    </Button>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    button: {
        backgroundColor: '#6db966',
        borderColor: '#6db966',
        borderRadius: 10,
        height: 30
    },
})