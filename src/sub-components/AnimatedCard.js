import React, {useEffect, useRef, useState} from 'react';
import {
    Animated,
    Text,
    View,
    StyleSheet,
    Button,
    SafeAreaView,
    Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
export const CardContext = React.createContext();
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

    const growHeight = () => {
        setExpanded(!isExpanded);
        //console.log(isExpanded);

        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(adaptiveHeight, {
            toValue: hidableHeight + collapsableHeight + 10,
            duration: 500,
            useNativeDriver: false,
        }).start();
    };

    const toggleheight = () => {
        isExpanded ? shrinkHeight() : growHeight();
        //console.log('toggle height triggered');
    };

    const shrinkHeight = () => {
        setExpanded(!isExpanded);
        let isFlipped = '180deg';
        //console.log(isExpanded);

        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(adaptiveHeight, {
            toValue: collapsableHeight + 10,
            duration: 500,
            useNativeDriver: false,
        }).start();
    };

    return (
        <CardContext.Provider value={{isExpanded: isExpanded, setExpanded:toggleheight}}>
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.expandable,
                    {
                        // Bind opacity to animated value
                        height: adaptiveHeight,
                    },
                ]}
                onLayout={event => {
                    let {x, y, width, height} = event.nativeEvent.layout;
                }}
            >
                <AnimatedPressable onPress={toggleheight}>
                    <View
                        onLayout={event => {
                            setCollapsableHeight(event.nativeEvent.layout.height);
                        }}
                        style={styles.collapsable}
                    >
                        {collapsableContent}
                    </View>

                    <View
                        onLayout={event => {
                            setHidableHeight(event.nativeEvent.layout.height);
                        }}
                        style={styles.hidable}
                    >
                        {hidableContent}
                    </View>
                    <View
                        style={[
                            styles.topRightIcon,
                            {transform: [{rotateZ: isExpanded ? '180deg' : '0deg'}]},
                        ]}
                    >
                        <Icon size={30} color="black" name="chevron-down" />
                    </View>
                </AnimatedPressable>

                <View style={styles.absoluteBottomRight}>{bottomFixed}</View>
            </Animated.View>
        </View>
        </CardContext.Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    fadingContainer: {
        padding: 20,
        backgroundColor: 'powderblue',
    },
    fadingText: {
        fontSize: 28,
    },
    buttonRow: {
        flexBasis: 100,
        justifyContent: 'space-evenly',
        marginVertical: 16,
        color: 'black',
    },

    expandable: {
        backgroundColor: '#F2F2F2',
        display: 'flex',
        flexShrink: 0,
        height: 100,
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 13,
        padding: '3%',
    },

    hidable: {
        maxWidth: '100%',
    },

    collapsable: {
        paddingBottom: 10,
        maxWidth: '85%',
    },

    absoluteBottomRight: {
        position: 'absolute',
        bottom: 5,
        left: 10,
        minWidth: 20,
        minHeight: 20,
    },

    topRightIcon: {
        position: 'absolute',
        top: -3,
        right: -3,
        minWidth: 20,
        minHeight: 20,
        transform: [{rotateZ: '0deg'}],
    },

    flipped: {
        transform: [{rotateZ: '180deg'}],
    },
});

export default AnimatedCard;
