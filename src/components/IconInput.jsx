import React, {useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Image
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { COLORS } from "../constant";

const IconInput = (props) => {
    return(
        <>
        <View style={[styles.inputSectionWrapper, (props.error === true) && styles.error]}>
            <View style={styles.inputLeftSectionWrapper}>
                <View style={styles.inputWrapper}>
                    <Text style={styles.inputLabel}>{props.label}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={props.placeholder}
                        name={props.name}
                        secureTextEntry={props.isSecure}
                    />
                </View>
                
            </View>
            <View style={styles.inputRightSectionWrapper}>
                <Image style={styles.iconImage} source={props.icon} />
            </View>
        </View>
        {
            (props.error === true) && (
                <View style={styles.errorMessageWrapper}>
                    <Text style={styles.errorMessage}>{props.errorMessage}</Text>
                </View>
            )
        }
        
        </>
    )
}

const styles = StyleSheet.create({
    inputSectionWrapper: {
        height: hp('10%'),
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        marginHorizontal: wp('3%'),
        marginTop: hp('3%'),
        borderRadius: wp('1.5%'),
        elevation: 5,
    },
    error:{
        borderWidth: wp('0.30%'),
        borderColor: 'red'
    },
    errorMessageWrapper:{
        //backgroundColor: 'yellow',
        marginHorizontal: wp('4%'),
        marginTop: hp('1%'),
    },
    errorMessage: {
    },
    inputLeftSectionWrapper: {
        flex: 5,
        justifyContent: 'center',
    },
    inputWrapper: {
        paddingLeft: wp('3%'),
    },
    inputLabel: {
        marginHorizontal: hp('0.50%'),
        marginTop: hp('1%'),
        fontSize: wp('4%')
    },
    input: {
        height: hp('5%'),
        fontSize: wp('4%'),
        fontWeight: '500',
        color:COLORS.black
    },
    inputRightSectionWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'blue'
    },
    iconImage:{
        width: wp('6%'),
        resizeMode: 'contain',
    }
});

export default IconInput;