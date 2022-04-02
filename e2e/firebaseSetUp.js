import {initializeApp} from 'firebase/app';
import {connectAuthEmulator, getAuth} from 'firebase/auth';
import {connectFirestoreEmulator, getFirestore} from 'firebase/firestore';

// Always use the emulator for testing. Using the cloud database could yield unexpected results.
const EMULATOR_MODE_ON = true;

const firebaseConfig = {
  apiKey: 'AIzaSyAr1toS2gSr-_6cMS4Jh0R2NhzI70g5nWk',
  authDomain: 'independentcoffeeshops.firebaseapp.com',
  databaseURL:
    'https://independentcoffeeshops-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'independentcoffeeshops',
  storageBucket: 'independentcoffeeshops.appspot.com',
  messagingSenderId: '185382636935',
  appId: '1:185382636935:web:e905902ac500f230f75722',
  measurementId: 'G-5WK60CC02P',
};

export function initialiseFirebase() {
  return initializeApp(firebaseConfig);
}

export function initialiseFirestore(app) {
  const db = getFirestore(app);
  // Switch emulator on
  if (EMULATOR_MODE_ON) {
    connectFirestoreEmulator(db, '127.0.0.1', 8080);
  }
  return db;
}

export function initialiseAuth(app) {
  const auth = getAuth(app);
  // Switch emulator on
  if (EMULATOR_MODE_ON) {
    connectAuthEmulator(auth, 'http://127.0.0.1:9099', {disableWarnings: true});
  }
  return auth;
}
