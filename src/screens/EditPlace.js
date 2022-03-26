import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input, Select, SelectItem, Button, Modal, Card, Text, List, ListItem } from '@ui-kitten/components';
import { connect } from "react-redux";

import { forward, reverse } from '../api/positionstack'
import { addPlace } from '../../config/firebase'

const EditPlace = ( {navigation, dispatch} ) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [selectedIndex, setSelectedIndex] = useState('');
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState([]);

    const renderItem = ({ item, index }) => (
        <ListItem title={`${item.label}`} onPressOut={()=>{setAddress(item.label); setVisible(false);}} style={{flex: 1}} />
      );

    return (
        <SafeAreaView style={{flex: 1}}>
            <Input 
                placeholder='Name'
                value={name}
                onChangeText={nextValue => setName(nextValue)}
                />
            <Input 
                placeholder='Description'
                value={description}
                multiline={true}
                onChangeText={nextValue => setDescription(nextValue)}
                />
            <Select
                multiSelect={true}
                selectedIndex={selectedIndex}
                onSelect={index => setSelectedIndex(index)}>
                <SelectItem title='Option 1'/>
                <SelectItem title='Option 2'/>
                <SelectItem title='Option 3'/>
            </Select>
            <Input 
                placeholder='Address'
                value={address}
                multiline={true}
                onChangeText={nextValue => setAddress(nextValue)}
                />
            <Button onPress={ async () => {  
                const res = await forward(address)
                setData(res)
                if(address === res[0].label) {
                    let place = res[0];
                    if(place.type === "venue")
                    {
                        const reverseData = await reverse(place.latitude, place.longitude);
                        place = reverseData.data.find(p => p.type === "address");
                    }
                    const result = await addPlace(place.label, {latitude: place.latitude, longitude: place.longitude}, description, name, [{name:"local-pizza", pack:"material"}])
                    const action = { type: "ADD_PLACE", value: result };
                    console.log(result)
                    dispatch(action);
                    navigation.goBack()
                } else
                    setVisible(true);
                }}>
                Send
            </Button>

            <Modal
            style={{maxheight: Dimensions.get('window').height - 100, width: Dimensions.get('window').width - 50}}
                visible={visible}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setVisible(false)}>
                <Card disabled={true}>
                    
                    <Text category={'h2'} style={{paddingBottom: 10}} >Select address</Text>
                    <List
                        data={data}
                        renderItem={renderItem}
                        />
                    <Button onPress={() => console.log(data)}>
                        DISMISS
                    </Button>
                </Card>
            </Modal>
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
  });