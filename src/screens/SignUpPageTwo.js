import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Text, Alert, StatusBar, ImageBackground, Image} from 'react-native';
import FormField from '../sub-components/FormField';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alerts} from "../static-data";
import {getCushyPaddingTop} from "../stylesheets/StyleFunction";
import textStyles from "../stylesheets/textStyles";
import CustomButton from "../sub-components/CustomButton";
import {SignUpContext} from "../../App";

/**
 * Renders the second page of the signing up process
 */
const SignUpPageTwo = ({navigation}) => {
    const signUpContext = useContext(SignUpContext);
    const [shopName, setShopName] = useState(signUpContext.shopName);
    const [shopIntro, setShopIntro] = useState(signUpContext.shopDescription);

    /**
     * Listens to changes in the shop name and shop description to update the context
     */
    useEffect(() => {
        signUpContext.shopName=shopName;
        signUpContext.shopDescription=shopIntro;
    }, [shopName,shopIntro]);


    /**
     * Displays a confirmation message to the user in the form of an alert
     */
    const registeredMessage = () => {
        Alert.alert('Congratulations', 'Registered Successfully', [
            {
                text: 'OK',
            },
        ]);
    };


    /**
     * Registers user to the database after checking for front end form requirements
     */
    async function registerCoffeeShop() {
        if (processErrorsFrontEnd()) {
            await auth()
                .createUserWithEmailAndPassword(signUpContext.email, signUpContext.password)
                .then(() => {
                    let newCoffeeShop = auth().currentUser;
                    addCoffeeShop(newCoffeeShop);
                    registeredMessage();
                })
                .catch(error => {
                    processBackEndErrors(error.code);
                });
        }
    }

    /**
     * Checks for simple form requirements
     * @return boolean Expressing the validity of the email and password front-end wise
     */
    function processErrorsFrontEnd() {
        let validity = true;
        if (shopName === '') {
            validity = false;
            Alert.alert('Empty ShopName', 'Please enter your shop name.');
        }
        else if (shopIntro === '') {
            validity = false;
            Alert.alert('Empty Description', 'Please enter your shop description.');
        }
        else if (shopIntro.length>100 || shopIntro.length<20) {
            validity = false;
            Alert.alert('Description length', 'The shop description must be between 20 and 100 characters long.');
        }

        return validity;
    }



    /**
     * Manages the response to database failure and shows
     * errors in the form of alerts to the user
     */
    function processBackEndErrors(errorCode) {
        if (errorCode === 'auth/weak-password'
        ) {
            Alerts.weakPasswordAlert();
            navigation.navigate('Sign Up Page One');
        } else if (errorCode === 'auth/invalid-email') {
            Alerts.badEmailAlert();
            navigation.navigate('Sign Up Page One');
        }else if (errorCode === 'auth/email-already-in-use') {
            Alerts.emailInUseAlert();
            navigation.navigate('Sign Up Page One');
        } else if (errorCode === 'auth/network-request-failed') {
            Alerts.connectionErrorAlert();
        } else {
            //Anything else
            Alerts.elseAlert();
        }
    }

    /**
     * Adds all the form field values to a newly create coffee shop
     */
    async function addCoffeeShop() {
        await firestore()
            .collection('CoffeeShop')
            .add({
                Email: signUpContext.email,
                Name: signUpContext.shopName,
                Image:
                    'https://firebasestorage.googleapis.com/v0/b/independentcoffeeshops.appspot.com/o/CoffeeShops%2FDefaultICS.jpeg?alt=media&token=f76c477f-b60a-4c0d-ac15-e83c0e179a18',
                Intro: signUpContext.shopDescription,
                IsOpen: false,
                ItemsOffered: [],
                Location: new firestore.GeoPoint(51.503223, -0.1275), //Default location: 10 Downing Street.
            })
            .catch(error => {
                console.log(error);
            });
    }



    return (
        <View style={styles.wrapper}>
            <View  style={styles.topBar}>
                <StatusBar translucent={true} backgroundColor="white" />
                <Text style={textStyles.formTitle}>Sign Up</Text>
            </View>
            <View style={styles.paddedContainer}>
                <View style={styles.formContainer}>
                    <Text style={[textStyles.genericBoldBlackText, {paddingBottom:'5%', fontSize: 28,}]}>Next,some information about your shop</Text>
                    <FormField
                        title={'Shop Name'}
                        setField={setShopName}
                        type={'name'}
                        value={shopName}
                    />
                    <FormField
                        title={'Shop Description'}
                        setField={setShopIntro}
                        placeholder={'100 characters describing the qualities of your coffee shop'}
                        type={'multiline'}
                        value={shopIntro}
                    />
                    <Text
                        style={[ textStyles.hyperlink]}
                        onPress={() => navigation.navigate('Log In Page')}
                    >Already have an account? Log in
                    </Text>
                </View>
                <View style={styles.horizontalContainer}>
                    <CustomButton
                        style={[styles.subButtonContainerLeft]}
                        color={'blue'}
                        text={'Go Back'}
                        onPress={()=>navigation.navigate('Sign Up Page One')}
                        widthRatio={0.45}
                        buttonHeight={70}
                    />
                    <CustomButton
                        style={styles.subButtonContainer}
                        color={'green'}
                        text={'Register'}
                        onPress={registerCoffeeShop}
                        widthRatio={0.45}
                        buttonHeight={70}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    topBar: {
        height: '12%',
        paddingHorizontal: '5%',
        width:'100%',
        alignItems: 'center',
        backgroundColor: '#F6F6F6',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
    },
    wrapper: {
        display: 'flex',
        flex: 1,
        backgroundColor: 'white',
        paddingTop: getCushyPaddingTop(),
        paddingBottom: '5%',
    },
    formContainer: {
        flex: 1,
        paddingVertical: '10%',
    },
    paddedContainer: {
        display:"flex",
        flex:1,
        paddingHorizontal: '5%',
    },
    text: {
        marginBottom: '2%',
        fontFamily: 'Roboto-Medium',
        fontSize: 27,
        color:'black',
    },
    horizontalContainer: {
        flexDirection: 'row',
        display: 'flex',
        paddingVertical: '2%',
        justifyContent:'center',
        flex:0,
    },
    subButtonContainer: {
        flex:1,
    },
    subButtonContainerLeft: {
        marginRight: '30%',
        flex:1,
    },
});

export default SignUpPageTwo
