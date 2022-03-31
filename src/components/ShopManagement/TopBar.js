import React, {useContext, useState} from 'react';
import {StatusBar, StyleSheet, Switch, Text, View} from 'react-native';
import {GlobalContext} from '../../../App';
import {setIsOpen} from '../../firebase/queries';
import CustomButton from "../../sub-components/CustomButton";
import textStyles from "../../stylesheets/textStyles";

/**
 * Top bar for navigating through the app
 * @param navigation The navigation object
 */
const TopBar = ({navigation}) => {
  const globalContext = useContext(GlobalContext);
  const [isEnabled, setIsEnabled] = useState(
    globalContext.coffeeShopObj.IsOpen,
  );

  /**
   * Toggles the switch and opens/closes shop accordingly
   */
  function toggleSwitch() {
    setIsEnabled(prevState => !prevState);
    setIsOpen(!isEnabled, globalContext.coffeeShopRef);
  }

  /**
   * Navigate to account management page
   */
  function goToAccountManagement() {
    navigation.navigate('Account Management');
  }

  return (
      <>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <View style={styles.container}>
          <CustomButton
              color={'green'}
              text={'Manage Shop'}
              onPress={goToAccountManagement}
              widthRatio={0.30}
              buttonHeight={75}
          />
          <View style={styles.manageOrdersHeadline}>
            <Text style={textStyles.genericBlackText}>Accepting Orders: </Text>
            <Text style={[textStyles.genericBoldBlackText]}>
              {isEnabled ? 'Yes' : 'No'}
            </Text>
          </View>
          <View >
            <Switch
                testID={'switch'}
                trackColor={'#E0E0E0'}
                thumbColor={isEnabled ? '#218F89' : '#BE1753'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
                style={{transform: [{scaleX: 1.5}, {scaleY: 1.5}]}}
            />
          </View>
        </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '12%',
    paddingHorizontal: '3.5%',
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
  manageOrdersHeadline: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
  },
});

export default TopBar;
