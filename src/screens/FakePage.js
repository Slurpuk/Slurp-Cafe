import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, Text, View, StyleSheet, Image} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export const OrdersContext = React.createContext();

const FakePage = () => {

    return (
        <SafeAreaView style={{height: '100%'}}>
            <Text>Orders</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

});

export default FakePage;


