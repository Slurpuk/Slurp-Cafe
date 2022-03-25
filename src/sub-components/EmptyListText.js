import {Text} from 'react-native';
import React from 'react';
import {emptyListText} from "./stylesheets";

/**
 * Reusable component displayed on empty lists
 */
const EmptyListText = ({text}) => {
    return (
        <Text style={emptyListText.emptyText}>{text}</Text>
    );
};

export default EmptyListText;

