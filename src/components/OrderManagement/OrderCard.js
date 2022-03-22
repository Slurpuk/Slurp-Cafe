/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useContext, useEffect, useRef, useState} from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import ReducedOrder from './ReducedOrder';
import ExpandedOrder from './ExpandedOrder';
import mapper from '../../helpers/mapper';
import TabStatuses from '../../static-data/TabStatuses';
import calculateTime from "../../helpers/ETAFunctions";
import firestore from "@react-native-firebase/firestore";
import AnimatedCard from "../../sub-components/AnimatedCard";
import {OrdersContext} from "../../screens/OrdersPage";
export const DetailsContext = React.createContext();

const OrderCard = ({order}) => {
  const [finished, setFinished] = useState(
    mapper(TabStatuses.FINISHED).includes(order.Status),
  );
  const context = useContext(OrdersContext)
  const [statusColor, setStatusColor]=useState('#239DAD');
    const [userLatitude, setUserLatitude]=useState(0);
    const [userLongitude, setUserLongitude]=useState(0);
    const [displayTime, setDisplayTime]=useState(0);
    const shopLocation = useRef({latitude: 0, longitude: 0});
    const initialHeight = Dimensions.get('window').height * 0.14

    useEffect(() => {
        const curr = calculateTime(userLatitude, userLongitude,shopLocation.current.latitude ,shopLocation.current.longitude)
        setDisplayTime(curr);
        if(curr===0){
            setStatusColor('red');
        }
        else{
            setStatusColor('#239DAD');
        }
    }, [userLatitude,userLongitude]);

    useEffect(() => {
        const subscriber = firestore().doc('Users/' + order.UserID).onSnapshot(querySnapshot => {
            const user = querySnapshot.data()
            setUserLatitude(user.latitude);
            setUserLongitude(user.longitude);
        });
        return () => subscriber();
    }, []);

    useEffect(() => {
        const subscriber =firestore().doc('CoffeeShop/' + order.ShopID).onSnapshot(querySnapshot => {
            const shop = querySnapshot.data();
            shopLocation.current = {latitude: shop.Location.latitude, longitude: shop.Location.longitude}
        });
        return () => subscriber();
    }, []);

  return (
    <View style={{marginVertical: '1%'}}>
      <DetailsContext.Provider
        value={{
          order: order,
            timerCount:displayTime ,
            statusColor:statusColor,
          isFinished: finished,
          setFinished: setFinished,
        }}
      >
          <AnimatedCard
              collapsableContent={<ReducedOrder/>}
              hidableContent={<ExpandedOrder/>}
              initialHeight={initialHeight}/>
      </DetailsContext.Provider>
    </View>
  );
};

export default OrderCard;


