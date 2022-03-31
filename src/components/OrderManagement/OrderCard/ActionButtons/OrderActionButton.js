import React, {useContext, useEffect, useState} from 'react';
import {AnimatedCardContext, OrderCardContext} from '../../contexts';
import {OrderStatuses} from '../../../../static-data';
import {setOrderStatus, updateFinishedTime} from '../../../../firebase';
import CustomButton from '../../../../sub-components/CustomButton';

/**
 * Button for changing the status of an accepted order
 */
const OrderActionButton = () => {
  const orderCardContext = useContext(OrderCardContext);
  const order = orderCardContext.order;
  const animatedCardContext = useContext(AnimatedCardContext);
  const [customStyle, setStyle] = useState('yellow');
  const [buttonText, setButtonText] = useState('View Order');

  /**
   * Side effect triggered when the order's status changes. Changes the text and color accordingly.
   */
  useEffect(() => {
    switch (order.currStatus) {
      case OrderStatuses.ACCEPTED:
        setButtonText('Mark as Ready');
        setStyle('blue');
        break;
      case OrderStatuses.READY:
        setButtonText('Mark as Collected');
        setStyle('green');
        break;
    }
  }, [order.currStatus]);

  /**
   * Function to update the status of the order depending on its current status
   */
  function updateStatus() {
    switch (order.currStatus) {
      case OrderStatuses.INCOMING:
        animatedCardContext.setExpanded(true);
        break;
      case OrderStatuses.ACCEPTED:
        setOrderStatus(order.data, OrderStatuses.READY);
        break;
      case OrderStatuses.READY:
        updateFinishedTime(order.data).then(() =>
          setOrderStatus(order.data, OrderStatuses.COLLECTED),
        );
        break;
    }
  }

  return (
    <CustomButton
      color={customStyle}
      text={buttonText}
      onPress={updateStatus}
    />
  );
};

export default OrderActionButton;
