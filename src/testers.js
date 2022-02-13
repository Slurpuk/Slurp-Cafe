import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import SECTIONS from './fake-data/OrderTabSectionsData';
import OrdersTab from './components/OrdersTab';
import OrderCard from './components/OrderCard';
import OrdersData from './fake-data/OrdersData';
import mapper from './components/mapper';
import TabStatuses from './components/TabStatuses';

export const OrdersContext = React.createContext();

const OrdersTabTester = () => {
  const [orders, setOrders] = useState(OrdersData);
  const [currentStatus, setCurrentStatus] = useState(TabStatuses.ALL);
  const [currentOrders, setCurrentOrders] = useState(OrdersData);

  const setOrderStatus = (order, status) => {
    let index = orders.indexOf(order);
    let current = orders;
    current[index].status = status;
    setOrders(current);
    updateOrders();
  };

  const updateOrders = () => {
    if (currentStatus === TabStatuses.ALL) setCurrentOrders(orders);
    else {
      let target = mapper(currentStatus);
      setCurrentOrders(orders.filter(or => target.indexOf(or.status) !== -1));
    }
  };

  useEffect(() => {
    updateOrders();
  }, [currentStatus]);

  return (
    <SafeAreaView style={{marginTop: '5%'}}>
      <OrdersContext.Provider
        value={{
          orders: orders,
          setOrderStatus: setOrderStatus,
          updateOrders: updateOrders,
        }}
      >
        <OrdersTab SECTIONS={SECTIONS} setStatus={setCurrentStatus} />
        <FlatList
          data={currentOrders}
          renderItem={({item}) => <OrderCard order={item} />}
          style={{padding: '5%'}}
          // extraData={currentStatus}
        />
      </OrdersContext.Provider>
    </SafeAreaView>
  );
};

export default OrdersTabTester;
