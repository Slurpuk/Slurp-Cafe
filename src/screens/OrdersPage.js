import React, {useEffect, useContext, useRef, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import SECTIONS from '../static-data/OrderTabSectionsData';
import OrdersTab from '../components/OrderManagement/OrdersTab/OrdersTab';
import OrderCard from '../components/OrderManagement/OrderCard/OrderCard';
import TabStatuses from '../static-data/TabStatuses';
import TopBar from "../components/ShopManagement/TopBar";
import firestore from "@react-native-firebase/firestore";
import {GlobalContext} from '../../App';
import {calculateTime} from "../components/OrderManagement/helpers";
import {OrdersContext} from "../components/OrderManagement/contexts";
import EmptyListText from "../sub-components/EmptyListText";
import {emptyCurrentOrdersText} from "../static-data";
import {styles} from "./stylesheets/OrdersPage";
import {
    changeTabStatus,
    removeOrder, setOrderETA,
    setOrderStatus,
    updateCurrentOrders,
    updateFinishedTime
} from "./helpers/functions";

const OrdersPage = ({navigation}) => {
    const globalContext = useContext(GlobalContext);
    const shopLocation = {latitude: globalContext.coffeeShopObj.Location._latitude,
        longitude: globalContext.coffeeShopObj.Location._longitude}
    const orders = useRef([]);
    const [targetUsers, setTargetUsers] = useState([]);
    const numIncomingOrders = useRef(0);
    const [currTabStatus, setCurrTabStatus] = useState(TabStatuses.INCOMING);
    const [tabStatus, setTabStatus] = useState(currTabStatus.current)
    const [currentOrders, setCurrentOrders] = useState([]);
    const [receivingOrders, setReceivingOrders] = useState();

    useEffect(() => {
        numIncomingOrders.current = orders.current.filter(order => order.Status === 'incoming').length
        updateCurrentOrders(null, orders, currTabStatus, setCurrentOrders);
    }, [tabStatus]);

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
                    updateCurrentOrders(newOrders, orders, currTabStatus, setCurrentOrders);
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
                updateCurrentOrders(null, orders, currTabStatus, setCurrentOrders);
            })
        return () => subscriber();
    }, [targetUsers])

    return (
        <OrdersContext.Provider
            value={{
                orders: orders.current,
                setOrderStatus: (order, status) => setOrderStatus(order, status, orders, currTabStatus, setCurrentOrders),
                numIncomingOrders: numIncomingOrders.current,
                updateFinishedTime: (order) => updateFinishedTime(order),
                removeOrder: (order) => removeOrder(order),
            }}
        >
            <View style={styles.ordersContainer}>
                <TopBar receivingOrders={receivingOrders} setReceivingOrders={setReceivingOrders} navigation={navigation}/>
                <Text style={styles.activeOrdersText}>{tabStatus} orders</Text>
                <OrdersTab SECTIONS={SECTIONS} setStatus={(status) => changeTabStatus(status, currTabStatus, setCurrTabStatus, setTabStatus)}/>
                <FlatList
                    data={currentOrders}
                    renderItem={({item}) => <OrderCard order={item} setETA={(target, newETA) => setOrderETA(target, newETA, orders, currTabStatus, setCurrentOrders)}/>}
                    contentContainerStyle={styles.ordersListContainer}
                    style={styles.ordersList}
                    ListEmptyComponent={<EmptyListText text={emptyCurrentOrdersText}/>}
                />
            </View>
        </OrdersContext.Provider>
    );
};


export default OrdersPage;


