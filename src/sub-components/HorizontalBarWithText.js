import {Text, View} from 'react-native';
import React from 'react';
import {separationBar} from './stylesheets';

/**
 * Reusable separation bar
 */
const HorizontalBarWithText = ({text}) => {
  return (
    <View style={separationBar.container}>
      <View style={separationBar.line} />
      <View>
        <Text style={separationBar.middleText}>{text}</Text>
      </View>
      <View style={separationBar.line} />
    </View>
  );
};

export default HorizontalBarWithText;
