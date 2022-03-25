
import React, {useContext, useEffect, useState} from 'react';
import PrimaryButton from "../../../../sub-components/PrimaryButton";
import {AnimatedCardContext, OrderCardContext} from "../../contexts";
import {OrderStatuses} from "../../../../static-data";
import {setOrderStatus, updateFinishedTime} from "../../../../firebase";

const OrderActionButton = () => {
  const orderCardContext = useContext(OrderCardContext);
  const order = orderCardContext.order;
    const animatedCardContext = useContext(AnimatedCardContext);
  const [customStyle, setStyle] = useState('#D2AD2B');
  const [buttonText, setButtonText] = useState('View Order');

  useEffect(() => {
      switch (order.currStatus) {
        case OrderStatuses.ACCEPTED:
          setButtonText('Mark as Ready');
          setStyle('#4273D3');
          break;
        case OrderStatuses.READY:
          setButtonText('Mark as Collected');
          setStyle('#218F89');
          break;
      }
  }, [order.currStatus]);

  const updateStatus = () => {
      switch (order.currStatus) {
          case OrderStatuses.INCOMING:
              animatedCardContext.setExpanded(true);
              break;
          case OrderStatuses.ACCEPTED:
              setOrderStatus(order.data, OrderStatuses.READY);
              break;
          case OrderStatuses.READY:
              updateFinishedTime(order.data)
                  .then(() => setOrderStatus(order.data, OrderStatuses.COLLECTED))
              break;
      }
  }

  return (
      <PrimaryButton color={customStyle} buttonText={buttonText} onPress={updateStatus}/>
  );
};

export default OrderActionButton;
