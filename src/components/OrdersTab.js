import React, {useState} from 'react';
import {Dimensions, Platform, PixelRatio} from 'react-native';
import {StyleSheet} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';

const OrdersTab = ({SECTIONS, setStatus}) => {
  const [index, setIndex] = useState(0);

  const updatePage = newIndex => {
    setIndex(newIndex);
    setStatus(SECTIONS[newIndex]);
  };

  return (
    <SegmentedControlTab
      values={SECTIONS}
      selectedIndex={index}
      onTabPress={updatePage}
      tabStyle={styles.tab}
      tabsContainerStyle={styles.tabContainer}
      tabTextStyle={styles.tabText}
      borderRadius={20}
      activeTabStyle={styles.activeTab}
    />
  );
};

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const scale = SCREEN_WIDTH / 300;

export function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

const styles = StyleSheet.create({
  tabContainer: {
    marginHorizontal: '5%',
    justifyContent: 'flex-start',
  },

  tab: {
    flex: 0,
    paddingHorizontal: '3%',
    borderRadius: 20,
    borderWidth: 0,
    marginHorizontal: '1%',
    backgroundColor: '#E1E1E1',
    alignSelf: 'baseline',
    alignItems: 'baseline',
  },

  tabText: {
    color: 'black',
    fontSize: normalize(7),
    fontFamily: 'Montserrat-Bold',
  },

  activeTab: {
    backgroundColor: '#65ADA9',
  },
});

export default OrdersTab;
