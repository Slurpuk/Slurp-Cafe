import React from 'react';
import {SafeAreaView} from 'react-native';
import SECTIONS from "./fake-data/OrderTabSectionsData";
import OrdersTab from "./components/OrdersTab";


const OrdersTabTester = () => {
  return (
    <SafeAreaView style={{marginTop: '40%'}}>
      <OrdersTab SECTIONS={SECTIONS}/>
    </SafeAreaView>
  );
};

export default OrdersTabTester;
