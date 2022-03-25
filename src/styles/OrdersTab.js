import {StyleSheet} from "react-native";
import {normalize} from "../helpers/functions";

export const ordersTabStyles = StyleSheet.create({
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
