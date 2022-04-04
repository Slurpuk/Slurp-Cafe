import {getDoc} from "firebase/firestore";
import {OrderStatuses, TabSections, TabStatuses} from "../src/static-data";

async function writeCloseClean(email){
    await element(by.id('log_in_page_email')).typeText(email);
    await element(by.text('Forgot your password?')).tap();
    await expect(element(by.text('Reset Sent'))).toBeVisible();
    await expect(
        element(by.type('_UIAlertControllerActionView')),
    ).toBeVisible(); // Check raises alert
    await element(by.type('_UIAlertControllerActionView')).tap();
    await expect(element(by.id('log_in_page'))).toBeVisible();
    await element(by.id('log_in_page_email')).clearText();
}

async function checkCorrectStatus(orderRef, expectedStatus){
    const orderDoc = await getDoc(orderRef);
    const orderStatus = orderDoc.data().status;
    if(orderStatus !== expectedStatus){
        fail('Order should be accepted')
    }
}

async function checkRendersInCorrectTabs(tabs, orderID) {
    for (let tabStatus of TabSections){
        await element(by.text(tabStatus)).tap();
        if (tabs.includes(tabStatus)) {
            await expect(element(by.text(orderID))).toBeVisible();
        } else {
            await expect(element(by.text(orderID))).not.toBeVisible();
        }
    }
}


export {writeCloseClean, checkRendersInCorrectTabs, checkCorrectStatus};
