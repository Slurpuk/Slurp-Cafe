import React, {useContext, useEffect, useState} from 'react';
import {Switch, Text, View} from "react-native";
import PrimaryButton from "../sub-components/PrimaryButton";
import {GlobalContext} from "../../App";
import {goToAccountManagement, toggleSwitch} from "../helpers/functions";
import {topBarStyles} from "../../styles/TopBar";

const TopBar = ({navigation, receivingOrders}) => {
    const [isEnabled, setIsEnabled] = useState(receivingOrders);
    const globalContext = useContext(GlobalContext);

    useEffect (() => {
        setIsEnabled(globalContext.coffeeShopObj.IsOpen)
    }, [globalContext.coffeeShopObj])

    return (
        <View style={topBarStyles.container}>
            <PrimaryButton color={'#207671'} buttonText={'Manage Shop'} onPress={() => goToAccountManagement(navigation)}/>
            <View style={topBarStyles.manageOrdersHeadline}>
                <Text style={topBarStyles.manageOrdersHeadlineText}>Accepting Orders: </Text>
                <Text style={[topBarStyles.manageOrdersHeadlineText, {fontWeight: '900'}]}>{isEnabled ? "Yep" : "Nope"}</Text>
            </View>
            <Switch trackColor={'#E0E0E0'}
                    thumbColor={isEnabled ? "#218F89" : "#BE1753"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => toggleSwitch(setIsEnabled, globalContext.coffeeShopRef, isEnabled)}
                    value={isEnabled}
                    style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
            />
        </View>
    );
};


export default TopBar;
