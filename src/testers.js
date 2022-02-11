import React from 'react';
import {SafeAreaView} from 'react-native';
import SECTIONS from "./fake-data/OrderTabSectionsData";
import OrdersTab from "./components/OrdersTab";
import OrderCard from "./components/OrderCard";
import OrderStatuses from "./components/OrderStatuses";


const OrdersTabTester = () => {
  return (
    <SafeAreaView style={{marginTop: '40%'}}>
      <OrdersTab SECTIONS={SECTIONS}/>
        <OrderCard orderType={OrderStatuses.INCOMING}/>
        <OrderCard orderType={OrderStatuses.INCOMING}/>
        <OrderCard orderType={OrderStatuses.INCOMING}/>
    </SafeAreaView>
  );
};

export default OrdersTabTester;
