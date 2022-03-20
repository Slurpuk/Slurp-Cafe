import React, {useContext, useEffect, useState} from 'react';
import {FlatList, Text, View, StyleSheet} from 'react-native';
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
    const [orders, setOrders] = useState([]);
    const [currentStatus, setCurrentStatus] = useState(TabStatuses.ALL);
    const [currentOrders, setCurrentOrders] = useState([]);
    const [receivingOrders, setReceivingOrders] = useState(true);
    const [currentShop, setCurrentShop] = useState(null);
    const globalContext = useContext(GlobalContext);

    useEffect(() => {
        firestore().doc('CoffeeShop/' + globalContext.coffeeShopRef).onSnapshot(querySnapshot => {
            const shop = querySnapshot;
            setCurrentShop(shop);
        });
        //console.log(currentShop);
    }, [])


    useEffect(() => {
        updateOrders();
    }, [currentStatus]);

    useEffect(() => {
        const subscriber = firestore()
            .collection('Orders')
            .onSnapshot(querySnapshot => {
                const currentOrders = [];
                const orders = [];

                querySnapshot.forEach(documentSnapshot => {
                    const ShopID = documentSnapshot.data().ShopID;
                    if(ShopID.includes(globalContext.coffeeShopRef)){
                        currentOrders.push({
                            ...documentSnapshot.data(),
                            key: documentSnapshot.id,
                        });
                        orders.push({
                            ...documentSnapshot.data(),
                            key: documentSnapshot.id,
                        });
                    }
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
            firebase.firestore().collection('Orders').doc(order.key).delete().then(r => console.log('order removed'))
        } else {
            firebase.firestore().collection('Orders').doc(order.key).update({
                Status: status
            }).then(r => console.log('status updated'))
        }

        setOrders(current);
        updateOrders();
    };

    const updateOrders = () => {
        if (currentStatus === TabStatuses.ALL) setCurrentOrders(orders);
        else {
            let target = mapper(currentStatus);
            setCurrentOrders(orders.filter(order => target.indexOf(order.Status) !== -1));
        }
    };

    return (
        <View style={{height: '100%'}}>
            <TopBar navigation={navigation} receivingOrders={receivingOrders} setReceivingOrders={setReceivingOrders} currentShop={currentShop}/>
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
                            renderItem={({item}) => item.Status === OrderStatuses.INCOMING ?
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
        </View>
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


