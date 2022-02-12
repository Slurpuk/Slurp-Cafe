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
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    button_text: {
        color: 'white',
        fontWeight: '700',
        fontSize: 25,
        fontFamily: 'Roboto'
    },
});


export default PrimaryButton;
