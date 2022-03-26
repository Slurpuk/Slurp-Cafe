import React from 'react';
import {Dimensions, Pressable, Text, View} from 'react-native';
import {primaryButton} from './stylesheets';

/**
 * Reusable primary button
 */
const PrimaryButton = ({color, widthRatio = 0.3, buttonText, onPress}) => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View
      style={[
        primaryButton.button,
        {backgroundColor: color, width: screenWidth * widthRatio},
      ]}>
      <Pressable onPress={onPress}>
        <Text style={primaryButton.button_text}>{buttonText}</Text>
      </Pressable>
    </View>
  );
};

export default PrimaryButton;
