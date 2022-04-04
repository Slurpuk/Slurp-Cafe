import {
    initialiseAuth,
    initialiseFirebase,
    initialiseFirestore,
} from '../firebaseSetUp';
import {addDoc, collection, GeoPoint} from 'firebase/firestore';
import {createUserWithEmailAndPassword} from 'firebase/auth';

let db;
let auth;
const existingEmail = 'existing@gmail.com';
const password = 'Password123!'

/**
 * This set of tests intends to test the two pages of the signup process.
 * No network errors are untestable
 * As in many other cases, there are untested catch or else alerts that should
 * never be raised but exist as safety and therefore cannot be tested.
 */
describe('Sign up', () => {
    beforeAll(async () => {
        const app = initialiseFirebase();
        db = initialiseFirestore(app);
        auth = initialiseAuth(app);
        await device.launchApp();
    });


    afterAll(async () => {
        await element(by.text('Manage Shop')).tap();
        await element(by.text('Log Out')).tap();
        await element(
            by.label('Yes').and(by.type('_UIAlertControllerActionView')),
        ).tap();
    });

    it('should be able to get to signup page from login page and back', async () => {
        await expect(element(by.id('log_in_page'))).toBeVisible();
        await expect(element(by.text('New? Create an account'))).toBeVisible();
        await element(by.text('New? Create an account')).tap();

        await expect(element(by.id('signup_page1'))).toBeVisible();
        await expect(element(by.id('log_in_page'))).not.toBeVisible();
        await expect(element(by.text('Already have an account? Log in'))).toBeVisible();
        await element(by.text('Already have an account? Log in')).tap();

        await expect(element(by.id('log_in_page'))).toBeVisible();
        await element(by.text('New? Create an account')).tap();
    });

    it('should be able to go to next page after entering details', async () => {
        await element(by.id('signup_email')).typeText(existingEmail);
        await element(by.id('signup_password')).typeText('Password123!');
        await element(by.id('signup_password_confirmation')).typeText('Password123!');

        await element(by.text('Next')).tap();
        await expect(element(by.id('signup_page2'))).toBeVisible();

    });

    it('should not be able to sign up with bad email after entering name and intro', async () => {
        const name = 'some random name';
        const intro = 'A very excruciatingly terribly impossibly long intro';
        await element(by.id('signup_name')).typeText(name);
        await element(by.id('signup_intro')).typeText(intro);

        await addDoc(collection(db, 'coffee_shops'), {
            name: name,
            intro: intro,
            email: existingEmail,
            location: new GeoPoint(51.503223, -0.1275),
            is_open: false,
        });
        await createUserWithEmailAndPassword(auth, existingEmail, password);

        await element(by.text('Register')).tap();
        await expect(
            element(by.type('_UIAlertControllerActionView')),
        ).toBeVisible(); // Check raises alert
        await element(by.type('_UIAlertControllerActionView')).tap();
        await expect(element(by.id('signup_page2'))).toBeVisible();
    });

    it('should be able to go back to signup page 1 from signup page 2 and back', async () => {
        const newEmail = 'newemail@gmail.com';
        await element(by.text('Go Back')).tap();
        const emailField = await element(by.id('signup_email'));
        await expect(element(by.id('signup_page1'))).toBeVisible();
        await expect(element(by.id('signup_page2'))).not.toBeVisible();
        await expect(emailField).toHaveText(existingEmail);
        await expect(element(by.id('signup_password'))).toHaveText(password);
        await expect(element(by.id('signup_password_confirmation'))).toHaveText(password);
        await emailField.clearText();
        await emailField.typeText(newEmail);
        await element(by.text('Next')).tap();
        await expect(element(by.id('signup_page2'))).toBeVisible();
        await expect(element(by.id('signup_page1'))).not.toBeVisible();
    });

    it('should be able to sign up with new user', async () => {
        await element(by.text('Register')).tap();
        await expect(element(by.id('signup_page2'))).not.toBeVisible();
        await expect(element(by.id('orders_page'))).toBeVisible();
    });
});
