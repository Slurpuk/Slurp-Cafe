import {Animated} from "react-native";

const toggleHeight = (isExpanded, setExpanded, adaptiveHeight, hidableHeight, collapsableHeight) => {
    changeHeight()
};

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

export {changeHeight, toggleHeight}
