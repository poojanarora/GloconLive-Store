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

const IconInputWithoutLabel = (props) => {
    return(
        <>
        <View style={[styles.inputSectionWrapper, (props.error === true) && styles.error]}>
            <View style={styles.inputLeftSectionWrapper}>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder={props.placeholder}
                        name={props.name}
                        placeholderTextColor={COLORS.black}
                    />
                </View>
            </View>
            {
                (props.showIcon === true) && (
                    <View style={styles.inputRightSectionWrapper}>
                        <Image style={styles.iconImage} source={props.icon} />
                    </View>
                )
            }
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
        height: hp('8%'),
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        marginHorizontal: wp('4%'),
        marginTop: hp('3%'),
        borderRadius: wp('1.5%'),
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity:  0.17,
        shadowRadius: 3.05,
        elevation: 4
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
        color: 'red'
    },
    inputLeftSectionWrapper: {
        flex: 5,
        justifyContent: 'center',
    },
    inputWrapper: {
        paddingLeft: wp('3%'),
        //backgroundColor: 'yellow',
    },
    input: {
        height: hp('6%'),
        fontSize: wp('4%'),
        fontWeight: '500',
        color:COLORS.black,
        //backgroundColor: 'orange',
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

export default IconInputWithoutLabel;