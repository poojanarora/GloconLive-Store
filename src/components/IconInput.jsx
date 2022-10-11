import React, {useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Image
} from 'react-native';
import { scale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
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
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        marginTop: moderateVerticalScale(25),
        borderRadius: moderateScale(5),
        elevation: 5,
    },
    error:{
        borderWidth: 1,
        borderColor: 'red'
    },
    errorMessageWrapper:{
        marginHorizontal: moderateScale(5),
        marginTop: moderateVerticalScale(2),
    },
    errorMessage: {
        fontSize: scale(12),
        color: 'red'
    },
    inputLeftSectionWrapper: {
        flex: 5,
        justifyContent: 'center',
    },
    inputWrapper: {
        paddingLeft: moderateScale(10),
    },
    inputLabel: {
        marginHorizontal: moderateScale(5),
        marginTop: moderateVerticalScale(10),
        fontSize: scale(12)
    },
    input: {
        paddingVertical: moderateVerticalScale(2),
        fontSize: scale(12),
        fontWeight: '500',
        color:COLORS.black,
    },
    inputRightSectionWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconImage:{
        width: moderateScale(20),
        height: moderateScale(20),
        resizeMode: 'contain',
    }
});

export default IconInput;