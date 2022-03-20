import React, {useEffect, useContext, useRef, useState} from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';
import SECTIONS from '../fake-data/OrderTabSectionsData';
import OrdersTab from '../components/OrdersTab';
import OrderCard from '../components/OrderCard';
import mapper from '../components/mapper';
import TabStatuses from '../components/TabStatuses';
import TopBar from "../components/TopBar";
import firestore from "@react-native-firebase/firestore";
import firebase from "@react-native-firebase/app";
import OrderStatuses from "../components/OrderStatuses";
import {GlobalContext} from '../../App';

export const OrdersContext = React.createContext();

const OrdersPage = ({navigation}) => {
    const globalContext = useContext(GlobalContext);
    const [orders, setOrders] = useState([]);
    const currTabStatus = useRef(TabStatuses.ALL);
    const [tabStatus, setTabStatus] = useState(currTabStatus.current)
    const [currentOrders, setCurrentOrders] = useState([]);
    const [receivingOrders, setReceivingOrders] = useState(true);
    const [currentShop, setCurrentShop] = useState(globalContext.coffeeShopObj);

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
            .onSnapshot(querySnapshot => {
                let oldOrders
                let newOrders = [];
                querySnapshot.forEach(async documentSnapshot => {
                    const firebaseOrder = documentSnapshot.data();
                    const ShopID = firebaseOrder.ShopID;
                    if(ShopID === globalContext.coffeeShopRef){
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
                                    firebaseOrder.user = retrievedUser.data();
                                    let newOrder = {
                                        ...firebaseOrder,
                                        key: documentSnapshot.id,
                                    }
                                    newOrders.push(newOrder);
                                }).then(() => {
                                    setOrders(newOrders)
                                    updateCurrentOrders(newOrders);
                            }).catch(error => console.log(error))
                        })
                            .catch(error => console.log(error))
                    }
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
                currentShop: currentShop,
            }}
        >
        <>
            <TopBar receivingOrders={receivingOrders} setReceivingOrders={setReceivingOrders} currentShop={currentShop} navigation={navigation}/>
                        <Text style={styles.activeOrdersText}>Active orders</Text>
                        <OrdersTab SECTIONS={SECTIONS} setStatus={changeTabStatus}/>
                        <FlatList
                            data={currentOrders}
                            renderItem={({item}) => <OrderCard order={item}/>}
                            contentContainerStyle={styles.ordersList}
                        />
        </>
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
        padding: '5%',
    },

    ordersContainer:{
        padding: '5%',
    },

});

export default OrdersPage;


