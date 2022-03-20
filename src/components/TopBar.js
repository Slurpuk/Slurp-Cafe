import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Switch, Text, View} from "react-native";
import PrimaryButton from "../sub-components/PrimaryButton";
import firestore from "@react-native-firebase/firestore";

const TopBar = ({navigation, receivingOrders, setReceivingOrders, currentShop}) => {
    const [isEnabled, setIsEnabled] = useState(receivingOrders)

    const toggleSwitch = () =>
    {
        setIsEnabled(prevState => !prevState)
        firestore().collection('CoffeeShop').doc(currentShop.id).update({
            IsOpen : !isEnabled
        }).then()
    }

    useEffect (() => {
        setReceivingOrders(isEnabled)
    }, [isEnabled])

    function goToAccountManagement() {
        navigation.navigate('Account Management');
    }

    return (
        <View style={styles.container}>
            <PrimaryButton newStyle={styles.manageButton} buttonText={'Manage Shop'} onPress={goToAccountManagement}/>
            <View style={styles.manageOrdersHeadline}>
                <Text style={styles.manageOrdersHeadlineText}>Accepting Orders: </Text>
                <Text style={[styles.manageOrdersHeadlineText, {fontWeight: '900'}]}>{isEnabled ? "Yep" : "Nope"}</Text>
            </View>
            <Switch trackColor={'#E0E0E0'}
                    thumbColor={isEnabled ? "#218F89" : "#BE1753"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '12%',
        paddingHorizontal: '3.5%',
        alignItems: 'center',
        backgroundColor: '#F6F6F6',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
    },
    manageButton: {
        backgroundColor: '#207671',
        width: '35%',
        padding: '2%',
    },
    manageOrdersHeadline: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center',
    },
    manageOrdersHeadlineText: {
        fontSize: 25,
        fontFamily: 'Roboto',
        fontWeight: '400',
        color: 'black',
    }
});


export default TopBar;
