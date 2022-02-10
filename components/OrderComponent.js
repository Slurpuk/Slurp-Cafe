/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import {
    FlatList, Pressable,
    SafeAreaView, ScrollView,
    StyleSheet,
    Text, View,
} from 'react-native';

const OrderComponent = (props) => {

    const [total, setTotal] = useState(9.4)

    const [orderType, setOrderType] = useState(props.orderType)

    const [Orders] = useState([
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
        <View>
            {orderType == 'rejected' || orderType == 'finished' ? null :
                <View>
                {orderType == 'expanded' ?
                    <View style={styles.rectangle}>
                        <View style={styles.left_side}>
                            <View style={styles.header}>
                                <Text style={styles.name}>Mike Myers</Text>
                            </View>
                            <Text style={styles.order_number}>#53441</Text>
                            <Text style={styles.order_size}>4 items</Text>
                            <View style={styles.list_of_orders}>
                                <ScrollView>
                                    <FlatList
                                        data={Orders}
                                        renderItem={({item}) => (
                                            <View style={[styles.order, styles.expandedOrder]}>
                                                <Text style={styles.amount}>{item.amount}</Text>
                                                <Text style={styles.item_name}>{item.name}</Text>
                                            </View>
                                        )}/>
                                </ScrollView>
                            </View>
                            <View style={styles.total}>
                                <Text style={styles.total_text}>Total</Text>
                                <Text style={styles.total_price}>£{total.toFixed(2)}</Text>
                            </View>
                            <Pressable style={[styles.acceptButton, styles.button]}
                                       onPress={() => setOrderType('accepted')}>
                                <Text style={styles.button_text}>Accept Order</Text>
                            </Pressable>
                        </View>
                        <View style={styles.right_side}>
                            <View style={styles.time}>
                                <Text style={styles.c}>Icon!!!</Text>
                                <Text style={styles.clock_number}>6</Text>
                            </View>
                            <Pressable style={[styles.rejectButton, styles.button]}
                                       onPress={() => setOrderType('rejected')}>
                                <Text style={styles.button_text}>Reject Order</Text>
                            </Pressable>
                        </View>
                    </View>
                    :
                    <View style={styles.rectangle}>
                        <View style={styles.left_side}>
                            <View style={styles.header}>
                                <Text style={styles.name}>Mike Myers</Text>
                                <Text style={styles.total_price}>£{total.toFixed(2)}</Text>
                            </View>
                            <Text style={styles.order_number}>#53441</Text>
                            <Text style={styles.order_size}>4 items</Text>
                            <View style={styles.list_of_orders}>
                                <FlatList
                                    style={styles.list}
                                    data={Orders.slice(0, 2)}
                                    horizontal={true}
                                    renderItem={({item}) => (
                                        <View style={styles.order}>
                                            <Text style={styles.amount}>{item.amount}</Text>
                                            <Text style={styles.item_name}>{item.name}</Text>
                                        </View>
                                    )}/>

                                {Orders.length > 2 ? <Text style={styles.dots}>...</Text> : null}
                            </View>
                        </View>
                        <View style={styles.right_side}>
                            <View style={styles.time}>
                                <Text style={styles.c}>Icon!!!</Text>
                                <Text style={styles.clock_number}>6</Text>
                            </View>
                            {orderType == 'incoming' ?
                                <Pressable style={[styles.incomingButton, styles.button]}
                                           onPress={() => setOrderType('expanded')}>
                                    <Text style={styles.button_text}>View order</Text>
                                </Pressable>
                                : null}
                            {orderType == 'accepted' ?
                                <Pressable style={[styles.acceptedButton, styles.button]}
                                           onPress={() => setOrderType('ready')}>
                                    <Text style={styles.button_text}>Mark as ready</Text>
                                </Pressable>
                                : null}
                            {orderType == 'ready' ?
                                <Pressable style={[styles.readyButton, styles.button]}
                                           onPress={() => setOrderType('finished')}>
                                    <Text style={styles.button_text}>Mark as collected</Text>
                                </Pressable>
                                : null}
                        </View>
                    </View>
            }
                </View>
            }
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
    rectangle: {
        marginVertical: '2%',
        display: "flex",
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#F2F2F2',
        justifyContent: 'space-between',
        padding: '3%',
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
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
    expandedOrder:{
      borderColor: '#DEDEDE',
      borderStyle: 'solid',
      borderBottomWidth: 1,
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
    clock_number:{
        fontFamily: 'Montserrat',
        fontWeight: '600',
        fontSize: 25,
        color: '#239DAD'
    },
    left_side:{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '50%',
    },
    right_side:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    total_price: {
        fontFamily: 'Montserrat',
        fontSize: 25,
        color: '#000000',
        marginLeft: '5%',
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
    header: {
        display: 'flex',
        flexDirection: 'row',
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
        padding: '5%',
        alignItems: 'center',
    },
    acceptButton:{
        backgroundColor: '#4273D3',
    },
    rejectButton:{
        backgroundColor: 'red'
    },
    incomingButton:{
        backgroundColor: '#D2AD2B',
    },
    acceptedButton:{
        backgroundColor: '#4273D3',
    },
    readyButton:{
        backgroundColor: '#218F89',
    }
});

export default OrderComponent;
