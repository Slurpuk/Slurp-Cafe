/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useContext} from 'react';
import OrdersContext from '../screens/OrdersPage';
import {
    FlatList, StyleSheet,
    Text,
    View,
} from 'react-native';
import OrderStatuses from "./OrderStatuses";
import OrderHeader from "../sub-components/OrderHeader"
import OrderActionButton from "./OrderActionButton";


const OrderCard = ({order, updateOrder}) => {

    const [total, setTotal] = useState(9.4)
    const [customer, setCustomer] = useState(order.customer)
    const [orderNumber, setOrderNumber] = useState(order.key)
    const [ETA, setETA] = useState(6)

    return (
        <View>
            {
                order.status === OrderStatuses.REJECTED ? null
                    :
                    (
                    <View style={styles.rectangle}>
                        <OrderHeader customer={customer} total={total} orderNumber={orderNumber} ETA={ETA}/>
                        <Text style={styles.order_size}>{order.items.length} items</Text>
                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={styles.list_of_orders}>
                                <FlatList
                                    style={styles.list}
                                    data={order.items.slice(0, 2)}
                                    horizontal={true}
                                    renderItem={({item}) => (
                                    <View style={styles.order}>
                                        <Text style={styles.amount}>{item.amount}</Text>
                                        <Text style={styles.item_name}>{item.name}</Text>
                                    </View>
                                )}/>
                                {order.items.length > 2 ? <Text style={styles.dots}>...</Text> : null}
                            </View>
                            <OrderActionButton order={order} updateOrder={updateOrder}/>
                        </View>
                    </View>
                    ) }
        </View>
    );
};

const styles = StyleSheet.create({
    rectangle: {
        marginVertical: '2%',
        display: "flex",
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
    list_of_orders:{
        display: "flex",
        flexDirection: 'row',
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
});

export default OrderCard;
