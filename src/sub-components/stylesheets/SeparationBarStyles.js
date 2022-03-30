import {StyleSheet} from 'react-native';

export const SeparationBarStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
  },

  middleText: {
    width: 50,
    textAlign: 'center',
    color: 'black',
  },
});
