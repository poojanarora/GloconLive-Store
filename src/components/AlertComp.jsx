import React from 'react';
import {
    Alert
} from 'react-native';


export default showAlertPopup = (title, msg, buttonText, navigateTo) => {
    Alert.alert(
        title,
        msg,
        [
            {
                text: buttonText,
                onPress: () => (navigateTo) ? navigateTo() : console.log('button pressed')
            },
        ]
    );
}