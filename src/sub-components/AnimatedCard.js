import React, {useRef, useState} from 'react';
import {Animated, View, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AnimatedCardContext} from '../components/OrderManagement/contexts';
import {animatedCard} from './stylesheets';
import {changeHeight} from './helpers';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/**
 * Reusable animated card with 2 states (collapsed and expanded)
 */
const AnimatedCard = ({
  initialHeight,
  collapsableContent,
  hidableContent,
  bottomFixed = null,
}) => {
  // fadeAnim will be used as the value for opacity. Initial Value: 0
  const adaptiveHeight = useRef(new Animated.Value(initialHeight)).current;
  const [isExpanded, setExpanded] = useState(false);
  const [collapsableHeight, setCollapsableHeight] = useState();
  const [hidableHeight, setHidableHeight] = useState();

  /**
   * Toggle the height of the card
   */
  function toggleHeight() {
    changeHeight(
      isExpanded,
      setExpanded,
      adaptiveHeight,
      hidableHeight,
      collapsableHeight,
    );
  }

  return (
    <AnimatedCardContext.Provider
      value={{isExpanded: isExpanded, setExpanded: toggleHeight}}
    >
      <View style={animatedCard.container}>
        <Animated.View
          style={[
            animatedCard.expandable,
            {
              // Bind opacity to animated value
              height: adaptiveHeight,
            },
          ]}
          onLayout={event => {
            let {x, y, width, height} = event.nativeEvent.layout;
          }}
        >
          <AnimatedPressable
              testID={'animatedPressable'}
              onPress={toggleHeight}>
            <View
              testID={'collapsableContent'}
              onLayout={event => {
                setCollapsableHeight(event.nativeEvent.layout.height);
              }}
              style={animatedCard.collapsable}
            >
              {collapsableContent}
            </View>

            <View
              testID={'hidableContent'}
              onLayout={event => {
                let tempHeight = event.nativeEvent.layout.height;
                setHidableHeight(tempHeight - 0.2 * tempHeight);
              }}
              style={animatedCard.hidable}
            >
              {hidableContent}
            </View>
            <View
              testID={'arrow'}
              style={[
                animatedCard.topRightIcon,
                {transform: [{rotateZ: isExpanded ? '180deg' : '0deg'}]},
              ]}
            >
              <Icon size={30} color="black" name="chevron-down" />
            </View>
          </AnimatedPressable>
          <View
              testID={'bottomFixed'}
              style={animatedCard.absoluteBottomRight}>
            {bottomFixed}
          </View>
        </Animated.View>
      </View>
    </AnimatedCardContext.Provider>
  );
};

export default AnimatedCard;
