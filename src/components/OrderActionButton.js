
import {Pressable, StyleSheet, Text} from 'react-native';
import OrderStatuses from './OrderStatuses';
import React, {useContext, useEffect, useState} from 'react';
import {DetailsContext} from './OrderCard';
import PrimaryButton from "../sub-components/PrimaryButton";
import {OrdersContext} from "../screens/OrdersPage";

const OrderActionButton = ({accept}) => {
  const orders = useContext(OrdersContext);
  const details = useContext(DetailsContext);
  const [customStyle, setStyle] = useState(
    details.isExpanded
      ? accept
        ? styles.acceptButton
        : styles.rejectButton
      : styles.incomingButton,
  );
  const [buttonText, setButtonText] = useState(
    details.isExpanded
      ? accept
        ? 'Accept order'
        : 'Reject order'
      : 'View Order',
  );
  const [currStatus, setCurrStatus] = useState(details.order.status);

  useEffect(() => {
    if (details.isExpanded === false) {
      switch (details.order.status) {
        case OrderStatuses.ACCEPTED:
          setButtonText('Mark as Ready');
          setStyle(styles.acceptedButton);
          break;
        case OrderStatuses.READY:
          setButtonText('Mark as Collected');
          setStyle(styles.readyButton);
          break;
      }
    }
  }, [currStatus]);

  const updateStatus = () => {
    if (details.isExpanded === false) {
      switch (details.order.status) {
        case OrderStatuses.INCOMING:
          details.setExpanded(true);
          break;
        case OrderStatuses.ACCEPTED:
          orders.setOrderStatus(details.order, OrderStatuses.READY);
          setCurrStatus(OrderStatuses.READY);
          break;
        case OrderStatuses.READY:
          orders.setOrderStatus(details.order, OrderStatuses.COLLECTED);
          details.setFinished(true);
          setCurrStatus(OrderStatuses.COLLECTED);
          break;
      }
    } else {
      if (accept) {
        orders.setOrderStatus(details.order, OrderStatuses.ACCEPTED);
        setCurrStatus(OrderStatuses.ACCEPTED);
      } else {
        orders.setOrderStatus(details.order, OrderStatuses.REJECTED);
        details.setFinished(true);
        setCurrStatus(OrderStatuses.REJECTED);
      }
      details.setExpanded(false);
    }
  };

  return (
      <PrimaryButton newStyle={[customStyle, {padding: '5%'}]} buttonText={buttonText} onPress={updateStatus}/>
  );
};


const styles = StyleSheet.create({
    incomingButton:{
        backgroundColor: '#D2AD2B',
    },
    acceptedButton:{
        backgroundColor: '#4273D3',
    },
    readyButton:{
        backgroundColor: '#218F89',
    },
    acceptButton:{
        backgroundColor: '#4273D3',
    },
    rejectButton:{
        backgroundColor: 'red'
    },
});

export default OrderActionButton;
