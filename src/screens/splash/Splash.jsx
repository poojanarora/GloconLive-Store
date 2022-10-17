import React, {useEffect} from 'react';
import {
    SafeAreaView,
    ImageBackground,
} from 'react-native';
import styles from './styles';
import useAuth from '../../hooks/useAuth';
import { images } from '../../constant';


const Splash = ({ navigation }) => {
    const auth = useAuth();
    useEffect(() => {
        console.log("Splash screen mounted");
        setTimeout(() => {
            if(auth?.isLoggedIn === true) {
                navigation.replace('PrivateStackScreen');
            } else {
                navigation.replace('PublicStackScreen');
            }
        },4000)

        return () => {
            console.log("Splash screen unmounted");
        }
    },[]);

    return(
        <SafeAreaView style={styles.safeAreaViewStyle}>
            <ImageBackground source={images.splash_screen} resizeMode="cover" style={styles.splashImageStyle} />
        </SafeAreaView>
    )
};
export default Splash;
