import React, {useEffect} from 'react';
import {SafeAreaView, ImageBackground} from 'react-native';
import styles from './styles';
import {images} from '../../constant';

const Splash = ({navigation}) => {
  useEffect(() => {
    console.log('Splash screen mounted');

    setTimeout(() => {
      navigation.replace('PublicStackScreen');
    }, 4000);

    return () => {
      console.log('Splash screen unmounted');
    };
  }, []);

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

export default Splash;
