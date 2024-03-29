import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    Input,
    Select,
    SelectItem,
    Button,
    Modal,
    Card,
    Text,
    List,
    ListItem,
    IndexPath,
} from "@ui-kitten/components";
import { connect } from "react-redux";
import * as Location from "expo-location";
import { forward, reverse } from "../api/positionstack";
import { addPlace, setPlace } from "../../config/firebase";
import categories from "../helpers/categories";

const EditPlace = ({ navigation, dispatch, route }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [selectedTag, setSelectedTag] = useState([]);
    const [selectedMethod, setSelectedMethod] = useState(new IndexPath(0));
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState([]);
    const [addressDisabled, setAddressDisabled] = useState(true);
    const [addressLocation, setAddressLocation] = useState('');
    const [cityLocation, setCityLocation] = useState('');

    const [modifPlace, setModifPlace] = useState(null);

    useEffect(() => {
        //console.log(placeData);
        if (route?.params?.placeData) {
            setModifPlace(route?.params?.placeData)
            setAddress(route?.params?.placeData.address)
            setName(route?.params?.placeData.name)
            setDescription(route?.params?.placeData.description)
            setCityLocation(route?.params?.placeData.city)
            let tags = []
            let i = 0;
            selectedTagContent.forEach(tag => {
                console.log(tag)

                let found = route?.params?.placeData.tags.find(tag2 => { return (tag2.name == categories[tag].name) })
                if (found) {
                    tags.push(new IndexPath(i))
                }
                i++
            });
            console.log(tags)
            setSelectedTag(tags)
        }

        (async () => {
            let location = await Location.getCurrentPositionAsync({});
            const addr = await reverse(location.coords.latitude, location.coords.longitude);
            setAddressLocation(addr);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (displayValue == "Entrer manuellement l'addresse") {
                //setAddress('')
                setAddressDisabled(false);
            }
            else {
                setAddressDisabled(true);
                if (addressLocation) {
                    setAddress(addressLocation.data[0].name + ", " + addressLocation.data[0].locality + ", " + addressLocation.data[0].country);
                    setCityLocation(addressLocation.data[0].locality);
                }
            }
        })();
    });

    const renderItem = ({ item, index }) => (
        <ListItem
            title={`${item.label}`}
            onPressOut={async () => {
                setAddress(item.label);
                setVisible(false);
                await sendPlace(item.label);
            }}
            style={{ flex: 1 }}
        />
    );

    const selectedMethodContent = [
        "Utiliser ma localisation",
        "Entrer manuellement l'addresse",
    ];

    const selectedTagContent = [
        'Bar',
        'Restaurant',
        'Loisir',
        'Nature',
        'Nourriture à emporter',
        'Jeunesse',
    ];

    const renderOption = (title) => <SelectItem title={title} key={title} />;

    const displayValue = selectedMethodContent[selectedMethod.row];

    const groupDisplayValues = selectedTag.map((index) => {
        return selectedTagContent[index.row] + " ";
    });

    const sendPlace = async (addr) => {
        const res = await forward(addr);
        setData(res);
        if (addr === res[0].label) {
            let place = res[0];
            let city = res[0].locality;

            if (place.type === "venue") {
                const reverseData = await reverse(place.latitude, place.longitude);
                console.log(reverseData.data[0].locality[0]);
                place = reverseData.data.find((p) => p.type === "address");
                if (!place) place = res[0];
            }
            const icon = []
            selectedTag.forEach(element => {
                icon.push(categories[selectedTagContent[element.row]]);

            });
            let result;
            if (modifPlace) {
                result = await setPlace(
                    modifPlace.id,
                    modifPlace.address,
                    modifPlace.city,
                    modifPlace.coordinates,
                    description,
                    name,
                    icon,
                    modifPlace.originalId
                )
                dispatch({ type: "EDIT_PLACE", value: result });
                dispatch({ type: "EDIT_VISIBLE_PLACE", value: result });
            } else {
                result = await addPlace(
                    place.label,
                    city,
                    {
                        latitude: place.latitude,
                        longitude: place.longitude
                    },
                    description,
                    name,
                    icon
                )
                const action = { type: "ADD_PLACE", value: result };
                dispatch(action);
            }


            navigation.goBack();
        } else setVisible(true);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <KeyboardAvoidingView style={styles.container2} behavior="padding">
                    {modifPlace ? <Text style={styles.title}>
                        Compléter ces champs pour modifier un lieu
                    </Text> : <Text style={styles.title}>
                        Compléter ces champs pour enregister un lieu
                    </Text>}

                    {modifPlace ? (<></>) : (<Select
                        multiSelect={false}
                        selectedIndex={selectedMethod}
                        onSelect={(index) => setSelectedMethod(index)}
                        style={styles.select}
                        placeholder="Choisir le mode de saisie de l'adresse"
                        value={displayValue}
                    >
                        {selectedMethodContent.map(renderOption)}
                    </Select>)}


                    <Input
                        placeholder="Nom"
                        value={name}
                        onChangeText={(nextValue) => setName(nextValue)}
                        style={styles.textInput}
                    />
                    <Input
                        placeholder="Description"
                        value={description}
                        multiline={true}
                        textStyle={{ minHeight: 64 }}
                        onChangeText={(nextValue) => setDescription(nextValue)}
                        style={styles.textInput}
                    />
                    {modifPlace ? (<></>) : (<Input
                        placeholder="Adresse"
                        value={address}
                        multiline={true}
                        onChangeText={(nextValue) => setAddress(nextValue)}
                        style={styles.textInput}
                        disabled={addressDisabled}
                    />)}
                    <Select
                        multiSelect={true}
                        selectedIndex={selectedTag}
                        onSelect={(index) => setSelectedTag(index)}
                        style={styles.select}
                        placeholder="Choisir des tags"
                        value={groupDisplayValues}
                    >
                        {selectedTagContent.map(renderOption)}
                    </Select>

                    {modifPlace ? <Button
                        onPress={async () => await sendPlace(address)}
                        style={styles.button}
                    >
                        Modifier le lieu
                    </Button> : <Button
                        onPress={async () => await sendPlace(address)}
                        style={styles.button}
                    >
                        Enregistrer le lieu
                    </Button>}

                    <Modal
                        style={{
                            maxheight: Dimensions.get("window").height - 100,
                            width: Dimensions.get("window").width - 50,
                        }}
                        visible={visible}
                        backdropStyle={styles.backdrop}
                        onBackdropPress={() => setVisible(false)}
                    >
                        <Card disabled={true}>
                            <Text category={"h2"} style={{ paddingBottom: 10 }}>
                                Select address
                            </Text>
                            <List data={data} renderItem={renderItem} />
                            <Button onPress={() => setVisible(false)} style={styles.button}>
                                DISMISS
                            </Button>
                        </Card>
                    </Modal>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    );
};

const mapStateToProps = (state) => {
    return {
        visiblePlaces: state.visiblePlaces.visiblePlaces,
        centerCoords: state.centerCoords.centerCoords,
        places: state.places.places,
    };
};

export default connect(mapStateToProps)(EditPlace);

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

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

    button: {
        flexDirection: 'row',
        margin: 10,
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

    select: {
        width: '80%',
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        margin: 5,
    },

    icon: {
        marginLeft: 4,
        marginTop: 4,
        width: 28,
        height: 28,
    },
});





