import React, {useContext, useEffect, useState} from 'react';
import {Pressable, StyleSheet, Switch, Text, View} from "react-native";
import PrimaryButton from "../sub-components/PrimaryButton";
import firestore from "@react-native-firebase/firestore";
import {GlobalContext} from "../../App";

const TopBar = ({navigation, receivingOrders, setReceivingOrders}) => {
    const [isEnabled, setIsEnabled] = useState(receivingOrders);
    const globalContext = useContext(GlobalContext);

    const toggleSwitch = () =>
    {
        setIsEnabled(prevState => !prevState)
        firestore().collection('CoffeeShop').doc(globalContext.coffeeShopRef).update({
            IsOpen : !isEnabled
        })
    }

    useEffect (() => {
        if (globalContext.coffeeShopObj) {
            setIsEnabled(globalContext.coffeeShopObj.IsOpen)
        }
    }, [globalContext.coffeeShopObj])

    function goToAccountManagement() {
        navigation.navigate('Account Management');
    }

    return (
        <View style={styles.container}>
            <PrimaryButton color={'#207671'} buttonText={'Manage Shop'} onPress={goToAccountManagement}/>
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
