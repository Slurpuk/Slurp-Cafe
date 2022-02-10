import React, {useState} from 'react';
import {
    StyleSheet,
} from 'react-native';
import SegmentedControlTab from "react-native-segmented-control-tab";

const OrdersTab = ({SECTIONS}) => {
    const [index, setIndex] = useState(0)
    return (
            <SegmentedControlTab
                values={SECTIONS}
                selectedIndex={index}
                onTabPress={setIndex}
                tabStyle={styles.tab}
                tabsContainerStyle={styles.tabContainer}
                firstTabStyle={styles.firstTab}
                lastTabStyle={styles.lastTab}
                tabTextStyle={styles.tabText}
                borderRadius={10}
                activeTabStyle={styles.activeTab}
             />
    );

}

const styles = StyleSheet.create({
    tabContainer: {
        marginHorizontal: '5%',
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'center',
    },

    tab:{
        flex: 1,
        borderRadius: 10,
        borderWidth: 0,
        marginHorizontal: '2%',
        backgroundColor: '#E1E1E1'
    },

    firstTab:{
        marginRight: '2%'
    },

    lastTab:{
        marginLeft: '0%'
    },

    tabText: {
        textAlign: 'center',
        color: 'black',
        fontSize: 12,
        fontFamily: 'Montserrat-Bold'
    },

    activeTab:{
        backgroundColor: '#65ADA9'
    }
})

export default OrdersTab;
