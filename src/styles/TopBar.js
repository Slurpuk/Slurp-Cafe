import {StyleSheet} from "react-native";

export const topBarStyles = StyleSheet.create({
    container: {
        height: '12%',
        paddingHorizontal: '3.5%',
        alignItems: 'center',
        backgroundColor: '#F6F6F6',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
    },
    manageOrdersHeadline: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center',
    },
    manageOrdersHeadlineText: {
        fontSize: 25,
        fontFamily: 'Roboto',
        fontWeight: '400',
        color: 'black',
    }
});
