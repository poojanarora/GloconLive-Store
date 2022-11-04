import React, {useEffect} from 'react';
import {SafeAreaView, ImageBackground} from 'react-native';
import styles from './styles';
import {images} from '../../constant';
import {localStorageGetItem} from '../../hooks/useAsyncStorage';
import {connect} from 'react-redux';
import {setAuth} from '../../actions/appAction';

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
      navigation.replace('PrivateStackScreen');
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
