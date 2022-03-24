import React, {useEffect, useContext, useRef, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import SECTIONS from '../fake-data/OrderTabSectionsData';
import OrdersTab from '../components/OrdersTab';
import OrderCard from '../components/OrderCard';
import mapper from '../components/mapper';
import TabStatuses from '../components/TabStatuses';
import TopBar from "../components/TopBar";
import firestore from "@react-native-firebase/firestore";
import {GlobalContext} from '../../App';
import calculateTime from "./etaLogic";

export const OrdersContext = React.createContext();

const OrdersPage = ({navigation}) => {
    const globalContext = useContext(GlobalContext);
    const orders = useRef([]);
    const currTabStatus = useRef(TabStatuses.INCOMING);
    const [tabStatus, setTabStatus] = useState(currTabStatus.current)
    const [currentOrders, setCurrentOrders] = useState([]);
    const [receivingOrders, setReceivingOrders] = useState();
    const numIncomingOrders = useRef(0);

    useEffect(() => {
        numIncomingOrders.current = orders.current.filter(order => order.Status === 'incoming').length
        updateCurrentOrders();
    }, [tabStatus]);

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
                                newItems.push({...newItem, amount: item.Quantity, options: item.Options});
                                firebaseOrder.Items = newItems;
                            })
                            .catch(error => console.log(error))
                    })).then(async () => {
                        await firestore().collection('Users').doc(firebaseOrder.UserID).get().then(
                            (retrievedUser) => {
                                let user = retrievedUser.data();
                                firebaseOrder.user = user;
                                const shoplat =  globalContext.coffeeShopObj.Location._latitude;
                                const shoplong = globalContext.coffeeShopObj.Location._longitude;
                                let newOrder = {
                                    ...firebaseOrder,
                                    eta: calculateTime(user.latitude, user.longitude, shoplat, shoplong),
                                    key: documentSnapshot.id,
                                }
                                newOrders.push(newOrder);
                            }).catch(error => console.log(error))
                    }).catch(error => console.log(error))
                })).then(r => {
                    numIncomingOrders.current = newOrders.filter(order => order.Status === 'incoming').length
                    orders.current = newOrders;
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
            console.log('status updated')})
    }

    function setOrderETA(target, newETA){
        orders.current = orders.current.map(order => order.key === target.key ? {...order, eta: newETA}: order);
        updateCurrentOrders();
    }

    // Sort the current orders in ascending order of ETA and sets the state.
    function sortCurrentOrders(currOrders=null){
        let result = currOrders === null ? currentOrders: currOrders;
        result.sort((a, b) => (a.eta > b.eta) ? 1 : -1)
        setCurrentOrders(result);
    }

    // Filters which orders to display
    function updateCurrentOrders(newOrders = null){
        let ordersList = newOrders === null ? orders.current: newOrders;
        let result = [];
        if (currTabStatus.current === TabStatuses.ALL){
            let excluded = mapper(TabStatuses.FINISHED);
            result = ordersList.filter(order => excluded.indexOf(order.Status) === -1);
        }
        else {
            let target = mapper(currTabStatus.current);
            result = ordersList.filter(order => target.indexOf(order.Status) !== -1);
        }
        sortCurrentOrders(result);
    }

    return (
        <OrdersContext.Provider
            value={{
                orders: orders,
                setOrderStatus: setOrderStatus,
                numIncomingOrders: numIncomingOrders.current,
            }}
        >
            <View style={styles.ordersContainer}>
                <TopBar receivingOrders={receivingOrders} setReceivingOrders={setReceivingOrders} navigation={navigation}/>
                <Text style={styles.activeOrdersText}>{tabStatus} orders</Text>
                <OrdersTab SECTIONS={SECTIONS} setStatus={changeTabStatus}/>
                <FlatList
                    data={currentOrders}
                    renderItem={({item}) => <OrderCard order={item} setETA={setOrderETA}/>}
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


