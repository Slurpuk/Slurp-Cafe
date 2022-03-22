import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import OrderActionButton from './actionButtons/OrderActionButton';
import {DetailsContext} from './OrderCard';
import OrderStatuses from './OrderStatuses';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CardContext} from "../sub-components/AnimatedCard";
import AcceptRejectButton from "./actionButtons/AcceptRejectButton";

const ExpandedOrder = ({user}) => {
  const context = useContext(DetailsContext);
  const animatedContext = useContext(CardContext);
  return (
    <View style={[ animatedContext.isExpanded ? {marginTop: '-10%'}: null]}>
      <View style={styles.left_side}>
        <View style={styles.list_of_orders}>
          <FlatList
            data={context.order.Items}
            renderItem={({item}) => (
              <View style={[styles.order, styles.expandedOrder]}>
                <View style={styles.mainItem}>
                  <Text style={styles.amount}>{item.amount}</Text>
                  <Text style={styles.item_name}> {item.Name}</Text>
                </View>
                <Text style={styles.options}>{getOptionsText(item)}</Text>
              </View>
            )}
          />
        </View>
        <View style={styles.total}>
          <Text style={styles.total_text}>Total</Text>
          <Text style={styles.total_price}>
            £{context.order.Total.toFixed(2)}
          </Text>
        </View>
      </View>
      {context.order.Status === OrderStatuses.INCOMING ? <View style={styles.bottomButtons}>
            <AcceptRejectButton accept={true} />
          <AcceptRejectButton accept={false} />
      </View>: null}
    </View>
  );
};

function getOptionsText(item) {
  let optionsText = '';
  item.options.forEach(option => {
    optionsText += option.Name + ' ' + option.Type + ', ';
  });
  return optionsText !== ''
      ? optionsText.substring(0, optionsText.length - 2)
      : optionsText;
}

const fullWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  list_of_orders: {
    display: 'flex',
    flexDirection: 'row',
  },
  expandedOrder: {
    width: fullWidth * 0.8,
    borderColor: '#DEDEDE',
    borderStyle: 'solid',
    borderBottomWidth: 1,
  },
  order: {
    paddingVertical: 5,
    paddingRight: 14,
    display: 'flex',
    flexDirection: 'column',
  },
  mainItem:{
    paddingVertical: 5,
    paddingRight: 14,
    display: 'flex',
    flexDirection: 'row',
  },
  left_side: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '100%',
  },
  total_price: {
    fontFamily: 'Montserrat',
    fontSize: 25,
    color: '#000000',
    marginLeft: '5%',
  },
  total_text: {
    fontFamily: 'Montserrat',
    fontWeight: '700',
    fontSize: 25,
    color: '#000000',
  },
  total: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '6%',
  },
  amount: {
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 24,
    color: '#000000',
    marginRight: 4,
  },
  item_name: {
    fontFamily: 'Montserrat',
    fontWeight: '300',
    fontSize: 24,
    color: '#000000',
  },
  bottomButtons:{
    flexDirection: 'row',
    justifyContent: "space-around",
    marginTop: '5%',
    height: '25%'
  },

  options:{
    fontFamily: 'Montserrat',
    fontWeight: '200',
    fontSize: 18,
    color: '#000000',
  },
});

export default ExpandedOrder;
