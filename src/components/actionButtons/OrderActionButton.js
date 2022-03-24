
import {Pressable, StyleSheet, Text} from 'react-native';
import OrderStatuses from '../OrderStatuses';
import React, {useContext, useEffect, useState} from 'react';
import {DetailsContext} from '../OrderCard';
import PrimaryButton from "../../sub-components/PrimaryButton";
import {OrdersContext} from "../../screens/OrdersPage";
import {CardContext} from "../../sub-components/AnimatedCard";
import TabStatuses from "../TabStatuses";

const OrderActionButton = () => {
  const orders = useContext(OrdersContext);
  const details = useContext(DetailsContext);
    const card = useContext(CardContext);
  const [customStyle, setStyle] = useState('#D2AD2B');
  const [buttonText, setButtonText] = useState('View Order');

  useEffect(() => {
      switch (details.currStatus) {
        case OrderStatuses.ACCEPTED:
          setButtonText('Mark as Ready');
          setStyle('#4273D3');
          break;
        case OrderStatuses.READY:
          setButtonText('Mark as Collected');
          setStyle('#218F89');
          break;
      }
  }, [details.currStatus]);

  const updateStatus = () => {
      switch (details.currStatus) {
          case OrderStatuses.INCOMING:
              card.setExpanded(true);
              break;
          case OrderStatuses.ACCEPTED:
              orders.setOrderStatus(details.order, OrderStatuses.READY)
                  .then(details.setCurrStatus(OrderStatuses.READY))
                  .catch(error => console.log(error + 'when setting as ready'));
              break;
          case OrderStatuses.READY:
              orders.setOrderStatus(details.order, OrderStatuses.COLLECTED)
                  .then(details.setCurrStatus(OrderStatuses.COLLECTED))
                  .catch(error => console.log(error + 'when setting as collected'));
              break;
      }
  }

  return (
      <PrimaryButton color={customStyle} buttonText={buttonText} onPress={updateStatus}/>
  );
};

export default OrderActionButton;
