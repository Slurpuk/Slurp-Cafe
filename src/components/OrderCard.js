/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {Pressable, View} from 'react-native';
import ReducedOrder from './ReducedOrder';
import ExpandedOrder from './ExpandedOrder';
import mapper from './mapper';
import TabStatuses from './TabStatuses';
import calculateTime from "../screens/etaLogic";
import firestore from "@react-native-firebase/firestore";
export const DetailsContext = React.createContext();

const OrderCard = ({order}) => {
  const [isExpanded, setExpanded] = useState(false);
  const [finished, setFinished] = useState(
    mapper(TabStatuses.FINISHED).includes(order.status),
  );
  const [statusColor, setStatusColor]=useState('#239DAD');
    const [userLatitude, setUserLatitude]=useState(0);
    const [userLongitude, setUserLongitude]=useState(0);
    const [displayTime, setDisplayTime]=useState(0);
    const [shopLatitude, setShopLatitude]=useState(0);
    const [shopLongitude, setShopLongitude]=useState(0);
  const orderUser=order.UserId.replace(/\s/g, '') ; // it has unneccesary spaces idk why

    useEffect(() => {
        const curr = calculateTime(userLatitude, userLongitude,shopLatitude ,shopLongitude)
        setDisplayTime(curr);
        if(curr===0){
            setStatusColor('red');
        }
        else{
            setStatusColor('#239DAD');
        }
    }, [userLatitude,userLongitude,shopLatitude,shopLongitude]);


    useEffect(() => {
        const subscriber = firestore().doc('Users/' + orderUser).onSnapshot(querySnapshot => {
            const user = querySnapshot;
            setUserLatitude(user.data().Latitude);
            setUserLongitude(user.data().Longitude);
        });
        return () => subscriber();
    }, []);

    useEffect(() => {
        const subscriber =firestore().doc('CoffeeShop/' + order.CoffeeShopId.replace(/\s/g, '')).onSnapshot(querySnapshot => {
            const shop = querySnapshot;
            setShopLatitude(shop.data().Location.latitude);
            setShopLongitude(shop.data().Location.longitude);
        });
        return () => subscriber();
    }, []);

  const toggleExpanded = () => {
    setExpanded(!isExpanded);
  };

  return (
    <View>
      <DetailsContext.Provider
        value={{
          order: order,
            timerCount:displayTime ,
            statusColor:statusColor,
          isExpanded: isExpanded,
          setExpanded: setExpanded,
          isFinished: finished,
          setFinished: setFinished,
        }}
      >
        <Pressable onPress={() => toggleExpanded()}>
          {isExpanded ? <ExpandedOrder /> : <ReducedOrder />}
        </Pressable>
      </DetailsContext.Provider>
    </View>
  );
};

export default OrderCard;
