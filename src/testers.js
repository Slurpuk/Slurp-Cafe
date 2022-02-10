import React, {useState} from 'react';
import {SafeAreaView} from "react-native";
import OrdersTab from "./components/OrdersTab";
import OrderTabSectionsData from "./fake-data/OrderTabSectionsData";



const OrdersTabTester = () => {
    return (
        <SafeAreaView>
            <OrdersTab SECTIONS={OrderTabSectionsData}/>
        </SafeAreaView>
    );
};

export default OrdersTabTester;
