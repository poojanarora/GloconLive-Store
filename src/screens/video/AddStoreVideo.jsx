import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import BrowseFiles from '../../components/BrowseFiles';
import IconInputWithoutLabel from '../../components/IconInputWithoutLabel';
import PopupContent from '../../components/PopupContent';
import {COLORS, images} from '../../constant';
import showAlertPopup from '../../components/AlertComp';
import {
  handelVideoTitle,
  handelVideoUpload,
} from '../../actions/shopVideoAction';

const AddStoreVideoComponent = ({
  navigation,
  handelVideoTitle,
  handelVideoUpload,
  videoTitle,
  video,
  profile,
}) => {
  const onShowPreview = () => {
    if (video && video.uri) {
      navigation.navigate('ShopVideoPreview');
    } else {
      showAlertPopup('Error', 'Please select a video for preview.', 'ok');
    }
  };

  const onCancel = () => {
    navigation.navigate('ViewProfile');
  };

  const handelVideoTitleChange = e => {
    handelVideoTitle(e);
  };

  const onUpload = async () => {
    await handelVideoUpload(profile.id, videoTitle, video);
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
        primaryButtonText="Upload"
        dangerButtonText="Preview Video">
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
    profile: state.profile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handelVideoTitle: videoTitle => dispatch(handelVideoTitle(videoTitle)),
    handelVideoUpload: (storeId, videoTitle, video) =>
      dispatch(handelVideoUpload(storeId, videoTitle, video)),
  };
};

const AddStoreVideo = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddStoreVideoComponent);

export default AddStoreVideo;
