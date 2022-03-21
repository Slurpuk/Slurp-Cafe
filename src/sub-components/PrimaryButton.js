import React from 'react';
import {Dimensions, Pressable, StyleSheet, Text} from "react-native";



const PrimaryButton = ({color, widthRatio = 0.3, buttonText, onPress}) => {
    const screenWidth = Dimensions.get('window').width;

    return (
        <Pressable style={[styles.button, {backgroundColor: color, width: screenWidth * widthRatio}]} onPress={onPress}>
            <Text style={styles.button_text}>{buttonText}</Text>
        </Pressable>
    );
};


const styles = StyleSheet.create({
    button: {
        flexDirection: 'column',
        alignItems: 'center',
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
