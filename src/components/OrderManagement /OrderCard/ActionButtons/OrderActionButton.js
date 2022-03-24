
import React, {useContext, useEffect, useState} from 'react';
import PrimaryButton from "../../../../sub-components/PrimaryButton";
import {AnimatedCardContext, OrderCardContext, OrdersContext} from "../../contexts";
import {OrderStatuses} from "../../../../static-data";

const OrderActionButton = () => {
  const ordersContext = useContext(OrdersContext);
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
              ordersContext.setOrderStatus(order.data, OrderStatuses.READY)
                  .then(order.setCurrStatus(OrderStatuses.READY))
                  .catch(error => console.log(error + 'when setting as ready'));
              break;
          case OrderStatuses.READY:
              ordersContext.setOrderStatus(order.data, OrderStatuses.COLLECTED)
                  .then(order.setCurrStatus(OrderStatuses.COLLECTED))
                  .catch(error => console.log(error + 'when setting as collected'));
              break;
      }
  }

  return (
      <PrimaryButton color={customStyle} buttonText={buttonText} onPress={updateStatus}/>
  );
};

export default OrderActionButton;
