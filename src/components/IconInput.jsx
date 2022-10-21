import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';

import {
  scale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import {COLORS} from '../constant';

const IconInput = props => {
  return (
    <>
      <View
        style={[
          styles.inputSectionWrapper,
          props.error.length > 0 && styles.error,
        ]}>
        <View style={styles.inputLeftSectionWrapper}>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>{props.label}</Text>
            <TextInput
              style={styles.input}
              placeholder={props.placeholder}
              name={props.name}
              secureTextEntry={props.isSecure}
              value={props.value}
              onChangeText={props.onChangeText}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.inputRightSectionWrapper}
          onPress={props.onClick}>
          <Image style={styles.iconImage} source={props.icon} />
        </TouchableOpacity>
      </View>
      {props.error.length > 0 && (
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
    marginTop: moderateVerticalScale(25),
    borderRadius: moderateScale(5),
    elevation: 5,
  },
  error: {
    borderWidth: 1,
    borderColor: 'red',
  },
  errorMessageWrapper: {
    marginHorizontal: moderateScale(5),
    marginTop: moderateVerticalScale(2),
  },
  errorMessage: {
    fontSize: scale(12),
    color: 'red',
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
    fontSize: scale(10),
  },
  input: {
    paddingVertical: moderateVerticalScale(10),
    fontSize: scale(10),
    fontWeight: '500',
    color: COLORS.black,
    paddingLeft: moderateScale(5),
  },
  inputRightSectionWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
  },
});

export default IconInput;
