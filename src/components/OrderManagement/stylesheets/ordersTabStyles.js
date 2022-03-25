import {StyleSheet} from "react-native";
import {normalize} from "../OrdersTab/OrdersTab";

export const styles = StyleSheet.create({
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
        minWidth: 20,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
});
