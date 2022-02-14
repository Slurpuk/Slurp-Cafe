import {FlatList, StyleSheet, Text, View} from 'react-native';
import OrderActionButton from './OrderActionButton';
import React, {useContext} from 'react';
import {DetailsContext} from './OrderCard';

const ReducedOrder = () => {
  const order = useContext(DetailsContext);
  return (
    <View style={styles.rectangle}>
      <View style={styles.left_side}>
        <View style={styles.header}>
          <Text style={styles.name}>Mike Myers</Text>
          <Text style={styles.total_price}>
            £{order.order.total.toFixed(2)}
          </Text>
        </View>
        <Text style={styles.order_number}>#53441</Text>
        <Text style={styles.order_size}>4 items</Text>
        <View style={styles.list_of_orders}>
          <FlatList
            style={styles.list}
            data={order.order.items.slice(0, 2)}
            horizontal={true}
            renderItem={({item}) => (
              <View style={styles.order}>
                <Text style={styles.amount}>{item.amount}</Text>
                <Text style={styles.item_name}>{item.name}</Text>
              </View>
            )}
          />

          {order.order.items.length > 2 ? (
            <Text style={styles.dots}>...</Text>
          ) : null}
        </View>
      </View>
      <View style={styles.right_side}>
        <View style={styles.time}>
          <Text>Icon!!!</Text>
          <Text style={styles.clock_number}>6</Text>
        </View>
        {order.isFinished ? (
          <Text style={styles.finished}>This order is finished</Text>
        ) : (
          <OrderActionButton />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  name: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: 25,
    color: '#000000',
  },
  rectangle: {
    marginVertical: '2%',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#F2F2F2',
    justifyContent: 'space-between',
    padding: '3%',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  order_number: {
    fontFamily: 'Montserrat',
    fontWeight: '400',
    fontSize: 21,
    color: '#9A9A9A',
  },
  list_of_orders: {
    display: 'flex',
    flexDirection: 'row',
  },
  expandedOrder: {
    borderColor: '#DEDEDE',
    borderStyle: 'solid',
    borderBottomWidth: 1,
  },
  order: {
    paddingVertical: 5,
    paddingRight: 14,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  order_size: {
    fontFamily: 'Montserrat',
    fontWeight: '300',
    fontStyle: 'italic',
    fontSize: 21,
    color: '#000000',
  },
  time: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-end',
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
    maxWidth: '50%',
  },
  right_side: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
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
    marginLeft: '5%',
  },
  total: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '20%',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
  },
  amount: {
    fontFamily: 'Roboto-Black',
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
  dots: {
    fontFamily: 'Montserrat',
    fontWeight: '300',
    fontSize: 24,
    color: '#000000',
    marginTop: 7,
    marginRight: 4,
  },

  finished: {
    color: 'red',
    fontSize: 12,
    fontFamily: 'Montserrat',
  },
});

export default ReducedOrder;
