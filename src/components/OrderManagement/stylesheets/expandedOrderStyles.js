import {Dimensions, StyleSheet} from 'react-native';

const fullWidth = Dimensions.get('window').width;

const expandedOrderStyles = StyleSheet.create({
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
  mainItem: {
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
    color: 'black',
    marginRight: 4,
  },
  item_name: {
    fontFamily: 'Montserrat',
    fontWeight: '300',
    fontSize: 24,
    color: 'black',
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '5%',
    height: '25%',
  },

  options: {
    fontFamily: 'Montserrat',
    fontWeight: '200',
    fontSize: 18,
    color: '#000000',
  },

  elevate: {
    marginTop: '-10%',
  },
});

export default expandedOrderStyles;
