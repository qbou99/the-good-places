import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Icon } from '@ui-kitten/components';

const TagsIcon = ( { name }) => {
    return (
        <View style={styles.circle} >
            <Icon name={name} style={styles.icon} fill='#8F9BB3' />
        </View>
    )

};

export default TagsIcon;

const styles = StyleSheet.create({

    circle: {

        width: 40,
        height: 40,
        borderRadius: 50 / 2,
        borderWidth: 2,
        borderColor: "#9999",
        alignContent: "center",
        backgroundColor: '#FFFF',
        marginLeft: -15
    },
    icon: {
        marginLeft: 4,
        marginTop: 4,
        width: 28,
        height: 28,

    },
});
