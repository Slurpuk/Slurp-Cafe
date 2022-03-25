import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {isFinished, getStatusColor, toDateTime} from "../helpers";
import {Reduced} from "../stylesheets";
import {AnimatedCardContext, OrderCardContext} from "../contexts";
import {ChangeStatusButton} from "./ActionButtons";

/**
 * Collapsed version of an order card displaying minimum information about a single order
 */
const ReducedOrder = () => {
  const orderCard = useContext(OrderCardContext);
  const animatedContext = useContext(AnimatedCardContext);
  const order = orderCard.order;
  const statusColor = getStatusColor(order.data.eta);
  const finished = isFinished(order.currStatus);

  return (
    <View style={Reduced.container}>
      <View style={Reduced.left_side}>
        <View style={Reduced.header}>
          <Text style={Reduced.name}>{order.data.user.FirstName}</Text>
          <View style={[Reduced.time, finished ? {opacity: 0}: null]}>
            <Icon size={24} color={statusColor} name='clock'/>
            <Text style={[Reduced.clock_number, {color:statusColor}]}> {order.data.eta} min</Text>
          </View>
        </View>
        <Text style={Reduced.order_number}>#{order.data.key}</Text>
         <Text style={[Reduced.total_price, animatedContext.isExpanded ? Reduced.invisible: null]}>
           £{order.data.Total.toFixed(2)}
        </Text>
      </View>
      { !animatedContext.isExpanded ? <View style={Reduced.right_side}>
        {finished ? (
          <Text style={Reduced.finished}>This order was {order.currStatus} on {toDateTime(order.data.FinishedTime.seconds)}</Text>
        ) : (
          <ChangeStatusButton/>
        )}
      </View>: null}
    </View>
  );
};

export default ReducedOrder;
