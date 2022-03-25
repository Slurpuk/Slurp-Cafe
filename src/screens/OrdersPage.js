import React, {useEffect, useContext, useRef, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import SECTIONS from '../static-data/OrderTabSectionsData';
import OrdersTab from '../components/OrderManagement/OrdersTab/OrdersTab';
import OrderCard from '../components/OrderManagement/OrderCard/OrderCard';
import TabStatuses from '../static-data/TabStatuses';
import TopBar from "../components/ShopManagement/TopBar";
import firestore from "@react-native-firebase/firestore";
import {GlobalContext} from '../../App';
import {calculateTime, mapper} from "../components/OrderManagement/helpers";
import {OrdersContext} from "../components/OrderManagement/contexts";
import EmptyListText from "../sub-components/EmptyListText";
import {emptyCurrentOrdersText} from "../static-data";


const OrdersPage = ({navigation}) => {
    const globalContext = useContext(GlobalContext);
    const shopLocation = {latitude: globalContext.coffeeShopObj.Location._latitude,
        longitude: globalContext.coffeeShopObj.Location._longitude}
    const orders = useRef([]); // The full list of orders received and required by the shop
    const numIncomingOrders = useRef(0); // The number of pending orders
    const currTabStatus = useRef(TabStatuses.INCOMING); // Current tab selected
    const [targetUsers, setTargetUsers] = useState([]); // List of users having an order in the shop
    const [currentOrders, setCurrentOrders] = useState([]); // List of orders to render in current tab

    useEffect(() => {
        const subscriber = firestore()
            .collection('Orders')
            .where('ShopID', '==', globalContext.coffeeShopRef)
            .where('IsRequired', '==', true)
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
                                let newOrder = {
                                    ...firebaseOrder,
                                    eta: calculateTime(user.latitude, user.longitude, shopLocation.latitude, shopLocation.longitude),
                                    key: documentSnapshot.id,
                                }
                                newOrders.push(newOrder);
                            }).catch(error => console.log(error))
                    }).catch(error => console.log(error))
                })).then(r => {
                    numIncomingOrders.current = newOrders.filter(order => order.Status === 'incoming').length
                    orders.current = newOrders;
                    setTargetUsers(orders.current.map(order => order.user.Email));
                    updateCurrentOrders(newOrders);
                })
            });

        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, []);

    useEffect(() => {
        let target = targetUsers.length === 0 ? ['empty']: targetUsers;
        const subscriber = firestore()
            .collection('Users')
            .where('Email', 'in', target)
            .onSnapshot(querySnapShot => {
                querySnapShot.forEach(doc => {
                    let updatedUser = doc.data();
                    orders.current = orders.current.map(order => order.user.Email === updatedUser.Email ?
                        {...order,
                            user: updatedUser,
                            eta: calculateTime(updatedUser.latitude, updatedUser.longitude, shopLocation.latitude, shopLocation.longitude),
                        }
                        : order)
                })
                updateCurrentOrders();
            })
        return () => subscriber();
    }, [targetUsers])


    function changeTabStatus(status){
        currTabStatus.current = status;
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
        <OrdersContext.Provider value={{orders: orders.current, numIncomingOrders: numIncomingOrders.current}}>
            <View style={styles.ordersContainer}>
                <TopBar navigation={navigation}/>
                <Text style={styles.activeOrdersText}>{currTabStatus.current} orders</Text>
                <OrdersTab SECTIONS={SECTIONS} setStatus={changeTabStatus}/>
                <FlatList
                    data={currentOrders}
                    renderItem={({item}) => <OrderCard order={item}/>}
                    contentContainerStyle={styles.ordersListContainer}
                    style={styles.ordersList}
                    ListEmptyComponent={<EmptyListText text={emptyCurrentOrdersText}/>}
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


