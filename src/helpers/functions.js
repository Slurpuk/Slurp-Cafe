import SECTIONS from "../data/OrderTabSectionsData";
import {Dimensions, PixelRatio, Platform} from "react-native";
import firestore from "@react-native-firebase/firestore";

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const scale = SCREEN_WIDTH / 300;

export const updatePage = (newIndex, setIndex, setStatus) => {
    setIndex(newIndex);
    setStatus(SECTIONS[newIndex]);
};

export function normalize(size) {
    const newSize = size * scale;
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
}

export const toggleSwitch = (setIsEnabled, coffeeShopRef, isEnabled) =>
{
    setIsEnabled(prevState => !prevState)
    firestore().collection('CoffeeShop').doc(coffeeShopRef).update({
        IsOpen: !isEnabled
    }).then(null)
}

export function goToAccountManagement(navigation) {
    navigation.navigate('Account Management');
}
