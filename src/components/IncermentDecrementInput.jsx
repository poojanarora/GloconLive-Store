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

const IncrementDecrementInput = ({
  value,
  incrementIcon,
  decrementIcon,
  error,
  incrementAction,
  decrementAction,
}) => {
  return (
    <>
      <View style={[styles.inputSectionWrapper, error && styles.error]}>
        <View style={styles.inputLeftSectionWrapper}>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Number of device : {value}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.inputRightSectionWrapper}
          onPress={incrementAction}>
          <Image style={styles.iconImage} source={incrementIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.inputRightSectionWrapper}
          onPress={decrementAction}>
          <Image style={styles.iconImage} source={decrementIcon} />
        </TouchableOpacity>
      </View>
      {error && (
        <View style={styles.errorMessageWrapper}>
          <Text style={styles.errorMessage}>{error}</Text>
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
    paddingVertical: moderateVerticalScale(15),
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
    //backgroundColor: 'green',
  },
  inputWrapper: {
    paddingLeft: moderateScale(10),
  },
  inputLabel: {
    marginHorizontal: moderateScale(5),
    //marginTop: moderateVerticalScale(8),
    fontSize: scale(14),
    color: COLORS.black,
    fontWeight: '500',
  },
  input: {
    paddingVertical: moderateVerticalScale(8),
    fontSize: scale(10),
    fontWeight: '500',
    color: COLORS.black,
    paddingLeft: moderateScale(5),
    //backgroundColor: 'blue',
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

export default IncrementDecrementInput;
