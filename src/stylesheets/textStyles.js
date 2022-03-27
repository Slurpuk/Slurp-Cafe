import {StyleSheet} from 'react-native';

const textStyles = StyleSheet.create({
    headingText: {
        fontFamily: 'Montserrat',
        fontWeight: '600',
        fontSize: 44,
        color: 'black',
        marginTop: '5%',
        marginLeft: '6%',
    },
    formTitle: {
        fontSize: 50,
        textAlign: 'center',
        fontFamily: 'Roboto-Bold',
        color: 'black',
        paddingVertical: '4%',
    },

    formText: {
        fontSize: 53,
        textAlign: 'center',
        fontFamily: 'Roboto-Bold',
        color: 'black',
        paddingVertical: '4%',
    },

    hyperlink: {
        marginVertical: '1%',
        textDecorationLine: 'underline',
        textAlignVertical: 'bottom',
        fontSize: 17,
        fontFamily: 'Roboto',
    },

    genericBlackText:{
        fontSize: 25,
        fontFamily: 'Roboto',
        fontWeight: '400',
        color: 'black',
    }


});

export default textStyles;
