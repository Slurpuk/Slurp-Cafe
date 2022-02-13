import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import SECTIONS from "../fake-data/OrderTabSectionsData";
import OrdersTab from "../components/OrdersTab";
import OrderCard from "../components/OrderCard";
import OrderStatuses from "../components/OrderStatuses";
import TopBar from "../components/TopBar"


const OrdersPage = () => {
    return (
        <SafeAreaView style={{display: 'flex', height: '100%'}}>
            <TopBar/>
            <View style={{padding: '5%'}}>
                <Text style={styles.activeOrdersText}>Active orders</Text>
                <OrdersTab SECTIONS={SECTIONS}/>
                <OrderCard orderType={OrderStatuses.INCOMING}/>
                <OrderCard orderType={OrderStatuses.INCOMING}/>
                <OrderCard orderType={OrderStatuses.INCOMING}/>
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
