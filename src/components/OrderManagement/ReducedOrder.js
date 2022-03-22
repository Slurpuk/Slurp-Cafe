import {FlatList, StyleSheet, Text, View} from 'react-native';
import OrderActionButton from '../actionButtons/OrderActionButton';
import React, {useContext, useEffect, useState} from 'react';
import {DetailsContext} from './OrderCard';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import firestore from "@react-native-firebase/firestore";
import {CardContext} from "../../sub-components/AnimatedCard";

const ReducedOrder = () => {
  const context = useContext(DetailsContext);
  const animatedContext = useContext(CardContext);
  const order = context.order;
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <View style={styles.left_side}>
        <View style={styles.header}>
          <Text style={styles.name}>{order.user.FirstName}</Text>
          <View style={styles.time}>
            <Icon size={24} color={context.statusColor} name='clock'/>
            <Text style={[styles.clock_number, {color:context.statusColor}]}>{context.timerCount}</Text>
          </View>
        </View>
        <Text style={styles.order_number}>#{context.order.key}</Text>
         <Text style={[styles.total_price, animatedContext.isExpanded ? styles.invisible: null]}>
           £{order.Total.toFixed(2)}
        </Text>
      </View>
      { !animatedContext.isExpanded ? <View style={styles.right_side}>
        {context.isFinished ? (
          <Text style={styles.finished}>This order is finished</Text>
        ) : (
          <OrderActionButton/>
        )}
      </View>: null}
    </View>
  );
};

const styles = StyleSheet.create({
  invisible:{
    opacity: 0,
  },
  name: {
    fontFamily: 'Montserrat',
    fontSize: 25,
    color: '#000000',
    fontWeight: '700',
    marginRight: '5%',
  },
  order_number: {
    fontFamily: 'Montserrat',
    fontWeight: '400',
    fontSize: 21,
    color: '#9A9A9A',
    marginTop: '2%',
    marginBottom: '10%',
  },
  time: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  clock_number: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: 25,
    color: '#239DAD',
  },
  left_side: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '60%',
  },
  right_side: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '35%',

  },
  total_price: {
    fontFamily: 'Montserrat',
    fontSize: 25,
    color: '#000000',
    marginBottom: '10%',
    fontWeight: '700',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  finished: {
    color: 'red',
    fontSize: 20,
    fontFamily: 'Montserrat',
  },
});

export default ReducedOrder;
