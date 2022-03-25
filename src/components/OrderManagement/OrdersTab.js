import React, {useState} from 'react';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {updatePage} from '../../helpers/functions';
import {ordersTabStyles} from "../../styles/OrdersTab";

const OrdersTab = ({SECTIONS, setStatus}) => {
  const [index, setIndex] = useState(0);

  return (
    <SegmentedControlTab
      values={SECTIONS}
      selectedIndex={index}
      onTabPress={(newIndex) => updatePage(newIndex, setIndex, setStatus)}
      tabStyle={ordersTabStyles.tab}
      tabsContainerStyle={ordersTabStyles.tabContainer}
      tabTextStyle={ordersTabStyles.tabText}
      borderRadius={20}
      activeTabStyle={ordersTabStyles.activeTab}
    />
  );
};

export default OrdersTab;
