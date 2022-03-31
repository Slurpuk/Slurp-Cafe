import {FlatList, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {getOptionsText} from '../helpers';
import {Expanded} from '../stylesheets';
import {AccRejButton} from './ActionButtons';
import {AnimatedCardContext, OrderCardContext} from '../contexts';
import {OrderStatuses} from '../../../static-data';

/**
 * Expanded version of an order card displaying extensive information about a single order.
 */
const ExpandedOrder = () => {
  const orderCardContext = useContext(OrderCardContext);
  const order = orderCardContext.order;
  const animatedContext = useContext(AnimatedCardContext);

  return (
    <View style={[animatedContext.isExpanded ? Expanded.elevate : null]}>
      <View style={Expanded.left_side}>
        <View
            testID={'viewListOrders'}
            style={Expanded.list_of_orders}>
          <FlatList
            data={order.data.Items}
            renderItem={({item}) => (
              <View style={[Expanded.order, Expanded.expandedOrder]}>
                <View style={Expanded.mainItem}>
                  <Text style={Expanded.amount}>{item.amount}</Text>
                  <Text style={Expanded.item_name}> {item.Name}</Text>
                </View>
                <Text style={Expanded.options}>{getOptionsText(item)}</Text>
              </View>
            )}
          />
        </View>
        <View style={Expanded.total}>
          <Text style={Expanded.total_text}>Total</Text>
          <Text testID={'totalPrice'}
                style={Expanded.total_price}>
            £{order.data.Total.toFixed(2)}
          </Text>
        </View>
      </View>
      {order.currStatus === OrderStatuses.INCOMING ? (
        <View
            testID={'buttons'}
            style={Expanded.bottomButtons}>
          <AccRejButton accept={true} />
          <AccRejButton accept={false} />
        </View>
      ) : null}
    </View>
  );
};

export default ExpandedOrder;
