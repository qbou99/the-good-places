import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Input, Select, SelectItem, Button } from '@ui-kitten/components';

const EditPlace = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');

    return (
        <View>
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
            <Button onPress={() => {}}>
                Send
            </Button>
        </View>
    );
};

export default EditPlace;