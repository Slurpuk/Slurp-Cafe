/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {Pressable, View} from 'react-native';
import ReducedOrder from './ReducedOrder';
import ExpandedOrder from './ExpandedOrder';
import mapper from './mapper';
import TabStatuses from './TabStatuses';


export const DetailsContext = React.createContext();

const OrderCard = ({order}) => {
  const [isExpanded, setExpanded] = useState(false);
  const [finished, setFinished] = useState(
    mapper(TabStatuses.FINISHED).includes(order.status),
  );

  const toggleExpanded = () => {
    setExpanded(!isExpanded);
  };

  return (
    <View>
      <DetailsContext.Provider
        value={{
          order: order,
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
