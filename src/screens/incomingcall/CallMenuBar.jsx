import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {COLORS, images} from '../../constant';

const CallMenuBar = ({
  style,
  onEndCall,
  onMicToggle,
  onCameraToggle,
  toggleFrontCamera,
  onMorePress,
}) => {
  return (
    <View style={{...style, ...styles.mainContainer}}>
      <View style={styles.endCallView}>
        <TouchableOpacity style={styles.endCallButton} onPress={onEndCall}>
          <Image
            style={styles.endCallImage}
            source={images.hang_up}
            resizeMode="center"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={{...styles.subContainer, marginEnd: moderateScale(10)}}>
          <TouchableOpacity style={styles.imageButton} onPress={onCameraToggle}>
            <Image
              style={styles.image}
              source={images.video_camera}
              resizeMode="center"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.imageButton} onPress={onMicToggle}>
            <Image
              style={styles.image}
              source={images.mute}
              resizeMode="center"
            />
          </TouchableOpacity>
        </View>
        <View style={{...styles.subContainer, marginStart: moderateScale(10)}}>
          <TouchableOpacity
            style={styles.imageButton}
            onPress={toggleFrontCamera}>
            <Image
              style={styles.image}
              source={images.camera}
              resizeMode="center"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.imageButton} onPress={onMorePress}>
            <Image
              style={styles.image}
              source={images.more}
              resizeMode="center"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: moderateVerticalScale(89),
    width: moderateScale(230),
    alignItems: 'center',
  },
  container: {
    height: moderateVerticalScale(52),
    width: moderateScale(264),
    backgroundColor: COLORS.primary,
    position: 'absolute',
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    display: 'flex',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    flexDirection: 'row',
    bottom: 0,
  },
  subContainer: {
    flex: 0.5,
    justifyContent: 'space-evenly',
    alignContent: 'center',
    flexDirection: 'row',
    paddingTop: moderateScale(10),
  },
  imageButton: {
    height: moderateVerticalScale(32),
    width: moderateScale(35),
    backgroundColor: COLORS.primaryTint,
    marginTop: moderateScale(6),
    borderRadius: moderateScale(4),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: moderateVerticalScale(24),
    width: moderateScale(24),
  },
  endCallView: {
    height: moderateVerticalScale(70),
    width: moderateScale(70),
    backgroundColor: COLORS.primary,
    borderRadius: moderateScale(35),
    position: 'absolute',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  endCallButton: {
    backgroundColor: 'red',
    height: moderateVerticalScale(50),
    width: moderateScale(50),
    borderRadius: moderateScale(25),

    justifyContent: 'center',
    alignItems: 'center',
  },
  endCallImage: {
    height: moderateVerticalScale(40),
    width: moderateScale(38),
  },
});

export default CallMenuBar;
