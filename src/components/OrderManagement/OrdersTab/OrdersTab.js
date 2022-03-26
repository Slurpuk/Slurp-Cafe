import React, {useContext, useState} from 'react';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {OrdersContext} from "../contexts";
import {styles} from "../stylesheets/ordersTabStyles";

/**
 * Tab bar for displaying orders of similar status.
 * @param SECTIONS the names of the tabs to render
 * @param setStatus the setState of the OrdersPage
 */
const OrdersTab = ({SECTIONS, setStatus}) => {
    const [index, setIndex] = useState(1);
    const context = useContext(OrdersContext)

    /**
     * Change the selected tab
     * @param newIndex the index of the selected tab
     */
    function updatePage(newIndex){
      setIndex(newIndex);
      setStatus(SECTIONS[newIndex]);
    }

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
}

export default OrdersTab;
