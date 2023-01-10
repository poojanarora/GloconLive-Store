import React from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {StyleSheet, TouchableOpacity, Text, Image, View} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import VideoThumbnail from './VideoThumbnail';
import {COLORS} from '../constant';
import showAlertPopup from './AlertComp';

import DocumentPicker, {types} from 'react-native-document-picker';
import BrowseFiles from './BrowseFiles';

const ChooseVideo = ({selectedVideo, onVideoSelection}) => {
  const pickVideo = async () => {
    try {
      //Document picker example
      let result = await DocumentPicker.pick({
        type: types.video,
        copyTo: 'cachesDirectory',
      });
      if (result.length !== 0) {
        onVideoSelection(result[0]);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        console.log('User Cancelled browser file');
      } else {
        // For Unknown Error
        console.log('Unknown Error ', JSON.stringify(err));
      }
    }
  };

  return (
    <>
      {selectedVideo?.uri ? (
        <>
          <TouchableOpacity
            style={styles.browseFileSectionWrapper}
            onPress={pickVideo}>
            <Text style={styles.browseFiles}>Browse Files</Text>
          </TouchableOpacity>
          <VideoThumbnail url={selectedVideo.uri} />
        </>
      ) : (
        <BrowseFiles browseFiles={pickVideo} />
      )}
    </>
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
    //height: moderateScale(124),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateVerticalScale(5),
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
    //marginTop: moderateScale(5),
  },
});

export default ChooseVideo;
