
import React, {useContext, useEffect, useMemo, useState} from 'react';
import firestore from "@react-native-firebase/firestore";
import {Alert, Dimensions} from 'react-native';
import ReducedOrder from './ReducedOrder';
import ExpandedOrder from './ExpandedOrder';
import AnimatedCard from "../../../sub-components/AnimatedCard";
import {GlobalContext} from "../../../../App";
import {calculateTime} from "../helpers";
import {OrderCardContext} from "../contexts";

/**
 * Order card displaying details for a single order.
 */
const OrderCard = ({order, setETA}) => {
    const context = useContext(GlobalContext);
    const [userLocation, setUserLocation] = useState({latitude: order.user.latitude, longitude: order.user.longitude})
    const [currStatus, setCurrStatus] = useState(order.Status); // Dynamic status of the order card
    const ETA = useMemo(() => refreshETA(), [userLocation]); // Memoized value refreshed every time the user location changes.
    const initialHeight = Dimensions.get('window').height * 0.14; // Initial height for the reduced order

    /**
     * Side effect executed on first render which subscribes to the backend user instance and listens to its changes.
     * Dynamically updates the user location.
     */
    useEffect(() => {
        try{
            const subscriber = firestore().doc('Users/' + order.UserID).onSnapshot(querySnapshot => {
                const user = querySnapshot.data()
                setUserLocation({latitude: user.latitude, longitude: user.longitude});
            });
            // Unsubscribe from events when no longer in use
            return () => subscriber();
        }
        catch (error){
            if (error.code === 'auth/network-request-failed') {
                Alert.alert('Network Error', 'Make sure you are connected to the internet!');
            }
        }
    }, []);

    /**
     * Calculate the ETA based on the new user location.
     */
    function refreshETA(){
        let newETA = calculateTime(userLocation.latitude, userLocation.longitude,context.coffeeShopObj.Location._latitude ,context.coffeeShopObj.Location._longitude)
        if(order.eta !== newETA) setETA(order, newETA);
        return newETA;
    }

  return (
      <OrderCardContext.Provider
        value={{order: {data: order, currStatus: currStatus, setCurrStatus: setCurrStatus, eta: ETA}}}
      >
          <AnimatedCard
              collapsableContent={<ReducedOrder/>}
              hidableContent={<ExpandedOrder/>}
              initialHeight={initialHeight}/>
      </OrderCardContext.Provider>
  );
};

export default OrderCard;


