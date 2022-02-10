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
import OrderComponent from "./OrderComponent";

const OrdersPage = () => {

    return (
        <SafeAreaView style={styles.page}>
            <OrderComponent orderType={'incoming'}></OrderComponent>
            <OrderComponent orderType={'accepted'}></OrderComponent>
            <OrderComponent orderType={'ready'}></OrderComponent>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    page: {
        padding: '5%'
    }
});

export default OrdersPage;
