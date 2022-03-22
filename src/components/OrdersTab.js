import React, {useContext, useState} from 'react';
import {Dimensions, Platform, PixelRatio} from 'react-native';
import {StyleSheet} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {OrdersContext} from "../screens/OrdersPage";

const OrdersTab = ({SECTIONS, setStatus}) => {
  const [index, setIndex] = useState(0);
  const context = useContext(OrdersContext)
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
      badges={[null,context.numIncomingOrders]}
      tabBadgeContainerStyle={[styles.badgeContainer]}
      tabBadgeStyle={styles.badgeNumber}
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
    justifyContent: 'flex-start',
    marginTop: '5%',
    marginLeft: '5%',
  },

  tab: {
    flex: 0,
    paddingHorizontal: '2%',
    borderRadius: 20,
    borderWidth: 0,
    marginRight: '1%',
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

  badgeNumber:{
    fontSize: 15,
  },

  badgeContainer:{
    backgroundColor: 'red',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default OrdersTab;
