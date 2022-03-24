import React, {useState} from 'react';
import {Dimensions, Platform, PixelRatio} from 'react-native';
import {StyleSheet} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {updatePage, normalize} from '../helpers/functions';

const OrdersTab = ({SECTIONS, setStatus}) => {
  const [index, setIndex] = useState(0);

  return (
    <SegmentedControlTab
      values={SECTIONS}
      selectedIndex={index}
      onTabPress={(newIndex) => updatePage(newIndex, setIndex, setStatus)}
      tabStyle={styles.tab}
      tabsContainerStyle={styles.tabContainer}
      tabTextStyle={styles.tabText}
      borderRadius={20}
      activeTabStyle={styles.activeTab}
    />
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    justifyContent: 'flex-start',
    marginTop: '5%',
    marginLeft: '5%',
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
