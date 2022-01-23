import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Icon } from '@ui-kitten/components';

import TagsIcon from './TagsIcon';

const TagsList = ( { tags }) => {

    return (
        <View style={styles.container}>
        {
            tags.map((element, i) => {   
                return ( <TagsIcon key={element} name={element}/>) 
            })
        }
        </View>
    )

};

export default TagsList;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginLeft: 15
    }
});
