import {StyleSheet} from 'react-native';

const reducedOrderStyles = StyleSheet.create({
  invisible: {
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
    justifyContent: 'flex-start',
  },
  finished: {
    color: 'red',
    fontSize: 15,
    fontFamily: 'Montserrat',
  },

  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default reducedOrderStyles;
