import {
    initialiseAuth,
    initialiseFirebase,
    initialiseFirestore,
} from '../firebaseSetUp';
import {addDoc, collection, GeoPoint, getDoc} from 'firebase/firestore';
import {createUserWithEmailAndPassword} from 'firebase/auth';

let db;
let auth;
let shopRef;
const newName = 'coolName';
const newIntro = 'An other very excruciatingly terribly impossibly long intro';
const latitudeString = '51.5140310233705';
const longitudeString = '-0.1164075624320158';


/**
 * This set of tests intends to test the account management features such as changing the shop's details and logging out
 * No network errors are untestable (see signUp.e2e.js doc for more info)
 * As in many other cases, there are untested catch or else alerts that should
 * never be raised but exist a safety and therefore cannot be tested.
 */
describe('Account management', () => {
    beforeAll(async () => {
        const app = initialiseFirebase();
        db = initialiseFirestore(app);
        auth = initialiseAuth(app);
        await device.launchApp(); // deletes async storage on launch ensuring welcome pages are displayed
        const email = 'newshop@gmail.com';
        const password = 'Password123!';
        shopRef = await addDoc(collection(db, 'coffee_shops'), {
            name: 'newShop',
            intro: 'A very excruciatingly terribly impossibly long intro',
            email: email,
            location: new GeoPoint(51.503223, -0.1275),
            is_open: false,
        });
        await createUserWithEmailAndPassword(auth, email, password);
        await element(by.id('log_in_page_email')).typeText(email);
        await element(by.id('log_in_page_password')).typeText(password);
        await element(by.id('login_button')).tap();
        await element(by.text('Manage Shop')).tap();
    });


    it('should navigate to orders page after entering details and saving', async () => {
        await element(by.id('account_name')).clearText();
        await element(by.id('account_name')).typeText(newName);
        await element(by.id('account_intro')).clearText();
        await element(by.id('account_intro')).typeText(newIntro);
        await element(by.id('account_latitude')).replaceText(latitudeString);
        await element(by.id('account_longitude')).replaceText(longitudeString);
        await element(by.text('Save Details')).tap();
        await expect(element(by.id('orders_page'))).toBeVisible();
        await expect(element(by.id('account_management_page'))).not.toBeVisible();
    });

    it('should display the new details retrieved from the database as placeholders when going back to the page', async () => {
        const shopDoc = await getDoc(shopRef);
        const shopData = shopDoc.data();
        await element(by.text('Manage Shop')).tap();
        await expect(element(by.id('shop_name'))).toHaveText(shopData.name);
        await expect(element(by.id('account_name'))).toHaveText(shopData.name);
        await expect(element(by.id('account_intro'))).toHaveText(shopData.intro);
        await expect(element(by.id('account_latitude'))).toHaveText(`${shopData.location.latitude}`);
        await expect(element(by.id('account_longitude'))).toHaveText(`${shopData.location.longitude}`);
    });


    it('should raise confirmatory alert on attempting log out', async () => {
        await expect(element(by.text('Log Out'))).toBeVisible();
        await element(by.text('Log Out')).tap();
        await expect(
            element(by.label('No').and(by.type('_UIAlertControllerActionView'))),
        ).toBeVisible();
        await element(
            by.label('No').and(by.type('_UIAlertControllerActionView')),
        ).tap();
        await expect(element(by.id('log_in_page'))).not.toBeVisible();
    });
    it('should be able to log out', async () => {
        await element(by.text('Log Out')).tap();
        await element(
            by.label('Yes').and(by.type('_UIAlertControllerActionView')),
        ).tap();
        await expect(element(by.id('log_in_page'))).toBeVisible();
    });

});



















