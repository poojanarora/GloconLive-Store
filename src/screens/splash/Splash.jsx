import React, {useEffect} from 'react';
import {SafeAreaView, ImageBackground} from 'react-native';
import styles from './styles';
import {images} from '../../constant';
import {localStorageGetItem} from '../../hooks/useAsyncStorage';
import {connect} from 'react-redux';
import {setAuth} from '../../actions/appAction';
import {LOGIN_MODES} from '../../utils/appConstants';

const SplashComponent = ({navigation, setAuth}) => {
  useEffect(() => {
    console.log('Splash screen mounted');

    setTimeout(() => {
      checkIsLoggedIn();
    }, 4000);

    return () => {
      console.log('Splash screen unmounted');
    };
  }, []);

  /**
   * Function to check user is already logged in or not.
   */
  const checkIsLoggedIn = async () => {
    const data = await localStorageGetItem();
    if (data) {
      await setAuth(data);
      if (data.loginMode === LOGIN_MODES.DEVICE) {
        navigation.replace('IncomingCallStackScreen');
      } else if (data.loginMode === LOGIN_MODES.CONCEIRGE) {
        navigation.replace('ConceirgeShopperPrivateStackScreen');
      } else {
        navigation.replace('PrivateStackScreen');
      }
    } else {
      navigation.replace('PublicStackScreen');
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaViewStyle}>
      <ImageBackground
        source={images.splash_screen}
        resizeMode="cover"
        style={styles.splashImageStyle}
      />
    </SafeAreaView>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    setAuth: payload => dispatch(setAuth(payload)),
  };
};

const Splash = connect(null, mapDispatchToProps)(SplashComponent);

export default Splash;
