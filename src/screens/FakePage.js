import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, Text, View, StyleSheet, Image} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app'

export const OrdersContext = React.createContext();


const FakePage = () => {
    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [orders, setOrders] = useState([]); // Initial empty array of users

    useEffect(() => {
        const subscriber = firestore()
            .collection('FakeOrder')
            .onSnapshot(querySnapshot => {
                const orders = [];

                querySnapshot.forEach(documentSnapshot => {
                    orders.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });

                setOrders(orders);
                setLoading(false);
            });

        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, []);

    return (
        <SafeAreaView style={{height: '100%'}}>
            <Text style={styles.text}>Orders</Text>
            <FlatList data={orders} renderItem={({item}) =>
                <View>
                    <Text style={styles.text}>{item.name}</Text>
                </View>
            }/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
 text:{
     fontSize: 50
 }

});



export default FakePage;


