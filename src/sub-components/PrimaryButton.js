import React from 'react';
import {Dimensions, Pressable, StyleSheet, Text} from "react-native";



const PrimaryButton = ({color, buttonText, onPress}) => {
    return (
        <Pressable style={[styles.button, {backgroundColor: color}]} onPress={onPress}>
            <Text style={styles.button_text}>{buttonText}</Text>
        </Pressable>
    );
};

const screenWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
    button: {
        flexDirection: 'column',
        justifyContent: 'center',
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderRadius: 3,
        height: 60,
        width: screenWidth * 0.3,
    },
    button_text: {
        color: 'white',
        fontWeight: '700',
        fontSize: 25,
        fontFamily: 'Roboto',
        alignSelf: 'center'
    },
});


export default PrimaryButton;
