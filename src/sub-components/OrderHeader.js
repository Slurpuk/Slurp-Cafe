import React, {useState, createContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';


const OrderHeadline = ({orderNumber, customer, total, ETA}) => {
    return (
        <View style={{display:'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{display: 'flex'}}>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Text style={styles.name}>{customer}</Text>
                    <Text style={styles.total_price}>£{total.toFixed(2)}</Text>
                </View>
                <Text style={styles.order_number}>#{orderNumber}</Text>
            </View>

            <View style={styles.time}>
                <Text>Icon!!!</Text>
                <Text style={styles.clock_number}>{ETA}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    name: {
        fontFamily: 'Montserrat',
        fontWeight: '600',
        fontSize: 25,
        color: '#000000'
    },
    order_number:{
        fontFamily: 'Montserrat',
        fontWeight: '400',
        fontSize: 21,
        color: '#9A9A9A',
    },
    time: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'flex-start',
    },
    clock_number:{
        fontFamily: 'Montserrat',
        fontWeight: '600',
        fontSize: 25,
        color: '#239DAD'
    },
    total_text: {
        fontFamily: 'Montserrat',
        fontWeight: '700',
        fontSize: 25,
        color: '#000000',
        marginLeft: '5%',
    },
    total: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '20%',
    },
    total_price: {
        fontFamily: 'Montserrat',
        fontSize: 25,
        color: '#000000',
        marginLeft: '5%',
    },
});

export default OrderHeadline;
