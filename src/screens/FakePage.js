import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, Text, View, StyleSheet, Image} from 'react-native';


export const OrdersContext = React.createContext();

const FakePage = () => {
    return (
        <SafeAreaView style={{height: '100%'}}>
            <FlatList data={}>

            </FlatList>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

});

export default OrdersPage;


