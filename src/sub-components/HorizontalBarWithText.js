import {Text, View} from "react-native";
import React from "react";

const HorizontalBarWithText = ({text}) => {
    return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
            <View>
                <Text style={{width: 50, textAlign: 'center', color: 'black'}}>{text}</Text>
            </View>
            <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        </View>
    );
}

export default HorizontalBarWithText;
