import React, {useContext, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Alert,
    StatusBar,
    Linking,
    Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {GlobalContext} from '../../App';
import FormField from '../sub-components/FormField';
import PrimaryButton from "../sub-components/PrimaryButton";

const AccountManagementPage = ({navigation}) => {
    const globalContext = useContext(GlobalContext);
    const [name, setName] = useState(globalContext.coffeeShopObj.Name);
    const [intro, setIntro] = useState(globalContext.coffeeShopObj.Intro);
    const [location, setLocation] = useState({
        latitude: globalContext.coffeeShopObj.Location.latitude,
        longitude: globalContext.coffeeShopObj.Location.longitude,
    });

    /*
    Simple function to log out, triggers state changes in App.
     */
    async function logout() {
        await auth().signOut().catch(e => alert(e.message));
    }

    /*
    Function to change details of a CoffeeShop model in the database. Recomputes de location with the new coordinates.
     */
    async function updateDetails() {
        await firestore()
            .collection('CoffeeShop')
            .doc(globalContext.coffeeShopRef)
            .update({
                Name: name,
                Intro: intro,
                Location: new firestore.GeoPoint(location.latitude, location.longitude), //Default location: 10 Downing Street.
            }).then(r => {
                Alert.alert('Success', 'Details Updated.');
                navigation.navigate('Orders Page');
            })
            .catch( e => console.log(e));
    }

    /*
    Navigation functionality: go back.
     */
    function goBack() {
        navigation.goBack();
    }


    return (
        <View style={styles.wrapper}>
            <StatusBar translucent={true} backgroundColor="transparent" />
            <View style={styles.logInForm}>
                <Text style={styles.formTitle}>
                    {globalContext.coffeeShopObj.Name}
                </Text>
                <FormField
                    style={styles.element}
                    title={'Name'}
                    setField={setName}
                    type={'name'}
                    value={name}
                />
                <FormField
                    style={styles.element}
                    title={'Intro'}
                    setField={setIntro}
                    type={'multiline'}
                    value={intro}
                />
                <View style={styles.namesContainer}>
                    <FormField
                        style={[styles.subNameContainer, styles.subNameContainerLeft]}
                        title={'Latitude'}
                        setField={value => setLocation({latitude: parseFloat(value), longitude: location.longitude})}
                        value={location.latitude.toString()}
                    />
                    <FormField
                        style={[styles.subNameContainer]}
                        title={'Longitude'}
                        setField={value => setLocation({latitude: location.latitude, longitude: parseFloat(value)})}
                        value={location.longitude.toString()}
                    />
                </View>
                <Pressable
                    onPress={() => Linking.openURL('http://www.google.com/maps/place/' + location.latitude + ',' + location.longitude)}
                    style={styles.hyperlink}
                >
                    <Icon size={30} color="black" name="map-marker" />
                    <Text style={styles.hyperlinkText}> Open in Google Maps</Text>
                </Pressable>
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.updateButton}>
                    <PrimaryButton
                        buttonText={'Save Details'}
                        onPress={updateDetails}
                    />
                </View>
                <View style={styles.logoutButton}>
                    <PrimaryButton
                        buttonText={'Log Out'}
                        onPress={() => logout()}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#F2F2F2',
        padding: '5%',
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
    },
    namesContainer: {
        flexDirection: 'row',
        display: 'flex',
        paddingVertical: '2%',
    },
    subNameContainer: {
        flex: 1,
    },
    subNameContainerLeft: {
        marginRight: '5%',
    },
    buttonContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    },
    hyperlink: {
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        color: '#3366BB'
    },
    hyperlinkText: {
        color: '#3366BB',
        textDecorationLine: 'underline',
    },
    updateButton: {
        height: 65,
        width: 300,
        justifyContent: 'center',
        marginHorizontal: '20%',
        backgroundColor: '#4273D3',
        marginVertical: '5%',
        alignContent: "center",
    },
    logoutButton: {
        height: 65,
        width: 300,
        justifyContent: 'center',
        marginHorizontal: '20%',
        backgroundColor: '#CE316A',
        marginVertical: '5%',
        alignContent: "center",
    },
});

export default AccountManagementPage;
