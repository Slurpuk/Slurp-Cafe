/*
Mock firebase-react-native
*/
import * as ReactNative from 'react-native';

jest.doMock('react-native', () => {
  return Object.setPrototypeOf(
    {
      Platform: {
        OS: 'android',
        select: () => {},
      },
      NativeModules: {
        ...ReactNative.NativeModules,
        RNFBAnalyticsModule: {
          logEvent: jest.fn(),
        },
        RNFBAppModule: {
          NATIVE_FIREBASE_APPS: [
            {
              appConfig: {
                name: '[DEFAULT]',
              },
              options: {},
            },

            {
              appConfig: {
                name: 'secondaryFromNative',
              },
              options: {},
            },
          ],
          FIREBASE_RAW_JSON: '{}',
          addListener: jest.fn(),
          eventsAddListener: jest.fn(),
          eventsNotifyReady: jest.fn(),
          removeListeners: jest.fn(),
        },
        RNFBAuthModule: {
          APP_LANGUAGE: {
            '[DEFAULT]': 'en-US',
          },
          APP_USER: {
            '[DEFAULT]': 'jestUser',
          },
          addAuthStateListener: jest.fn(),
          addIdTokenListener: jest.fn(),
          useEmulator: jest.fn(),
        },
        RNFBCrashlyticsModule: {},
        RNFBDatabaseModule: {
          on: jest.fn(),
          useEmulator: jest.fn(),
        },
        RNFBFirestoreModule: {
          settings: jest.fn(),
          documentSet: jest.fn(),
        },
        RNFBMessagingModule: {
          onMessage: jest.fn(),
        },
        RNFBPerfModule: {},
        RNFBStorageModule: {
          useEmulator: jest.fn(),
        },
      },
    },
    ReactNative,
  );
});

jest.doMock('@react-native-firebase/firestore', () => {
  return () => ({
    collection: jest.fn(),
  });
});

/*
Mock for NativeEventEmitter library
 */
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('react-native/Libraries/Components/Switch/Switch', () => {
  const mockComponent = require('react-native/jest/mockComponent');
  return {
    default: mockComponent('react-native/Libraries/Components/Switch/Switch'),
  };
});


/*
Mock for Device-Info library
 */
import mockRNDeviceInfo from 'react-native-device-info/jest/react-native-device-info-mock';
jest.mock('react-native-device-info', () => mockRNDeviceInfo);

/*
Mock for RNReanimated
 */
global.__reanimatedWorkletInit = jest.fn();

/*
Simulates timers used for animations etc.
 */
jest.useFakeTimers();
