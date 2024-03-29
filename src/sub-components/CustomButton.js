import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Animated,
  Pressable,
  Dimensions,
} from 'react-native';

/**
 * Reusable and customisable button for versatile use throughout the app.
 * @param props The props for the component
 */
export default function CustomButton(props) {
  const {
    color,
    text,
    optionalNumber = null,
    widthRatio = 0.36,
    onPress,
    buttonHeight = 60,
    testID,
  } = props;

  const animation = new Animated.Value(0);
  const inputRange = [0, 1];
  const outputRange = [1, 0.8];
  const scale = animation.interpolate({inputRange, outputRange});

  /**
   * Button animation on press in
   */
  const onPressIn = () => {
    Animated.spring(animation, {
      toValue: 0.095,
      speed: 100,
      useNativeDriver: true,
    }).start();
  };

  /**
   * Button animation on press out
   */
  const onPressOut = () => {
    Animated.spring(animation, {
      toValue: 0,
      speed: 70,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View>
      <Pressable
        style={[
          buttonStyles.outer,
          buttonStyles[color],
          {width: screenWidth * widthRatio, height: buttonHeight},
        ]}
        activeOpacity={1}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={onPress}
        testID={testID}
      >
        <Animated.View style={{transform: [{scale}]}}>
          <Text style={buttonStyles.buttonText}>{text}</Text>
          {optionalNumber === null ? null : (
            <Text
              style={[
                buttonStyles.optionalNumber,
                buttonStyles[`bubble${color}`],
              ]}
            >
              {optionalNumber}
            </Text>
          )}
        </Animated.View>
      </Pressable>
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;

const buttonStyles = StyleSheet.create({
  green: {
    backgroundColor: '#207671',
  },

  grey: {
    backgroundColor: '#E1E1E1',
  },

  blue: {
    backgroundColor: '#4273D3',
  },

  red: {
    backgroundColor: '#CE316A',
  },

  yellow: {
    backgroundColor: '#D2AD20',
  },

  optionalNumber: {
    overflow: 'hidden',
    width: 20,
    height: 20,
    textAlign: 'center',
    marginBottom: 15,
    marginLeft: 8,
  },

  bubblegreen: {
    backgroundColor: '#183342',
    color: '#E9E5D8',
    fontFamily: 'Poppins-SemiBold',
  },

  bubbleblue: {
    backgroundColor: 'whitesmoke',
    color: '#555555',
  },

  bubblered: {
    backgroundColor: 'whitesmoke',
    color: '#CE316A',
  },

  bubbleyellow: {
    backgroundColor: 'whitesmoke',
    color: '#CE316A',
  },

  buttonText: {
    color: '#EFEFEF',
    fontFamily: 'Roboto-Medium',
    letterSpacing: 0.5,
    fontSize: 24,
    fontWeight: '700',
  },

  outer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
