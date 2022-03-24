
import React, {useContext, useEffect, useMemo, useState} from 'react';
import firestore from "@react-native-firebase/firestore";
import ReducedOrder from './ReducedOrder';
import ExpandedOrder from './ExpandedOrder';
import AnimatedCard from "../../../sub-components/AnimatedCard";
import {GlobalContext} from "../../../../App";
import {OrderCardContext} from "../contexts";
import {Alerts} from "../../../static-data";
import {getInitialHeight, refreshETA} from "../helpers";


/**
 * Order card displaying details for a single order.
 */
const OrderCard = ({order, setETA}) => {
    const context = useContext(GlobalContext);
    const shopLocation = context.coffeeShopObj.Location;
    const [userLocation, setUserLocation] = useState({latitude: order.user.latitude, longitude: order.user.longitude})
    const [currStatus, setCurrStatus] = useState(order.Status);// Dynamic status of the order card
    // Memoized value refreshed every time the user location changes.
    const ETA = useMemo(() => refreshETA(userLocation, shopLocation, order, setETA), [userLocation]);

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
                Alerts.connectionErrorAlert();
            }
        }
    }, []);

  return (
      <OrderCardContext.Provider
        value={{order: {data: order, currStatus: currStatus, setCurrStatus: setCurrStatus, eta: ETA}}}
      >
          <AnimatedCard
              collapsableContent={<ReducedOrder/>}
              hidableContent={<ExpandedOrder/>}
              initialHeight={getInitialHeight()}/>
      </OrderCardContext.Provider>
  );
};

export default OrderCard;


