import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import {
  scale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';

import { COLORS } from '../constant';

const ButtonComp = ({
  btnText = '',
  btnStyle = {},
  btnTextStyle = {},
  action,
  disabled = false,
  loading = false,
}) => {
  const disabledStyle = disabled ? { opacity: 0.6 } : {}
  const getView = () => {
    let ele = null;
    if (loading) {
      ele = <ActivityIndicator size='small' color={'#000'} />;
    } else {
      ele = (
        <Text style={{ ...styles.btnTextStyle, ...btnTextStyle }}>{btnText}</Text>
      );
    }
    return ele;
  };
  return (
    <TouchableOpacity
      style={{ ...styles.btnStyle, ...btnStyle, ...disabledStyle }}
      disabled={disabled}
      onPress={action}>
      {getView()}
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
