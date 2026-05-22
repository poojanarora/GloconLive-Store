import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { moderateScale } from 'react-native-size-matters';
import { dismissLocationVideoUploadBanner } from '../actions/locationAction';
import { COLORS } from '../constant';

const AUTO_HIDE_DELAY_MS = 4000;

const LocationVideoUploadBanner = () => {
  const dispatch = useDispatch();
  const upload = useSelector(state => state.location.locationVideoUpload);
  const hideTimerRef = useRef(null);

  useEffect(() => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }

    if (
      upload.visible &&
      (upload.status === 'success' || upload.status === 'error')
    ) {
      hideTimerRef.current = setTimeout(() => {
        dispatch(dismissLocationVideoUploadBanner());
      }, AUTO_HIDE_DELAY_MS);
    }

    return () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
    };
  }, [dispatch, upload.status, upload.visible]);

  if (!upload.visible || upload.status === 'idle') {
    return null;
  }

  const isUploading = upload.status === 'uploading';
  const isError = upload.status === 'error';

  return (
    <View pointerEvents="box-none" style={styles.wrapper}>
      <View
        style={[
          styles.banner,
          isUploading && styles.uploadingBanner,
          !isUploading && !isError && styles.successBanner,
          isError && styles.errorBanner,
        ]}
      >
        <View style={styles.textSection}>
          <Text style={styles.titleText}>
            {isUploading
              ? 'Location Video Upload In Progress'
              : isError
              ? 'Location Video Upload Failed'
              : 'Location Video Upload Complete'}
          </Text>
          <Text style={styles.messageText}>{upload.message}</Text>
        </View>
        <TouchableOpacity
          style={styles.dismissButton}
          onPress={() => dispatch(dismissLocationVideoUploadBanner())}
        >
          <Text style={styles.dismissText}>Dismiss</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: moderateScale(26),
    left: moderateScale(16),
    right: moderateScale(16),
    zIndex: 1000,
  },
  banner: {
    borderRadius: moderateScale(12),
    paddingHorizontal: moderateScale(14),
    paddingVertical: moderateScale(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000000',
    shadowOpacity: 0.16,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
  },
  uploadingBanner: {
    backgroundColor: '#1f4c6b',
  },
  successBanner: {
    backgroundColor: '#256f3a',
  },
  errorBanner: {
    backgroundColor: '#a63b2d',
  },
  textSection: {
    flex: 1,
    paddingRight: moderateScale(12),
  },
  titleText: {
    color: COLORS.white,
    fontWeight: '700',
    marginBottom: moderateScale(4),
  },
  messageText: {
    color: COLORS.white,
    opacity: 0.95,
  },
  dismissButton: {
    paddingVertical: moderateScale(4),
    paddingHorizontal: moderateScale(6),
  },
  dismissText: {
    color: COLORS.white,
    fontWeight: '600',
  },
});

export default LocationVideoUploadBanner;
