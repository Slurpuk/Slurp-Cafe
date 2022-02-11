/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import OrderCard from "./OrderCard";
import OrderStatuses from "./OrderStatuses";

const OrdersPage = () => {

    return (
        <SafeAreaView style={styles.page}>
            <OrderCard orderType={OrderStatuses.INCOMING}/>
            <OrderCard orderType={OrderStatuses.INCOMING}/>
            <OrderCard orderType={OrderStatuses.INCOMING}/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    page: {
        padding: '5%'
    }
});

export default OrdersPage;
