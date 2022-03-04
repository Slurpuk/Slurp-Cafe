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
import firebase from "@react-native-firebase/app";


export const DetailsContext = React.createContext();

const OrderCard = ({order}) => {
  const [isExpanded, setExpanded] = useState(false);
  const [finished, setFinished] = useState(
    mapper(TabStatuses.FINISHED).includes(order.status),
  );
  const [statusColor, setStatusColor]=useState('#239DAD');
    const [userLatitude, setUserLatitude]=useState(0);
    const [userLongitude, setUserLongitude]=useState(0);
    const [locationUpdated, setLocationUpdated]=useState(false);
    const [displayTime, setDisplayTime]=useState(0);
    const [shopLatitude, setShopLatitude]=useState(0);
    const [shopLongitude, setShopLongitude]=useState(0);
  const orderUser=order.UserId.replace(/\s/g, '') ; // it has unneccesary spaces idk why

    useEffect(() => {
            const oneSecInterval=setInterval(() => {
                setDisplayTime(displayTime - 1);
                if(displayTime===0){
                    clearInterval(oneSecInterval);
                    setStatusColor('red');
                }
            }, 1000);
    }, [locationUpdated]);

    useEffect(() => {
            //console.log(userLatitude);
            //setUserLatitude(10);
            const curr = calculateTime(userLatitude, userLongitude,shopLatitude ,shopLongitude)
            if (curr !== displayTime){
                setDisplayTime(curr);
                setLocationUpdated(!locationUpdated)
            }

    }, [userLatitude,userLongitude,shopLatitude,shopLongitude]);


    useEffect(() => {
        const subscriber = firestore().doc('Users/' + orderUser).onSnapshot(querySnapshot => {
            const user = querySnapshot;
            //console.log(user.data().Latitude);
            setUserLatitude(user.data().Latitude);
            //console.log(userLatitude);
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



    //console.log(displayTime);
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
