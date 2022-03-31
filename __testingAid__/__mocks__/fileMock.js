import React, {useState} from 'react';
import * as ReactNative from 'react-native';

export const Platform = {
    ...ReactNative.Platform,
    OS: 'android',
    Version: 123,
    select: objs => objs['android'],
};

export const Switch = props => {
    const [value, setValue] = useState(props.value);
    return (
        <ReactNative.TouchableOpacity
            onPress={() => {
                props.onValueChange(!value);
                setValue(!value);
            }}
            testID={props.testID}>
            <ReactNative.Text>{value.toString()}</ReactNative.Text>
        </ReactNative.TouchableOpacity>
    );
};

let newRN = Object.defineProperty(ReactNative, 'Platform', {
    get: function() {
        return Platform;
    },
});
newRN = Object.defineProperty(ReactNative, 'Switch', {
    get: function() {
        return Switch;
    },
});

module.exports = newRN;
