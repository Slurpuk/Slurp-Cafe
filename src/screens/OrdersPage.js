import React, {useState, createContext} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import SECTIONS from "../fake-data/OrderTabSectionsData";
import OrdersTab from "../components/OrdersTab";
import OrderCard from "../components/OrderCard";
import TopBar from "../components/TopBar"
import OrdersData from "../fake-data/OrdersData";
import OrderTabSectionsData from "../fake-data/OrderTabSectionsData";
import OrderStatuses from "../components/OrderStatuses";

const OrdersContext = React.createContext();
const OrdersPage = () => {

    const[orders, setOrders] = useState(OrdersData);
    const[selectedOrderType, setSelectedOrderType] = useState(SECTIONS[0])

    function updateOrder(newStatus, order){
        setOrders(prevState => {
            prevState.find(o => o.key === order.key).status = newStatus
            return prevState
        })
    }

    function filterOrders() {
        switch(selectedOrderType){
            case 'all':
                return orders
            case 'incoming':
                return orders.filter(item => item.status === OrderStatuses.EXPANDED || item.status === OrderStatuses.INCOMING)
            case 'rejected':
                return []
            default: return orders.filter(item => item.status === selectedOrderType)
        }
    }

    return (
        <SafeAreaView style={{display: 'flex', height: '100%'}}>
            <TopBar/>
            <View style={{padding: '5%'}}>
                <Text style={styles.activeOrdersText}>Active orders</Text>
                <OrdersContext.Provider value={orders}>
                    <OrdersTab SECTIONS={SECTIONS} setSelectedOrderType={setSelectedOrderType}/>
                    <FlatList data={filterOrders()} renderItem={({item}) => (
                        <OrderCard order={item} updateOrder={updateOrder}/>
                    )}/>
                </OrdersContext.Provider>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    activeOrdersText: {
        fontFamily: 'Montserrat',
        fontWeight: '600',
        fontSize: 44,
        color: '#000000',
        marginBottom: '5%',
    }
});

export default OrdersPage;
