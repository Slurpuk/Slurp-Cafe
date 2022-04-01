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
import {GlobalContext} from '../../App';
import FormField from '../sub-components/FormField';
import textStyles from '../stylesheets/textStyles';
import CustomButton from '../sub-components/CustomButton';
import {logout, updateCoffeeShop} from '../firebase/queries';

/**
 * Account page for managing
 * @param navigation The navigation object
 */
const AccountManagementPage = ({navigation}) => {
  const globalContext = useContext(GlobalContext);
  const [name, setName] = useState(globalContext.coffeeShop.name);
  const [intro, setIntro] = useState(globalContext.coffeeShop.intro);
  const [location, setLocation] = useState(globalContext.coffeeShop.location);

  /**
   * Checks for simple form requirements
   * @return boolean Expressing the validity of the fields front-end wise
   */
  function processErrorsFrontEnd() {
    let validity = true;
    if (name === '') {
      validity = false;
      Alert.alert('Empty Shop name', 'Please enter your shop name.');
    } else if (intro === '') {
      validity = false;
      Alert.alert('Empty Description', 'Please enter your shop description.');
    } else if (intro.length > 200 || intro.length < 20) {
      validity = false;
      Alert.alert(
        'Description length',
        'The shop description must be between 20 and 200 characters long.',
      );
    } else if (
      location.latitude > 90 ||
      location.latitude < -90 ||
      location.longitude > 180 ||
      location.longitude < -180
    ) {
      validity = false;
      Alert.alert(
        'Location is not valid',
        'The latitude or longitude values are not valid.',
      );
    }

    return validity;
  }

  /**
    Function to change details of a CoffeeShop model in the database.
     */
  async function updateDetails() {
    if (processErrorsFrontEnd()) {
      await updateCoffeeShop(
        globalContext.coffeeShop.ref,
        name,
        intro,
        location,
      );
      navigation.navigate('Orders Page');
    }
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.topBar}>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <Text style={[textStyles.formTitle]}>
          {globalContext.coffeeShop.name}
        </Text>
      </View>
      <View style={styles.paddedContainer}>
        <View style={styles.formContainer}>
          <FormField
            style={styles.element}
            title={'Shop Name'}
            setField={setName}
            type={'name'}
            value={name}
          />
          <FormField
            style={styles.element}
            title={'Shop Description'}
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
            style={[
              textStyles.hyperlink,
              {display: 'flex', flexDirection: 'row', alignItems: 'center'},
            ]}
          >
            <Icon size={30} color="black" name="map-marker" />
            <Text style={[textStyles.hyperlink, {color: '#3366BB'}]}>
              {' '}
              Open in Google Maps
            </Text>
          </Pressable>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.updateButton}>
            <CustomButton
              color={'blue'}
              text={'Save Details'}
              onPress={updateDetails}
              widthRatio={0.42}
              buttonHeight={70}
            />
          </View>
          <View style={styles.logoutButton}>
            <CustomButton
              color={'red'}
              text={'Log Out'}
              onPress={() => logout()}
              widthRatio={0.42}
              buttonHeight={70}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    height: '12%',
    paddingHorizontal: '5%',
    width: '100%',
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
    paddingBottom: '5%',
  },
  formContainer: {
    flex: 1,
    paddingVertical: '10%',
  },
  paddedContainer: {
    display: 'flex',
    flex: 1,
    paddingHorizontal: '5%',
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
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: '4%',
  },
  updateButton: {
    marginRight: '7%',
  },
  logoutButton: {},
});

export default AccountManagementPage;
