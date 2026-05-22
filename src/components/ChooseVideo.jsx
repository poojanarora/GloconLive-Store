import React from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { StyleSheet, TouchableOpacity, Text, Image, View } from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import VideoThumbnail from './VideoThumbnail';
import { COLORS } from '../constant';
import showAlertPopup from './AlertComp';

import AlertComp from './AlertComp';
// import DocumentPicker, { types } from 'react-native-document-picker';
import { isCancel } from '@react-native-documents/picker';
import BrowseFiles from './BrowseFiles';

const ChooseVideo = ({ selectedVideo, onVideoSelection }) => {
  const hasUploadedVideo =
    !!selectedVideo?.uri && (!!selectedVideo?.fileName || !!selectedVideo?.type);

  const logSelectedVideoDiagnostics = video => {
    const durationInSeconds = video?.duration || 0;
    const fileSizeBytes = video?.fileSize || 0;
    const fileSizeInMB = fileSizeBytes ? (fileSizeBytes / (1024 * 1024)).toFixed(2) : '0.00';
    const estimatedBitrateKbps =
      durationInSeconds > 0
        ? ((fileSizeBytes * 8) / durationInSeconds / 1000).toFixed(2)
        : '0.00';

    console.log('[video-diagnostics] selection', {
      fileName: video?.fileName || video?.name,
      type: video?.type,
      durationInSeconds,
      fileSizeBytes,
      fileSizeInMB,
      estimatedBitrateKbps,
      uri: video?.uri,
      note: 'Client sends original selected file. No client-side compression is applied in this flow.',
    });
  };

  const validateAndSelectVideo = result => {
    const video = result?.assets?.[0];

    if (result?.didCancel || !video) {
      return;
    }

    if (video?.duration > 40) {
      showAlertPopup('Oops', 'Video duration should be 40 seconds or less', 'Cancel');
      return;
    }

    if (video?.fileSize > 209715200) {
      showAlertPopup('Oops', 'Video file size should be 200 MB or less', 'Cancel');
      return;
    }
    
    logSelectedVideoDiagnostics(video);
    onVideoSelection(video);
  };

  const pickVideo = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'video',
      });
      validateAndSelectVideo(result);
    } catch (err) {
      if (isCancel(err)) {
        console.log('User cancelled gallery picker');
      } else {
        console.log('Unknown error selecting video', JSON.stringify(err));
      }
    }
  };

  const recordVideo = async () => {
    try {
      const result = await launchCamera({
        mediaType: 'video',
        durationLimit: 40,
      });
      validateAndSelectVideo(result);
    } catch (err) {
      if (isCancel(err)) {
        console.log('User cancelled camera recording');
      } else {
        console.log('Unknown error recording video', JSON.stringify(err));
      }
    }
  };

  return (
    <>
      {selectedVideo?.uri ? (
        <>
          <View style={styles.actionWrapper}>
            <TouchableOpacity
              style={[styles.browseFileSectionWrapper, styles.actionButton]}
              onPress={pickVideo}>
              <Text style={styles.browseFiles}>Browse Files</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.browseFileSectionWrapper, styles.actionButton]}
              onPress={recordVideo}>
              <Text style={styles.browseFiles}>Record Video</Text>
            </TouchableOpacity>
          </View>
          {hasUploadedVideo ? <VideoThumbnail url={selectedVideo.uri} /> : null}
        </>
      ) : (
        <View style={styles.actionWrapper}>
          <BrowseFiles browseFiles={pickVideo} />
          <TouchableOpacity
            style={[styles.browseFileSectionWrapper, styles.recordButton]}
            onPress={recordVideo}>
            <Text style={styles.browseFiles}>Record Video</Text>
          </TouchableOpacity>
        </View>
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
  actionWrapper: {
    marginHorizontal: moderateScale(15),
    marginTop: moderateScale(20),
    gap: moderateScale(10),
  },
  actionButton: {
    marginHorizontal: 0,
    marginTop: 0,
  },
  recordButton: {
    marginHorizontal: 0,
    marginTop: 0,
    borderStyle: 'solid',
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
