import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { COLORS } from '../constant';

const SecondaryButton = (props) => {
    return(
        <TouchableOpacity style={styles.buttonPrimary(props.height,props.width)} onPress={props.action}>
            <Text style={styles.buttonText}>{props.text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonPrimary: (heightPercentage,widthPercentage) => {
        return {
            backgroundColor: COLORS.secondaryColor,
            height: (heightPercentage) ? hp(heightPercentage) : hp('7%'),
            width: (widthPercentage) ? wp(widthPercentage) : wp('80%'),
            borderRadius: wp('1.5%'),
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: COLORS.secondaryColor,
            shadowOffset: {
                width: 0,
                height: 9,
            },
            shadowOpacity:  0.22,
            shadowRadius: 9.22,
            elevation: 12
        }
    },
    buttonText:{
        color: COLORS.black,
        fontSize: wp('5%'),
        fontWeight: '400'
    }
});

export default SecondaryButton;