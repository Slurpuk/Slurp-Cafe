import React from 'react';
import {Pressable, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useContext} from 'react';
import {OrderCardContext} from '../../contexts';
import {StyleSheet} from 'react-native';
import {removeOrder} from '../../../../firebase';

/**
 * Button for removing finished orders from the list of required orders
 */
const DeleteButton = () => {
  const orderCardContext = useContext(OrderCardContext);
  const order = orderCardContext.order;

  /**
   * Remove the order from the list of required orders
   */
  function deleteOrder() {
    removeOrder(order.data);
  }

  return (
    <Pressable
      testID={'pressableDelete'}
      onPress={deleteOrder}
      style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
    >
      <Icon name={'trash-can'} size={24} color={'#CD5160'} />
      <Text testID={'removeText'} style={[styles.text, {color: '#CD5160'}]}>
        Remove
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    fontWeight: '400',
  },
});

export default DeleteButton;
