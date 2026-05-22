import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import BrowseFiles from '../../components/BrowseFiles';
import IconInputWithoutLabel from '../../components/IconInputWithoutLabel';
import PopupContent from '../../components/PopupContent';
import { COLORS, images } from '../../constant';
import showAlertPopup from '../../components/AlertComp';
import {
  handelVideoTitle,
  handelVideoUpload,
} from '../../actions/shopVideoAction';

const AddStoreVideoComponent = ({
  navigation,
  handelVideoTitle: handleVideoTitleAction,
  handelVideoUpload: handleVideoUploadAction,
  videoTitle,
  video,
  profile,
  uploadStatus,
}) => {
  const isUploading = uploadStatus === 'uploading';

  const onShowPreview = () => {
    if (video && video.uri) {
      navigation.navigate('ShopVideoPreview');
    } else {
      showAlertPopup('Error', 'Please select a video for preview.', 'ok');
    }
  };

  const onCancel = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }
    navigation.navigate('ViewProfile');
  };

  const handelVideoTitleChange = e => {
    handleVideoTitleAction(e);
  };

  const onUpload = async () => {
    if (isUploading) {
      return;
    }

    if (!videoTitle?.trim()) {
      showAlertPopup('Error', 'Please enter a video title.', 'Ok');
      return;
    }

    if (!video?.uri) {
      showAlertPopup('Error', 'Please select a video to upload.', 'Ok');
      return;
    }

    // Start upload in background and immediately return user to profile.
    // This avoids blocking the UI with long-running upload wait time.
    Promise.resolve(
      handleVideoUploadAction(profile.id, videoTitle, video, {
        showLoader: false,
        showSuccessPopup: false,
        showErrorPopup: false,
      }),
    ).catch(() => {});
    onCancel();
  };

  return (
    <SafeAreaView style={styles.safeAreaViewStyle}>
      <PopupContent
        closeAction={onShowPreview}
        cancelAction={onCancel}
        submitAction={onUpload}
        title="Add Store Video"
        subTitle="Add store video and title for same video"
        showFooter={true}
        primaryButtonText="Upload Video"
        dangerButtonText="Preview Video"
        submitDisabled={isUploading}
        primaryButtonLoading={isUploading}
      >
        <IconInputWithoutLabel
          placeholder="Video Title Here"
          value={videoTitle}
          name="videoTitle"
          showIcon={false}
          icon={images.tick}
          error={false}
          errorMessage="Please enter video title."
          onChangeText={handelVideoTitleChange}
        />
        <BrowseFiles />
      </PopupContent>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaViewStyle: {
    flex: 1,
    backgroundColor: COLORS.primaryBackgroungColor,
  },
});

const mapStateToProps = state => {
  return {
    videoTitle: state.shopVideoPreview.shopVideoTitle,
    video: state.shopVideoPreview.shopVideo,
    uploadStatus: state.shopVideoPreview.upload.status,
    profile: state.profile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handelVideoTitle: videoTitle => dispatch(handelVideoTitle(videoTitle)),
    handelVideoUpload: (storeId, videoTitle, video, options) =>
      dispatch(handelVideoUpload(storeId, videoTitle, video, options)),
  };
};

const AddStoreVideo = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddStoreVideoComponent);

export default AddStoreVideo;
