import {StyleSheet, Text} from 'react-native';
import React from 'react';

const EmptyListText = ({text}) => {
    return (
        <Text style={styles.emptyText}>{text}</Text>
    );
};

const styles = StyleSheet.create({
    emptyText: {
        paddingTop: '15%',
        paddingHorizontal: '2%',
        textAlign: 'center',
        fontFamily: 'MontSerrat-SemiBold',
        color: 'grey',
        fontSize: 30
    },
});

export default EmptyListText;

