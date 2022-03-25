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

jest.doMock('@react-native-firebase/auth', () => {
  return () => ({
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
    sendPasswordResetEmail: jest.fn(),
  });
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

/*
Mock for RNNavigation
 */
import 'react-native-gesture-handler/jestSetup';



// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

/*
Simulates timers used for animations etc.
 */
jest.useFakeTimers();
