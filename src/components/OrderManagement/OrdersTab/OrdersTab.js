import React, {useContext, useState} from 'react';
import {Dimensions, Platform, PixelRatio} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {OrdersContext} from "../contexts";
import {styles} from "../stylesheets/ordersTabStyles";

const OrdersTab = ({SECTIONS, setStatus}) => {
  const [index, setIndex] = useState(1);
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

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const scale = SCREEN_WIDTH / 300;

export function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}



export default OrdersTab;
