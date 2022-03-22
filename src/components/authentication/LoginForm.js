import {Alert, StyleSheet, Text, View} from "react-native";
import FormField from "../../sub-components/FormField";
import PrimaryButton from "../../sub-components/PrimaryButton";
import React, {useState} from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const LoginForm = () => {
    const [emailLogIn, setEmailLogIn] = useState('');
    const [passwordLogIn, setPasswordLogIn] = useState('');

    /*
    State clean up method, called after logging in
     */
    const resetFields = () => {
        setEmailLogIn('');
        setPasswordLogIn('');
    };

    /*
    Before attempting authentication, this function checks if there is a coffee shop registered with
    the input email. If there is, but authentication fails, the only alternative is they entered an
    incorrect password and an Alert will show.
    */
    async function authenticateCoffeeShop() {
        let foundCoffeeShop = false;

        await firestore()
            .collection('CoffeeShop')
            .get().then( coffeeShops => {
                coffeeShops.forEach(shop => {
                    if (shop.data().Email ===  emailLogIn) {foundCoffeeShop = true}
                })
            }).catch(function(error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                throw error;
            });

        if (foundCoffeeShop) {
            resetFields();
            await auth()
                .signInWithEmailAndPassword(emailLogIn, passwordLogIn)
                .catch( error => processBackEndErrors(error));
        } else {
            Alert.alert('Coffee Shop Not Registered', 'Are you new or did you make a typo in the email?', [
                { text: 'Dismiss' },
            ]);
        }

    }
     return (
         <View style={styles.logInForm}>
             <Text style={styles.formTitle}>
                 Log In
             </Text>
             <FormField
                 style={styles.element}
                 title={'Email'}
                 placeholder={'business@coolcoffee.com'}
                 setField={setEmailLogIn}
                 type={'email'}
                 value={emailLogIn}
             />
             <FormField
                 style={styles.element}
                 title={'Password'}
                 setField={setPasswordLogIn}
                 type={'password'}
                 value={passwordLogIn}
             />
             <View style={styles.button}>
                 <PrimaryButton
                     buttonText={'Log In'}
                     onPress={authenticateCoffeeShop}
                     widthRatio={0.5}
                 />
             </View>
         </View>
     )
}

const styles = StyleSheet.create({
    logInForm: {
        display: 'flex',
        flex: 2,
        paddingBottom: '4%',
    },
    formTitle: {
        fontSize: 40,
        fontFamily: 'Roboto-Bold',
        color: 'black',
        textAlign: 'center',
        paddingVertical: '4%',
    },
    element: {
        display: 'flex',
        flex: 1,
    },
    button: {
        justifyContent: 'center',
        marginHorizontal: '22%',
        backgroundColor: '#207671',
        marginVertical: '5%',
        alignContent: "center",
    },
});

export  default LoginForm;
