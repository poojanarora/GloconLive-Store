import React, { useState } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import {
  scale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import { images } from '../constant';
import { useNavigation } from '@react-navigation/native';

const BackIcon = props => {
  const navigation = useNavigation();

  const handelClick = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <TouchableOpacity style={styles.menuIconWrapper} onPress={handelClick}>
      <Image
        style={{
          width: moderateScale(22),
          height: moderateScale(22),
          resizeMode: 'contain',
        }}
        source={images.arrow_left}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuIconWrapper: {
    height: moderateScale(32),
    width: moderateScale(32),
    borderRadius: scale(5),
    backgroundColor: '#7dacaf',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BackIcon;
