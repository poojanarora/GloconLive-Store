import React, {useEffect} from 'react';
import {
    SafeAreaView,
    View,
    Text
} from 'react-native';
import styles from './styles';
import useAuth from '../../hooks/useAuth';


const Splash = ({ navigation }) => {

    const auth = useAuth();
    useEffect(() => {
        setTimeout(() => {
            if(auth?.isLoggedIn === true) {
                navigation.replace('PrivateStackScreen');
            } else {
                navigation.replace('PublicStackScreen');
            }
        },4000)
    },[]);

    return(
        <SafeAreaView style={styles.safeAreaViewStyle}>
            <View style={styles.body}>
                <Text style={styles.logoLabel}>GLOCON Live</Text>
            </View>
        </SafeAreaView>
    )
};
export default Splash;
