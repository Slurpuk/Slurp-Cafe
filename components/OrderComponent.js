/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    FlatList, Pressable,
    SafeAreaView,
    StyleSheet,
    Text, View,
} from 'react-native';

const OrderComponent = () => {

    const [Order] = useState([
        {
            key: 1,
            name: 'Latte',
            amount: 1,
            price: 2.40,
            specifications: ['Oat Milk'],
        },
        {
            key: 2,
            name: 'Cappuccino',
            amount: 2,
            price: 2.30,
            specifications: ['Dairy', 'Caramel Syrup'],
        },
        {
            key: 3,
            name: 'Flat white',
            amount: 3,
            price: 2.70,
            specifications: ['Dairy'],
        },
    ]);

    return (
        <SafeAreaView>
            <View style={styles.rectangle}>
                <View style={styles.left_side}>
                    <View style={styles.header}>
                        <Text style={styles.name}>Mike Myers</Text>
                        <Text style={styles.total_price}>£9.40</Text>
                    </View>
                    <Text style={styles.order_number}>#53441</Text>
                    <Text style={styles.order_size}>4 items</Text>
                    <View style={styles.list_of_orders}>
                        <FlatList
                            style={styles.list}
                            data={Order.slice(0,2)}
                            horizontal={true}
                            renderItem={({item}) => (
                            <View style={styles.order}>
                                <Text style={styles.amount}>{item.amount}</Text>
                                <Text style={styles.item_name}>{item.name}</Text>
                            </View>
                        )}/>

                        {Order.length > 2 ? <Text style={styles.dots}>...</Text>: null}
                    </View>
                </View>
                <View style={styles.right_side}>
                    <View style={styles.time}>
                        <FontAwesomeIcon
                            icon='clock-five'
                            />
                        <Text style={styles.clock_number}>6</Text>
                    </View>
                    <Pressable style={styles.button}>
                        <Text style={styles.button_text}>Mark as ready</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    name: {
        fontFamily: 'Montserrat',
        fontWeight: '600',
        fontSize: 25,
        color: '#000000'
    },
    rectangle: {
        display: "flex",
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#F2F2F2',
        justifyContent: 'space-between',
        padding: '3%',
    },
    order_number:{
        fontFamily: 'Montserrat',
        fontWeight: '400',
        fontSize: 21,
        color: '#9A9A9A',
    },
    list_of_orders:{
        display: "flex",
        flexDirection: 'row'
    },
    order: {
        paddingVertical: 5,
        paddingRight: 14,
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",

    },
    order_size: {
        fontFamily: 'Montserrat',
        fontWeight: '300',
        fontStyle: 'italic',
        fontSize: 21,
        color: '#000000',
    },
    time: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'flex-end',
    },
    clock:{

    },
    clock_number:{
        fontFamily: 'Montserrat',
        fontWeight: '600',
        fontSize: 25,
        color: '#239DAD'
    },
    left_side:{
        display: 'flex',
        flexDirection: 'column',
    },
    right_side:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    total_price: {
        fontFamily: 'Montserrat',
        fontWeight: '700',
        fontSize: 25,
        color: '#000000',
        marginLeft: '5%',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
    },
    list:{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: "nowrap",
    },
    amount:{
        fontFamily: 'Roboto',
        fontWeight: '700',
        fontSize: 24,
        color: '#000000',
        marginRight: 4,
    },
    item_name:{
        fontFamily: 'Montserrat',
        fontWeight: '300',
        fontSize: 24,
        color: '#000000',
    },
    dots:{
        fontFamily: 'Montserrat',
        fontWeight: '300',
        fontSize: 24,
        color: '#000000',
        marginTop: 7,
        marginRight: 4,
    },
    button_text: {
        color: 'white',
        fontWeight: '700',
        fontSize: 25,
        fontFamily: 'Roboto'
    },
    button: {
        display: 'flex',
        backgroundColor: '#4273D3',
        padding: '5%',
        alignItems: 'center',
    },
});

export default OrderComponent;
