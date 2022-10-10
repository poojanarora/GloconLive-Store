import React, {useState} from 'react';
import {
    SafeAreaView,
    View,
    Text,
    ScrollView,
    useWindowDimensions
} from 'react-native';
import styles from './styles.js';
import { images } from '../../constant'
import IconInput from '../../components/IconInput.jsx';
import PrimaryButton from '../../components/PrimaryButton.jsx';

const Login = ({ navigation }) => {

    const { height, width } = useWindowDimensions();
    console.log('Height of device is ',height);
    console.log('width of device is ',width);

    const handelLogin = () => {
        console.log('Clicked on login');
        navigation.replace('PrivateStackScreen');
    }

    return(
       <SafeAreaView style={styles.safeAreaViewStyle}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.body}>
                    <View style={styles.mainSectionWrapper}>
                        <View style={styles.headerSectionWrapper}>
                            <Text style={styles.logoLabel}>GLOCON Live</Text>
                        </View>
                        <View style={styles.formSectionWrapper}>
                            <IconInput label="Email" placeholder="mynamein@gmail.com" name="email" icon={images.tick} isSecure={false} error={false} errorMessage="Please enter email" />
                            <IconInput label="Password" placeholder="********" name="password" icon={images.password_hidden_eye} isSecure={true} error={false} errorMessage="Please enter password" />
                            <View style={styles.signUpLabelWrapper}>
                                <Text style={styles.signUpLabel}>Dont have an account? <Text style={styles.labelPrimary}>Sign Up</Text></Text>
                            </View>
                            <View style={styles.buttonSectionWrapper}>
                                <PrimaryButton text="Sign In" action={handelLogin} />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView> 
       </SafeAreaView> 
    )
};

export default Login;