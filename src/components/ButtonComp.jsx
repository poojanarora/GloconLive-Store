import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  scale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';

import {COLORS} from '../constant';

const ButtonComp = ({
  btnText = '',
  btnStyle = {},
  btnTextStyle = {},
  action,
}) => {
  return (
    <TouchableOpacity
      style={{...styles.btnStyle, ...btnStyle}}
      onPress={action}>
      <Text style={{...styles.btnTextStyle, ...btnTextStyle}}>{btnText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: COLORS.primaryButtonColor,
    height: moderateScale(45),
    width: moderateScale(280),
    borderRadius: moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primaryButtonColor,
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.22,
    shadowRadius: 9.22,
    elevation: 12,
  },
  btnTextStyle: {
    color: COLORS.white,
    fontSize: scale(15),
    fontWeight: '400',
  },
});

export default ButtonComp;
