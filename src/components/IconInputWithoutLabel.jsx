import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Image } from 'react-native';
import {
  scale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import { COLORS } from '../constant';

const IconInputWithoutLabel = props => {
  return (
    <>
      <View style={[styles.inputSectionWrapper, props.error && styles.error]}>
        <View style={styles.inputLeftSectionWrapper}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder={props.placeholder}
              secureTextEntry={props.isSecure ? props.isSecure : false}
              name={props.name}
              placeholderTextColor={COLORS.black}
              value={props.value}
              onChangeText={props.onChangeText}
              editable={!props.noneditable}
            />
          </View>
        </View>
        {props.showIcon === true && (
          <View style={styles.inputRightSectionWrapper}>
            <Image style={styles.iconImage} source={props.icon} />
          </View>
        )}
      </View>
      {props.error && (
        <View style={styles.errorMessageWrapper}>
          <Text style={styles.errorMessage}>{props.error}</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  inputSectionWrapper: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    marginHorizontal: moderateScale(15),
    marginTop: moderateScale(20),
    borderRadius: moderateScale(5),
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  error: {
    borderWidth: 1,
    borderColor: 'red',
  },
  errorMessageWrapper: {
    //backgroundColor: 'yellow',
    marginHorizontal: moderateScale(15),
    marginTop: moderateVerticalScale(2),
  },
  errorMessage: {
    color: 'red',
    fontSize: scale(12),
  },
  inputLeftSectionWrapper: {
    flex: 5,
    justifyContent: 'center',
  },
  inputWrapper: {
    paddingLeft: moderateScale(10),
    //backgroundColor: 'yellow',
  },
  input: {
    paddingVertical: moderateVerticalScale(20),
    fontSize: scale(12),
    fontWeight: '400',
    color: COLORS.black,
    //backgroundColor: 'orange',
  },
  inputRightSectionWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'blue'
  },
  iconImage: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
  },
});

export default IconInputWithoutLabel;
