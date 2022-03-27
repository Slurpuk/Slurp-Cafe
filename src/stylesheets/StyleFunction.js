import {Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {hasNotch} from 'react-native-device-info';

export const getCushyPaddingTop = () => {
    let padding;
    let statusBarHeight = getStatusBarHeight();
    if (Platform.OS === 'android') {
        padding = statusBarHeight;
    } else {
        if (hasNotch()) {
            padding = statusBarHeight + 14;
        } else {
            padding = statusBarHeight + 16;
        }
    }
    return padding;
};
