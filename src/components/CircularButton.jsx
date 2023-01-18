import React from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import {
  scale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import {COLORS} from '../constant';

const CircularButton = ({
  btnIcon,
  btnStyle = {},
  btnIconStyle = {},
  btnAction,
}) => {
  return (
    <TouchableOpacity
      style={{...styles.btnStyle, ...btnStyle}}
      onPress={btnAction}>
      <Image
        style={{...styles.btnIconStyle, ...btnIconStyle}}
        source={btnIcon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    height: moderateScale(55),
    width: moderateScale(55),
    borderRadius: scale(55 / 2),
    justifyContent: 'center',
    alignItems: 'center',
    top: 25,
    marginHorizontal: moderateScale(5),
    backgroundColor: COLORS.white,
  },
  btnIconStyle: {
    height: moderateScale(30),
    width: moderateScale(30),
    resizeMode: 'contain',
  },
});

export default CircularButton;
