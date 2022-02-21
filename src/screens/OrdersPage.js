import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, Text, View, StyleSheet, Image} from 'react-native';
import SECTIONS from '../fake-data/OrderTabSectionsData';
import OrdersTab from '../components/OrdersTab';
import OrderCard from '../components/OrderCard';
import OrdersData from '../fake-data/OrdersData';
import mapper from '../components/mapper';
import TabStatuses from '../components/TabStatuses';
import TopBar from "../components/TopBar";
import firestore from "@react-native-firebase/firestore";
import firebase from "@react-native-firebase/app";
export const OrdersContext = React.createContext();

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [currentStatus, setCurrentStatus] = useState(TabStatuses.ALL);
    const [currentOrders, setCurrentOrders] = useState([]);
    const [receivingOrders, setReceivingOrders] = useState(true)


    useEffect(() => {
        updateOrders();
    }, [currentStatus]);

    useEffect(() => {
        const subscriber = firestore()
            .collection('FakeOrder')
            .onSnapshot(querySnapshot => {
                const currentOrders = [];
                const orders = [];

                querySnapshot.forEach(documentSnapshot => {
                    currentOrders.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                    orders.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });

                setCurrentOrders(currentOrders);
                setOrders(orders);
            });

        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, []);

    const setOrderStatus = (order, status) => {
        let index = orders.indexOf(order);
        let current = orders;
        current[index].status = status;

        let documentPath = firebase.firestore().collection('FakeOrder').find(doc => doc.customerName == order.customerName)
        firebase.firestore().collection('FakeOrder').doc(documentPath).update({
            status: status
        })

        setOrders(current);
        updateOrders();
    };

    const updateOrders = () => {
        if (currentStatus === TabStatuses.ALL) setCurrentOrders(orders);
        else {
            let target = mapper(currentStatus);
            setCurrentOrders(orders.filter(or => target.indexOf(or.status) !== -1));
        }
    };

    return (
        <SafeAreaView style={{height: '100%'}}>
            <TopBar receivingOrders={receivingOrders} setReceivingOrders={setReceivingOrders}/>
            {receivingOrders ?
                <View style={{padding: '5%'}}>
                    <OrdersContext.Provider
                        value={{
                            orders: orders,
                            setOrderStatus: setOrderStatus,
                        }}
                    >
                        <Text style={styles.activeOrdersText}>Active orders</Text>
                        <OrdersTab SECTIONS={SECTIONS} setStatus={setCurrentStatus}/>
                        <FlatList
                            data={currentOrders}
                            renderItem={({item}) => <OrderCard order={item}/>}
                        />
                    </OrdersContext.Provider>
                </View>
                :
                <View style={styles.inactiveScreen}>
                    <Text style={styles.inactiveText}>Toggle the Switch ;)</Text>
                    <Image source={require('../assets/desert.png')} style={styles.inactiveImage}/>
                </View>
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    inactiveScreen: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    inactiveText:{
        fontFamily: 'Montserrat',
        fontWeight: '600',
        fontSize: 30,
        color: '#000000',
        alignSelf: 'center',
        marginVertical: '20%'
    },
    inactiveImage: {
        alignSelf: 'center',
        height: '50%'
    },
    activeOrdersText: {
        fontFamily: 'Montserrat',
        fontWeight: '600',
        fontSize: 44,
        color: '#000000',
        marginBottom: '5%',
    }
});

export default OrdersPage;


