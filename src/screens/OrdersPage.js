import React, {useEffect, useContext, useRef, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import SECTIONS from '../static-data/OrderTabSectionsData';
import OrdersTab from '../components/OrderManagement/OrdersTab';
import OrderCard from '../components/OrderManagement/OrderCard/OrderCard';
import TabStatuses from '../static-data/TabStatuses';
import TopBar from "../components/ShopManagement/TopBar";
import firestore from "@react-native-firebase/firestore";
import {GlobalContext} from '../../App';
import {setOrderStatus, changeTabStatus, updateCurrentOrders} from "../helpers/functions";
import {orderPageStyles} from "../styles/OrdersPage";

export const OrdersContext = React.createContext();

const OrdersPage = ({navigation}) => {
    const globalContext = useContext(GlobalContext);
    const [orders, setOrders] = useState([]);
    const [currTabStatus, setCurrTabStatus] = useState(TabStatuses.ALL);
    const [tabStatus, setTabStatus] = useState(currTabStatus.current)
    const [currentOrders, setCurrentOrders] = useState([]);
    const [receivingOrders, setReceivingOrders] = useState();

    useEffect(() => {
        updateCurrentOrders(orders, currTabStatus, setCurrTabStatus, setCurrentOrders);
    }, [tabStatus, orders]);

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
                    updateCurrentOrders(newOrders, currTabStatus, setCurrTabStatus, setCurrentOrders);
                })
            });

        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, []);


    return (
        <OrdersContext.Provider
            value={{
                orders: orders,
                setOrderStatus: (order, status) => setOrderStatus(order, status, orders, currTabStatus, setCurrentOrders),
                setTabStatus: (status) => changeTabStatus(status, currTabStatus, setCurrTabStatus, setTabStatus),
            }}
        >
            <View style={orderPageStyles.ordersContainer}>
                <TopBar receivingOrders={receivingOrders} setReceivingOrders={setReceivingOrders} navigation={navigation}/>
                <Text style={orderPageStyles.activeOrdersText}>Active orders</Text>
                <OrdersTab SECTIONS={SECTIONS} setStatus={(status) => changeTabStatus(status, currTabStatus, setCurrTabStatus, setTabStatus)}/>
                <FlatList
                    data={currentOrders}
                    renderItem={({item}) => <OrderCard order={item}/>}
                    contentContainerStyle={orderPageStyles.ordersListContainer}
                    style={orderPageStyles.ordersList}
                />
            </View>
        </OrdersContext.Provider>
    );
};

export default OrdersPage;





