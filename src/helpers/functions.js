import SECTIONS from "../data/OrderTabSectionsData";
import {Dimensions, PixelRatio, Platform} from "react-native";

export const updatePage = (newIndex, setIndex, setStatus) => {
    setIndex(newIndex);
    setStatus(SECTIONS[newIndex]);
};

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const scale = SCREEN_WIDTH / 300;

export function normalize(size) {
    const newSize = size * scale;
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
}
