import React, {useState} from 'react';
import {FlatList, SafeAreaView, ScrollView} from 'react-native';
import SECTIONS from "./fake-data/OrderTabSectionsData";
import OrdersTab from "./components/OrdersTab";
import OrderCard from "./components/OrderCard";
import OrderStatuses from "./components/OrderStatuses";
import OrdersData from "./fake-data/OrdersData"


const OrdersTabTester = () => {

    const [orderType, setOrderType] = useState('all')
    const [orders, setOrders] = useState(OrdersData);
    const [currentStatus, setCurrentStatus] = useState(OrderStatuses.ALL)

    console.log(currentStatus);

  return (
    <SafeAreaView style={{marginTop: '5%'}}>
      <OrdersTab SECTIONS={SECTIONS} setStatus={setCurrentStatus}/>
          <FlatList data={orders} renderItem={({item}) => (
              <OrderCard orderType={OrderStatuses.INCOMING} order={item}/>
              )}
          style={{padding: '5%'}}/>
    </SafeAreaView>
  );
};

export default OrdersTabTester;
