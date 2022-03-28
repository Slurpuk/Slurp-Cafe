import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Text, Alert, StatusBar} from 'react-native';
import FormField from '../sub-components/FormField';
import {Alerts, OrderStatuses} from "../static-data";
import {getCushyPaddingTop} from "../stylesheets/StyleFunction";
import textStyles from "../stylesheets/textStyles";
import CustomButton from "../sub-components/CustomButton";
import {SignUpContext} from "../../App";

/**
 * Renders the first page of the signing up process
 */
const SignUpPageOne = ({navigation}) => {
    const signUpContext = useContext(SignUpContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState();
    const emailRegex = new RegExp(
        '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
    );

    /**
     * Listens to changes in the email and password to update the context
     */
    useEffect(() => {
        signUpContext.email=email;
        signUpContext.password=password;
    }, [email,password]);


    /**
     * Navigates to the second page if some front ends checks are valid
     */
    async function registerCoffeeShop() {
        if (processErrorsFrontEnd()) {
            navigation.navigate('Sign Up Page Two');
        }
    }

    /**
     * Checks for simple form requirements
     * @return boolean Expressing the valididty of the email and password front-end wise
     */
    function processErrorsFrontEnd() {
        let validity = true;
        if (email === '') {
            validity = false;
            Alert.alert('Empty Email', 'Please enter your email.');
        } else if (!emailRegex.test(email)) {
            validity = false;
            Alerts.badEmailAlert();
        } else if (password === '') {
            validity = false;
            Alert.alert('Empty Password', 'Please enter your password.');
        } else if (passwordConfirmation === '') {
            validity = false;
            Alert.alert('Empty Password Confirmation', 'Please enter the password confirmation.');
        } else if (password!==passwordConfirmation) {
            validity = false;
            Alert.alert('Password dont match up', 'Please make sure you password confirmation is the same as you password.');
        }

        return validity;
    }

    return (
            <View style={styles.wrapper}>
                <View  style={styles.topBar}>
                    <StatusBar translucent={true} backgroundColor="white" />
                    <Text style={textStyles.formTitle}>Sign Up</Text>
                </View>
                <View style={styles.paddedContainer}>
                    <View style={styles.formContainer}>
                        <Text style={[textStyles.genericBoldBlackText, {paddingBottom:'5%', fontSize: 28,}]}>First a couple of details...</Text>
                        <FormField
                            title={'Email'}
                            setField={setEmail}
                            type={'email'}
                            value={email}
                        />
                        <FormField
                            title={'Password'}
                            setField={setPassword}
                            type={'password'}
                            value={password}
                        />
                        <FormField
                            title={'Confirm Password'}
                            setField={setPasswordConfirmation}
                            type={'password'}
                            value={passwordConfirmation}
                        />
                        <Text
                            style={[ textStyles.hyperlink]}
                            onPress={() => navigation.navigate('Log In Page')}
                        >Already have an account? Log in
                        </Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <CustomButton
                            color={'green'}
                            text={'Next'}
                            onPress={registerCoffeeShop}
                            widthRatio={0.91}
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

    buttonContainer: {
        marginBottom: '4%',
        flex:2,
        justifyContent: 'flex-end',
    },
});

export default SignUpPageOne;
