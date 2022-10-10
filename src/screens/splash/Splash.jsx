import React, {useEffect} from 'react';
import {
    SafeAreaView,
    View,
    Text
} from 'react-native';
import styles from './styles';


const Splash = ({ navigation }) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.replace('PublicStackScreen');
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
