import React from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import {moderateScale, scale} from 'react-native-size-matters';
import {COLORS} from '../constant';
import showAlertPopup from './AlertComp';

import DocumentPicker, {types} from 'react-native-document-picker';

const ChooseVideo = ({selectedVideo, onVideoSelection}) => {
  const pickVideo = async () => {
    try {
      let result = await DocumentPicker.pick({
        type: types.video,
        copyTo: 'documentDirectory',
      });
      if (result.length !== 0) {
        onVideoSelection(result[0]);
      }
      // let result = await launchImageLibrary({
      //   mediaType: 'video',
      //   storageOptions: {
      //     skipBackup: true,
      //     waitUntilSaved: true,
      //   },
      // });
      // if (!result.didCancel) {
      //   onVideoSelection(result.assets[0]);
      // }
      // if (result.assets[0].fileSize > 3000000) {
      //   showAlertPopup(
      //     'Oops',
      //     'Video file size should be less than 3 MB',
      //     'Cancel',
      //   );
      // } else if (!result.didCancel) {
      //   onVideoSelection(result.assets[0]);
      // }
    } catch (e) {
      console.log('User Cancelled browser file');
    }
  };

  return (
    <TouchableOpacity
      style={styles.browseFileSectionWrapper}
      onPress={pickVideo}>
      {selectedVideo ? (
        <Image source={{uri: selectedVideo.uri}} style={styles.imgStyle} />
      ) : (
        <>
          <Text style={styles.textStyle}>
            Video is not available for selected location
          </Text>
          <Text style={styles.browseFiles}>Browse Files</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  browseFileSectionWrapper: {
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
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS.black,
    height: moderateScale(124),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: COLORS.primaryTextColor,
    fontSize: scale(12),
    fontWeight: '500',
  },
  imgStyle: {
    height: moderateScale(124),
    width: '100%',
    //resizeMode: 'cover',
  },
  browseFiles: {
    fontWeight: '500',
    fontSize: scale(12),
    color: COLORS.highLightColor,
    textDecorationLine: 'underline',
    marginTop: moderateScale(5),
  },
});

export default ChooseVideo;
