import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { scale, moderateScale } from 'react-native-size-matters';
import { images } from '../constant';
import { useNavigation } from '@react-navigation/native';

const BackIcon = props => {
  const navigation = useNavigation();

  const handelClick = () => {
    if (typeof props.onBack === 'function') {
      props.onBack();
      return;
    }

    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <TouchableOpacity style={styles.menuIconWrapper} onPress={handelClick}>
      <Image style={styles.backImage} source={images.arrow_left} />
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
  backImage: {
    width: moderateScale(22),
    height: moderateScale(22),
    resizeMode: 'contain',
  },
});

export default BackIcon;
