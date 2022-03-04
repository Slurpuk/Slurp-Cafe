import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, Text, View, StyleSheet, Image} from 'react-native';
import SECTIONS from '../fake-data/OrderTabSectionsData';
import OrdersTab from '../components/OrdersTab';
import OrderCard from '../components/OrderCard';
import mapper from '../components/mapper';
import TabStatuses from '../components/TabStatuses';
import TopBar from "../components/TopBar";
import firestore from "@react-native-firebase/firestore";
import firebase from "@react-native-firebase/app";
import OrderStatuses from "../components/OrderStatuses";
export const OrdersContext = React.createContext();
import calculateTime from "./etaLogic";

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [currentStatus, setCurrentStatus] = useState(TabStatuses.ALL);
    const [currentOrders, setCurrentOrders] = useState([]);
    const [receivingOrders, setReceivingOrders] = useState(true)
    const [currentShop, setCurrentShop] = useState(null)

    /*for (o of orders){
        console.log(o.UserId);
    }*/



    useEffect(() => {
        const getETA = () => {
            /*let userLatitude = 0;
            let userLongitude = 0;

            firestore()
                .collection('Users')
                .onSnapshot(querySnapshot => {
                    const user = [];
                    const finalUser = [];

                    querySnapshot.forEach(documentSnapshot => {
                        user.push({
                            ...documentSnapshot.data(),
                            key: documentSnapshot.id,
                        });
                        finalUser.push({
                            ...documentSnapshot.data(),
                            key: documentSnapshot.id,
                        });
                    });
                    userLatitude = finalUser.map(u => u.Latitude);
                    userLongitude = finalUser.map(u => u.Longitude);
                    console.log(userLongitude);

                    //currentShop.Latitude;
                });*/

        };
        getETA();
    }, []);




    useEffect(() => {
        firestore().doc('CoffeeShop/3ktdgIGsHcFkVLdQzSYx').onSnapshot(querySnapshot => {
            const shop = querySnapshot;
            //console.log(shop.map(u => u));
            setCurrentShop(shop);
        });
        //console.log(currentShop);
    }, [])


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
        // current[index].status = status;

        //let documentPath = firebase.firestore().collection('FakeOrder').find('7KDVQqdQjuUzVLyWVmVE')
        if (status === OrderStatuses.REJECTED) {
            firebase.firestore().collection('FakeOrder').doc('7KDVQqdQjuUzVLyWVmVE').delete().then(r => console.log('order removed'))
        } else {
            firebase.firestore().collection('FakeOrder').doc('7KDVQqdQjuUzVLyWVmVE').update({
                status: status
            }).then(r => console.log('status updated'))
        }

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
            <TopBar receivingOrders={receivingOrders} setReceivingOrders={setReceivingOrders} currentShop={currentShop}/>
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
                            renderItem={({item}) => item.status === OrderStatuses.INCOMING ?
                                (
                                    <OrderCard order={item}  data='#FFFFFF'/>
                                )
                                :
                                (
                                    <OrderCard order={item}  data='#F2F2F2'/>
                                )
                            }
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


