
import {Pressable, StyleSheet, Text} from 'react-native';
import OrderStatuses from '../OrderStatuses';
import React, {useContext, useEffect, useState} from 'react';
import {DetailsContext} from '../OrderCard';
import PrimaryButton from "../../sub-components/PrimaryButton";
import {OrdersContext} from "../../screens/OrdersPage";
import {CardContext} from "../../sub-components/AnimatedCard";
import TabStatuses from "../TabStatuses";

const OrderActionButton = ({accept}) => {
  const orders = useContext(OrdersContext);
  const details = useContext(DetailsContext);
    const card = useContext(CardContext);
  const [customStyle, setStyle] = useState('#D2AD2B');
  const [buttonText, setButtonText] = useState('View Order');
  const [currStatus, setCurrStatus] = useState(details.order.Status);


  useEffect(() => {
      switch (details.order.Status) {
        case OrderStatuses.ACCEPTED:
          setButtonText('Mark as Ready');
          setStyle('#4273D3');
          break;
        case OrderStatuses.READY:
          setButtonText('Mark as Collected');
          setStyle('#218F89');
          break;
      }
  }, [currStatus]);

  const updateStatus = () => {
      switch (details.order.Status) {
          case OrderStatuses.INCOMING:
              card.setExpanded(true);
              break;
          case OrderStatuses.ACCEPTED:
              orders.setOrderStatus(details.order, OrderStatuses.READY).then(() => {
                  orders.setTabStatus(TabStatuses.READY);
              });
              break;
          case OrderStatuses.READY:
              orders.setOrderStatus(details.order, OrderStatuses.COLLECTED).then(() => {
                  orders.setTabStatus(TabStatuses.ALL);
                  details.setFinished(true);
              });
              break;
      }
  }

  return (
      <PrimaryButton color={customStyle} buttonText={buttonText} onPress={updateStatus}/>
  );
};

export default OrderActionButton;
