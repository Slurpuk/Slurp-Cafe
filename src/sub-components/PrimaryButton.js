import React from 'react';
import {Pressable, StyleSheet, Text} from "react-native";



const PrimaryButton = ({newStyle, buttonText}) => {
    return (
        <Pressable style={[newStyle, styles.button]}>
            <Text style={styles.button_text}>{buttonText}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        padding: '5%',
        alignItems: 'center',
    },
    button_text: {
        color: 'white',
        fontWeight: '700',
        fontSize: 25,
        fontFamily: 'Roboto'
    },
});


export default PrimaryButton;
