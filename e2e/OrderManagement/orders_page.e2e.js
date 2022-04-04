import {
    initialiseAuth,
    initialiseFirebase,
    initialiseFirestore,
} from '../firebaseSetUp';
import {addDoc, collection, GeoPoint, getDoc, Timestamp} from 'firebase/firestore';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {OrderStatuses, TabStatuses} from "../../src/static-data";
import {checkCorrectStatus, checkRendersInCorrectTabs} from "../helpers";

let db;
let auth;
let shopRef;
let orderRef;
let shopData;
let userRef;
let itemRef;
let orderID;

/**
 * This set of tests intends to test the two pages of the signup process.
 * No network errors are untestable (see signUp.e2e.js doc for more info)
 * As in many other cases, there are untested catch or else alerts that should
 * never be raised but exist as safety and therefore cannot be tested.
 */
describe('Orders Page', () => {
    beforeAll(async () => {
        const app = initialiseFirebase();
        db = initialiseFirestore(app);
        auth = initialiseAuth(app);
        await device.launchApp(); // deletes async storage on launch ensuring welcome pages are displayed
        const email = 'onepiece@gmail.com';
        const password = 'Password123!';
        userRef = await addDoc(collection(db, 'users'), {
            first_name: 'Shanks',
            last_name: 'Lerouge',
            email: 'shanks.lerouge@gmail.com',
            location: new GeoPoint(51.5140310233705, -0.1164075624320158),
        });
        itemRef = await addDoc(collection(db, 'items'), {
            name: 'Granola Bar',
            price: 1.5,
            image:
                'https://firebasestorage.googleapis.com/v0/b/independentcoffeeshops.appspot.com/o/Snacks%2FGranola.jpeg?alt=media&token=e9e5ad28-0ff8-4ed1-9977-de79bee4071c',
            type: 'snack',
            has_options: false,
        });
        shopRef = await addDoc(collection(db, 'coffee_shops'), {
            name: 'ONE PIECE',
            intro: 'A very excruciatingly terribly impossibly long intro',
            email: email,
            location: new GeoPoint(51.503223, -0.1275),
            is_open: false,
        });
        await createUserWithEmailAndPassword(auth, email, password);
        await element(by.id('log_in_page_email')).typeText(email);
        await element(by.id('log_in_page_password')).typeText(password);
        await element(by.id('login_button')).tap();
    });

    afterAll(async () => {
        await element(by.text('Manage Shop')).tap();
        await element(by.text('Log Out')).tap();
        await element(
            by.label('Yes').and(by.type('_UIAlertControllerActionView')),
        ).tap();
    });

    it('should update the backend when toggling the switch', async () => {
        await expect(element(by.id('orders_page'))).toBeVisible();
        await element(by.id('switch')).tap();
        const shopDoc = await getDoc(shopRef);
        shopData = shopDoc.data();
        if(!shopData.is_open){
            fail('Shop should be open')
        }
    });

    it('should render the incoming tab with the order after the order has been sent', async () => {
        const items = [{item: itemRef, quantity: 1}];
        orderRef = await addDoc(collection(db, 'orders'), {
            incoming_time: Timestamp.fromDate(new Date(2022, 1, 4, 9, 30)),
            is_displayed: true,
            shop: shopRef,
            status: OrderStatuses.INCOMING,
            user: userRef,
            items: items,
        });
        const orderDoc = await getDoc(orderRef);
        orderID = `#${orderDoc.id}`;
        console.log(orderID)
        await expect(element(by.text(orderID))).toBeVisible(); // Should render in the incoming tab (default one)
    });

    it('should render the order on the all active tab when incoming', async () => {
        await element(by.text('All active')).tap();
        await expect(element(by.text(orderID))).toBeVisible();
    });

    it('should change backend status after accepting', async () => {
        await element(by.text('View Order')).tap();
        await element(by.text('Accept order')).tap();
        await checkCorrectStatus(orderRef, OrderStatuses.ACCEPTED);
    });

    it('should render only in the all active tab and accepted tab when accepted', async () => {
        const expectedTabs = [TabStatuses.ALL, TabStatuses.ACCEPTED];
        await checkRendersInCorrectTabs(expectedTabs, orderID);
    });

    it('should change backend status after marking ready', async () => {
        await element(by.text('Accepted')).tap();
        await element(by.text('Mark as Ready')).tap();
        await checkCorrectStatus(orderRef, OrderStatuses.READY);
    });

    it('should render only in the all active tab and ready tab when ready', async () => {
        const expectedTabs = [TabStatuses.ALL, TabStatuses.READY];
        await checkRendersInCorrectTabs(expectedTabs, orderID);
    });

    it('should change backend status after marking as collected', async () => {
        await element(by.text('Ready')).tap();
        await element(by.text('Mark as Collected')).tap();
        await checkCorrectStatus(orderRef, OrderStatuses.COLLECTED);
    });

    it('should add finished time to the backend instance', async () => {
        const orderDoc = await getDoc(orderRef);
        const finishedTime = orderDoc.data().finished_time;
        if(!finishedTime){
            fail('Order should have a finished time')
        }
    });

    it('should render only in the finished tab when collected', async () => {
        const expectedTabs = [TabStatuses.FINISHED];
        await checkRendersInCorrectTabs(expectedTabs, orderID);
    });

    it('should disappear when deleting the order', async () => {
        // backend and frontend assertions
        await element(by.text('Finished')).tap();
        await element(by.id('pressableDelete')).tap();
        await expect(element(by.text(orderID))).not.toBeVisible();
        const orderDoc = await getDoc(orderRef);
        const displayed = orderDoc.data().is_displayed;
        if(displayed){
            fail('Order should not be displayed')
        }
    });

    // Do the same process but reject instead of accepting





});
