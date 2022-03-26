import {StyleSheet} from 'react-native';

export const PrimaryButtonStyles = StyleSheet.create({
  button: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 3,
    height: 60,
  },
  button_text: {
    color: 'white',
    fontWeight: '700',
    fontSize: 25,
    fontFamily: 'Roboto',
    alignSelf: 'center',
  },
});
