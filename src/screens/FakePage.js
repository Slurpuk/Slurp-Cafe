import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, Text, View, StyleSheet, Image} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export const OrdersContext = React.createContext();

const FakePage = () => {

    const fakeOrders = firestore().collection('FakeOrder');

    return (
        <SafeAreaView style={{height: '100%'}}>
            <Text>Orders</Text>
            <FlatList data={fakeOrders} renderItem={({item}) =>
                <View>
                    <Text>item.name</Text>
                    <Text>item.status</Text>
                </View>
            }>

            </FlatList>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

});

export default FakePage;


