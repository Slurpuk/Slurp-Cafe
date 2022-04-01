import {Platform, StyleSheet, PixelRatio, Dimensions} from 'react-native';
const {width: SCREEN_WIDTH} = Dimensions.get('window');
const scale = SCREEN_WIDTH / 300;

/**
 * Scales the size to the size of the screen
 * @param size of the object/component
 * @returns {number} the new, scaled size
 */
function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

export const styles = StyleSheet.create({
  tabContainer: {
    justifyContent: 'flex-start',
    marginTop: '5%',
    marginLeft: '5%',
    marginRight: '5%',
  },

  tab: {
    flex: 0,
    paddingHorizontal: '2%',
    borderRadius: 20,
    borderWidth: 0,
    marginRight: '1%',
    backgroundColor: '#E1E1E1',
    alignItems: 'baseline',
  },

  tabText: {
    color: 'black',
    fontSize: normalize(8),
    fontFamily: 'Montserrat-Bold',
  },

  activeTab: {
    backgroundColor: '#65ADA9',
  },

  badgeNumber: {
    fontSize: 15,
  },

  badgeContainer: {
    backgroundColor: 'red',
    minWidth: 25,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
