import React, {useEffect, useContext, useRef, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import SECTIONS from '../static-data/OrderTabSectionsData';
import OrdersTab from '../components/OrderManagement/OrdersTab/OrdersTab';
import OrderCard from '../components/OrderManagement/OrderCard/OrderCard';
import TabStatuses from '../static-data/TabStatuses';
import TopBar from '../components/ShopManagement/TopBar';
import firestore from '@react-native-firebase/firestore';
import {GlobalContext} from '../../App';
import {
  calculateTime,
  getFormattedOrders,
  mapper,
} from '../components/OrderManagement/helpers';
import {OrdersContext} from '../components/OrderManagement/contexts';
import EmptyListText from '../sub-components/EmptyListText';
import {emptyCurrentOrdersText, OrderStatuses} from '../static-data';
import textStyles from '../stylesheets/textStyles';

/**
 * Scales the size to the size of the screen
 * @param size of the object/component
 */
const OrdersPage = ({navigation}) => {
  const globalContext = useContext(GlobalContext);
  const shopLocation = globalContext.coffeeShopObj.location;
  const orders = useRef([]); // The full list of orders received and required by the shop
  console.log(orders);
  const numIncomingOrders = useRef(0); // The number of pending orders
  const currTabStatus = useRef(TabStatuses.INCOMING); // Status of current tab selected
  const [targetUsers, setTargetUsers] = useState([]); // List of users having an order in the shop
  const [currentOrders, setCurrentOrders] = useState([]); // List of orders to render in current tab

  /**
   * Side effect that listens to changes in orders sent to the shop, fetches them and formats them.
   * @returns subscriber The function to run when the component unmount to unsubscribe
   */
  useEffect(() => {
    const subscriber = firestore()
      .collection('orders')
      .where('shop', '==', globalContext.coffeeShopRef)
      .where('is_displayed', '==', true) // Is the order required by the shop (not removed)
      .onSnapshot(async querySnapshot => {
        let formattedOrders = await getFormattedOrders(
          querySnapshot.docs,
          shopLocation,
        );
        orders.current = formattedOrders;
        numIncomingOrders.current = formattedOrders.filter(
          order => order.status === OrderStatuses.INCOMING,
        ).length;
        setTargetUsers(orders.current.map(order => order.user.email));
        updateCurrentOrders(formattedOrders);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  /**
   * Side effect that listens to changes in users currently having an order at the shop,
   * fetches them and updates accordingly.
   * @returns subscriber The function to run when the component unmount to unsubscribe
   */
  useEffect(() => {
    let target = targetUsers.length === 0 ? ['empty'] : targetUsers;
    const subscriber = firestore()
      .collection('users')
      .where('email', 'in', target)
      .onSnapshot(querySnapShot => {
        querySnapShot.forEach(doc => {
          let updatedUser = doc.data();
          orders.current = orders.current.map(order =>
            order.user.email === updatedUser.email
              ? {
                  ...order,
                  user: updatedUser,
                  eta: calculateTime(
                    updatedUser.location._latitude,
                    updatedUser.location._longitude,
                    shopLocation.latitude,
                    shopLocation.longitude,
                  ),
                }
              : order,
          );
        });
        updateCurrentOrders();
      });
    return () => subscriber();
  }, [targetUsers]);

  /**
   * Changes the current tab status and updates the current orders
   * @param status The new status
   */
  function changeTabStatus(status) {
    currTabStatus.current = status;
    updateCurrentOrders();
  }

  /**
   * Sort the current orders in ascending order of ETA and sets the state.
   * @param currOrders The current orders to display
   */
  function sortCurrentOrders(currOrders = null) {
    let result = currOrders === null ? currentOrders : currOrders;
    result.sort((a, b) => (a.eta > b.eta ? 1 : -1));
    setCurrentOrders(result);
  }

  /**
   * Filters which orders to display depending on the current ta status
   * @param newOrders Additional list of new orders (if newly fetched from the database)
   */
  function updateCurrentOrders(newOrders = null) {
    let ordersList = newOrders === null ? orders.current : newOrders;
    let result;
    if (currTabStatus.current === TabStatuses.ALL) {
      let excluded = mapper(TabStatuses.FINISHED);
      result = ordersList.filter(
        order => excluded.indexOf(order.status) === -1,
      );
    } else {
      let target = mapper(currTabStatus.current);
      result = ordersList.filter(order => target.indexOf(order.status) !== -1);
    }
    sortCurrentOrders(result);
  }

  return (
    <OrdersContext.Provider
      value={{
        orders: orders.current,
        numIncomingOrders: numIncomingOrders.current,
        tabStatus: currTabStatus.current,
      }}
    >
      <View style={styles.ordersContainer}>
        <TopBar navigation={navigation} />
        <Text style={textStyles.headingText}>
          {currTabStatus.current} orders
        </Text>
        <OrdersTab SECTIONS={SECTIONS} setStatus={changeTabStatus} />
        <FlatList
          data={currentOrders}
          renderItem={({item}) => <OrderCard order={item} />}
          contentContainerStyle={styles.ordersListContainer}
          style={styles.ordersList}
          ListEmptyComponent={<EmptyListText text={emptyCurrentOrdersText} />}
        />
      </View>
    </OrdersContext.Provider>
  );
};

const styles = StyleSheet.create({
  ordersList: {
    marginTop: '5%',
    marginBottom: '4%',
  },

  ordersListContainer: {
    paddingHorizontal: '5%',
  },

  ordersContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
});

export default OrdersPage;
