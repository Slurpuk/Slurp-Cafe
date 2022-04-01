import React, {useContext} from 'react';
import {OrderCardContext} from '../../contexts';
import {OrderStatuses} from '../../../../static-data';
import {setOrderStatus, updateFinishedTime} from '../../../../firebase';
import CustomButton from '../../../../sub-components/CustomButton';

/**
 * Button for either accepting or rejecting orders
 * @param accept True if it's an accept button, false otherwise
 */
const AcceptRejectButton = ({accept}) => {
  const orderCardContext = useContext(OrderCardContext);
  const order = orderCardContext.order;

  /**
   * Updates the status of the order accordingly
   */
  function updateStatus() {
    if (accept) {
      setOrderStatus(order.data, OrderStatuses.ACCEPTED);
    } else {
      updateFinishedTime(order.data).then(() =>
        setOrderStatus(order.data, OrderStatuses.REJECTED),
      );
    }
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
