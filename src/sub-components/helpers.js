import {Animated} from "react-native";

/**
 * Change the height of the animated card based on the given parameters
 * @param isExpanded Is the card expanded
 * @param setExpanded Function to set the state of the component
 * @param adaptiveHeight Adaptive height of the animated card
 * @param hidableHeight The height of the card when expanded
 * @param collapsableHeight The height of the card when collapsed
 */
function changeHeight(isExpanded, setExpanded, adaptiveHeight, hidableHeight, collapsableHeight){
    setExpanded(!isExpanded);
    // Will change fadeAnim value to 1 in 5 seconds
    let newHeight = !isExpanded ? hidableHeight + collapsableHeight + 10: collapsableHeight + 10;
    Animated.timing(adaptiveHeight, {
        toValue: newHeight,
        duration: 500,
        useNativeDriver: false,
    }).start();
}

export {changeHeight}
