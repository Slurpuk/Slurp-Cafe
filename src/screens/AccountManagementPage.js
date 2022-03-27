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
import textStyles from "../stylesheets/textStyles";
import CustomButton from "../sub-components/CustomButton";
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
    await auth()
      .signOut()
      .catch(e => alert(e.message));
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
      })
      .then(r => {
        Alert.alert('Success', 'Details Updated.');
        navigation.navigate('Orders Page');
      })
      .catch(e => console.log(e));
  }

  return (
    <View style={styles.wrapper}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <View style={styles.logInForm}>
        <Text style={[textStyles.formTitle, {textAlign: 'center'}]}>{globalContext.coffeeShopObj.Name}</Text>
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
            setField={value =>
              setLocation({
                latitude: parseFloat(value),
                longitude: location.longitude,
              })
            }
            value={location.latitude.toString()}
          />
          <FormField
            style={[styles.subNameContainer]}
            title={'Longitude'}
            setField={value =>
              setLocation({
                latitude: location.latitude,
                longitude: parseFloat(value),
              })
            }
            value={location.longitude.toString()}
          />
        </View>
        <Pressable
          onPress={() =>
            Linking.openURL(
              'http://www.google.com/maps/place/' +
                location.latitude +
                ',' +
                location.longitude,
            )
          }
          style={styles.hyperlink}
        >
          <Icon size={30} color="black" name="map-marker" />
          <Text style={styles.hyperlinkText}> Open in Google Maps</Text>
        </Pressable>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.updateButton}>
          <CustomButton
              color={'blue'}
              text={'Save Details'}
              onPress={updateDetails}
              widthRatio={0.36}
              buttonHeight={60}
          />
        </View>
        <View style={styles.logoutButton}>
          <CustomButton
              color={'red'}
              text={'Log Out'}
              onPress={() => logout()}
              widthRatio={0.36}
              buttonHeight={60}
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
    width: '100%',
  },
  hyperlink: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: '#3366BB',
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
    marginVertical: '5%',
    alignContent: 'center',
  },
  logoutButton: {
    height: 65,
    width: 300,
    justifyContent: 'center',
    marginHorizontal: '20%',
    marginVertical: '5%',
    alignContent: 'center',
  },
});

export default AccountManagementPage;
