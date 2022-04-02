import {StyleSheet} from 'react-native';

export const AnimatedCardStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    marginVertical: '1%',
  },
  fadingContainer: {
    padding: 20,
    backgroundColor: 'powderblue',
  },
  fadingText: {
    fontSize: 28,
  },
  buttonRow: {
    flexBasis: 100,
    justifyContent: 'space-evenly',
    marginVertical: 16,
    color: 'black',
  },

  expandable: {
    backgroundColor: '#F2F2F2',
    display: 'flex',
    flexShrink: 0,
    height: 100,
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    padding: '3%',
    borderRadius: 13,
  },

  hidable: {
    maxWidth: '100%',
  },

  collapsable: {
    paddingBottom: 10,
    maxWidth: '85%',
  },

  absoluteBottomRight: {
    position: 'absolute',
    bottom: 15,
    right: 40,
    minWidth: 20,
    minHeight: 20,
  },

  topRightIcon: {
    position: 'absolute',
    top: -3,
    right: -3,
    minWidth: 20,
    minHeight: 20,
    transform: [{rotateZ: '0deg'}],
  },

  flipped: {
    transform: [{rotateZ: '180deg'}],
  },
});
