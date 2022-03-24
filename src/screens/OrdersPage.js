import React, {useEffect, useContext, useRef, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import SECTIONS from '../data/OrderTabSectionsData';
import OrdersTab from '../components/OrdersTab';
import OrderCard from '../components/orders/OrderCard';
import mapper from '../helpers/mapper';
import TabStatuses from '../data/TabStatuses';
import TopBar from "../components/TopBar";
import firestore from "@react-native-firebase/firestore";
import firebase from "@react-native-firebase/app";
import OrderStatuses from "../data/OrderStatuses";
import {GlobalContext} from '../../App';
import calculateTime from "./etaLogic";

export const OrdersContext = React.createContext();

const OrdersPage = ({navigation}) => {
    const globalContext = useContext(GlobalContext);
    const [orders, setOrders] = useState([]);
    const currTabStatus = useRef(TabStatuses.ALL);
    const [tabStatus, setTabStatus] = useState(currTabStatus.current)
    const [currentOrders, setCurrentOrders] = useState([]);
    const [receivingOrders, setReceivingOrders] = useState();

    useEffect(() => {
        updateCurrentOrders();
    }, [tabStatus, orders]);

    function changeTabStatus(status){
        currTabStatus.current = status;
        setTabStatus(status);
    }

    useEffect(() => {
        const subscriber = firestore()
            .collection('Orders')
            .where('ShopID', '==', globalContext.coffeeShopRef)
            .onSnapshot(async querySnapshot => {
                let newOrders = [];
                await Promise.all(querySnapshot.docs.map(async documentSnapshot => {
                    const firebaseOrder = documentSnapshot.data();
                    let newItems = [];
                    await Promise.all(firebaseOrder.Items.map(async item => {
                        await firestore().collection(item.Type + 's').doc(item.ItemRef).get().then(
                            (retrievedItem) => {
                                let newItem = retrievedItem.data();
                                newItems.push({...newItem, amount: item.Quantity});
                                firebaseOrder.Items = newItems;
                            })
                            .catch(error => console.log(error))
                    })).then(async () => {
                        await firestore().collection('Users').doc(firebaseOrder.UserID).get().then(
                            (retrievedUser) => {
                                let user = retrievedUser.data();
                                firebaseOrder.user = user;
                                let newOrder = {
                                    ...firebaseOrder,
                                    key: documentSnapshot.id,
                                }
                                newOrders.push(newOrder);
                            }).catch(error => console.log(error))
                    }).catch(error => console.log(error))
                })).then(r => {
                    setOrders(newOrders)
                    updateCurrentOrders(newOrders);
                })
            });

        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, []);

    async function setOrderStatus(order, status){
        // Update status in backend
        await firestore().collection('Orders').doc(order.key).update({
            Status: status
        }).then(r =>{
            updateCurrentOrders();
            console.log('status updated')})
    }

    // Filters which orders to display
    function updateCurrentOrders(newOrders = null){
        let ordersList = newOrders === null ? orders: newOrders;
        if (currTabStatus.current === TabStatuses.ALL){
            let excluded = mapper(TabStatuses.FINISHED);
            setCurrentOrders(ordersList.filter(order => excluded.indexOf(order.Status) === -1));
        }
        else {
            let target = mapper(currTabStatus.current);
            let result = ordersList.filter(order => target.indexOf(order.Status) !== -1);
            setCurrentOrders(result);
        }
    }

    return (
        <OrdersContext.Provider
            value={{
                orders: orders,
                setOrderStatus: setOrderStatus,
                setTabStatus: changeTabStatus,
            }}
        >
            <View style={styles.ordersContainer}>
                <TopBar receivingOrders={receivingOrders} setReceivingOrders={setReceivingOrders} navigation={navigation}/>
                <Text style={styles.activeOrdersText}>Active orders</Text>
                <OrdersTab SECTIONS={SECTIONS} setStatus={changeTabStatus}/>
                <FlatList
                    data={currentOrders}
                    renderItem={({item}) => <OrderCard order={item}/>}
                    contentContainerStyle={styles.ordersListContainer}
                    style={styles.ordersList}
                />
            </View>
        </OrdersContext.Provider>
    );
};

const styles = StyleSheet.create({
    activeOrdersText: {
        fontFamily: 'Montserrat',
        fontWeight: '600',
        fontSize: 44,
        color: '#000000',
        marginTop: '5%',
        marginLeft: '6%',

    },
    ordersList:{
        marginTop: '5%',
        marginBottom: '4%',
    },

    ordersListContainer:{
        paddingHorizontal: '5%',
    },

    ordersContainer:{
        backgroundColor: 'white',
        flex: 1,
    },

});

export default OrdersPage;


