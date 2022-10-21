import React, {useState} from 'react';
import {SafeAreaView, Text, StyleSheet, ImageBackground} from 'react-native';
import {
  scale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import {COLORS, images} from '../../constant';

const ApplicationStatus = ({route, navigation}) => {
  const {status} = route.params;
  return (
    <SafeAreaView style={styles.safeAreaViewStyle}>
      <ImageBackground
        source={images.application_status}
        resizeMode="cover"
        style={styles.backgroundImageStyle}>
        <Text style={styles.statusLabel}>{status}</Text>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaViewStyle: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.primaryBackgroungColor,
  },
  backgroundImageStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: scale(20),
    color: COLORS.primary,
    fontWeight: '600',
  },
});

export default ApplicationStatus;
