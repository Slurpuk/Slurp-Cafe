/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useContext, useEffect, useMemo, useState} from 'react';
import {Dimensions, View} from 'react-native';
import ReducedOrder from './ReducedOrder';
import ExpandedOrder from './ExpandedOrder';
import mapper from './mapper';
import TabStatuses from './TabStatuses';
import calculateTime from "../screens/etaLogic";
import firestore from "@react-native-firebase/firestore";
import AnimatedCard from "../sub-components/AnimatedCard";
import {GlobalContext} from "../../App";
import {OrdersContext} from "../screens/OrdersPage";
export const DetailsContext = React.createContext();

const OrderCard = ({order, setETA}) => {
    const context = useContext(GlobalContext);
    const orderContext = useContext(OrdersContext);
    const [statusColor, setStatusColor]=useState('#239DAD');
    const [userLocation, setUserLocation] = useState({latitude: order.user.latitude, longitude: order.user.longitude})
    const ETA = useMemo(() => refreshETA(), [userLocation]);
    const initialHeight = Dimensions.get('window').height * 0.14;

    function isFinished(){
        return mapper(TabStatuses.FINISHED).includes(order.Status)
    }

    function calcTime(){
        return calculateTime(userLocation.latitude, userLocation.longitude,context.coffeeShopObj.Location._latitude ,context.coffeeShopObj.Location._longitude)
    }

    function refreshETA(){
        let res = calcTime()
        if(res <= 5){
            setStatusColor('red');
        }
        else{
            setStatusColor('#239DAD');
        }
        if(order.eta !== res) setETA(order, res);
        return res;
    }

    useEffect(() => {
        const subscriber = firestore().doc('Users/' + order.UserID).onSnapshot(querySnapshot => {
            const user = querySnapshot.data()
            setUserLocation({latitude: user.latitude, longitude: user.longitude});
        });
        return () => subscriber();
    }, []);

  return (
    <View style={{marginVertical: '1%'}}>
      <DetailsContext.Provider
        value={{
          order: order,
            timerCount:ETA ,
            statusColor:statusColor,
            isFinished: isFinished,
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


