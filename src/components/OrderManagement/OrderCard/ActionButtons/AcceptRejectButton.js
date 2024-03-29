import React, {useContext} from 'react';
import {
  AnimatedCardContext,
  OrderCardContext,
  OrdersContext,
} from '../../contexts';
import {Alerts, OrderStatuses, TabStatuses} from '../../../../static-data';
import {setOrderStatus, updateFinishedTime} from '../../../../firebase';
import CustomButton from '../../../../sub-components/CustomButton';

/**
 * Button for either accepting or rejecting orders
 * @param accept True if it's an accept button, false otherwise
 */
const AcceptRejectButton = ({accept}) => {
  const orderCardContext = useContext(OrderCardContext);
  const ordersContext = useContext(OrdersContext);
  const animated = useContext(AnimatedCardContext);
  const order = orderCardContext.order;

  /**
   * Updates the status of the order accordingly
   */
  function updateStatus() {
    accept ? acceptOrder() : Alerts.rejectingOrderAlert(rejectOrder);
  }

  /**
   * Reject the order.
   */
  function rejectOrder() {
    animated.setExpanded();
    // Allow for the animation to finish before removing the order.
    let myTimeout = setTimeout(() => {
      updateFinishedTime(order.data).then(() =>
        setOrderStatus(order.data, OrderStatuses.REJECTED),
      );
      clearTimeout(myTimeout);
    }, 500);
  }

  /**
   * Accept the order.
   */
  function acceptOrder() {
    animated.setExpanded();
    // Allow for the animation to finish before removing the order.
    let myTimeout = setTimeout(() => {
      if (ordersContext.tabStatus === TabStatuses.ALL) {
        orderCardContext.order.setCurrStatus(OrderStatuses.ACCEPTED);
      }
      setOrderStatus(order.data, OrderStatuses.ACCEPTED);
      clearTimeout(myTimeout);
    }, 500);
  }

  return (
    <CustomButton
      color={accept ? 'blue' : 'red'}
      text={accept ? 'Accept order' : 'Reject order'}
      onPress={updateStatus}
    />
  );
};

export default AcceptRejectButton;
