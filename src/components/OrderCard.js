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


export const DetailsContext = React.createContext();

const OrderCard = ({order}) => {
  const [isExpanded, setExpanded] = useState(false);
  const [finished, setFinished] = useState(
    mapper(TabStatuses.FINISHED).includes(order.status),
  );
  const [timerCount, setTimer] = useState(calculateTime);
  const [statusColor, setStatusColor]=useState('#239DAD');
  let counter=timerCount;

    useEffect(() => {
        const oneSecInterval=setInterval(() => {
            counter--;
            //console.log(counter);
            if(counter==0){
                clearInterval(oneSecInterval);
                setStatusColor('red');
            }
            setTimer(counter);
        }, 1000);
    }, []);

  const toggleExpanded = () => {
    setExpanded(!isExpanded);
  };

  return (
    <View>
      <DetailsContext.Provider
        value={{
          order: order,
            timerCount:timerCount ,
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
