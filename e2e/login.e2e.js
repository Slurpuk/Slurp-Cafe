import {
  initialiseAuth,
  initialiseFirebase,
  initialiseFirestore,
} from './firebaseSetUp';
import {addDoc, collection, GeoPoint} from 'firebase/firestore';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {writeCloseClean} from "./helpers";

let db;
let auth;


/**
 * This set of tests intends to test the login and forgot password features.
 * Verifying reset password email is received and resetting password is
 * untestable for obvious reasons.
 * No network errors are untestable (see signUp.e2e.js doc for more info)
 * As in many other cases, there are untested catch or else alerts that should
 * never be raised but exist as safety and therefore cannot be tested.
 */
describe('Log in', () => {
  beforeAll(async () => {
    const app = initialiseFirebase();
    db = initialiseFirestore(app);
    auth = initialiseAuth(app);

    await device.launchApp(); // deletes async storage on launch ensuring welcome pages are displayed
  });

  afterAll(async () => {
    await element(by.text('Manage Shop')).tap();
    await element(by.text('Log Out')).tap();
    await element(
        by.label('Yes').and(by.type('_UIAlertControllerActionView')),
    ).tap();
  });

  it('should raise confirmatory alert if forgot password with existing email', async () => {
    const intro = 'test_intro1';
    const name = 'test1';
    const usedEmail = 'test1@example.org';
    const password = 'Password123!';
    await addDoc(collection(db, 'coffee_shops'), {
      name: name,
      intro: intro,
      email: usedEmail,
      location: new GeoPoint(51.503223, -0.1275),
      is_open: false,
    });
    await createUserWithEmailAndPassword(auth, usedEmail, password);
    await expect(element(by.id('log_in_page'))).toBeVisible();
    await writeCloseClean(usedEmail);

  });

  it('should also raise alert if forgot password with non-existent email', async () => {
    const email = 'thisemaildoesnotexist@example.org';
    await writeCloseClean(email);
  });

  it('should raise alert if log in wrong password', async () => {
    const wrongPassword = 'wrong';
    const intro = 'test_intro2';
    const name = 'test2';
    const usedEmail = 'test2@example.org';
    const password = 'Password123!';
    await addDoc(collection(db, 'coffee_shops'), {
      name: name,
      intro: intro,
      email: usedEmail,
      location: new GeoPoint(51.503223, -0.1275),
      is_open: false,
    });
    await createUserWithEmailAndPassword(auth, usedEmail, password);

    await element(by.id('log_in_page_email')).typeText(usedEmail);
    await element(by.id('log_in_page_password')).typeText(wrongPassword);
    await element(by.id('login_button')).tap();

    await expect(element(by.text('Wrong Password'))).toBeVisible();
    await expect(
        element(by.type('_UIAlertControllerActionView')),
    ).toBeVisible(); // Check raises alert
    await element(by.type('_UIAlertControllerActionView')).tap();
    await expect(element(by.id('log_in_page'))).toBeVisible();
    await element(by.id('log_in_page_password')).clearText();
  });

  it('should be able to log in with valid details', async () => {
    const password = 'Password123!';

    await element(by.id('log_in_page_password')).typeText(password);
    await element(by.id('login_button')).tap();

    await expect(element(by.id('log_in_page'))).not.toBeVisible();
    await expect(element(by.id('orders_page'))).toBeVisible();
  });
});

