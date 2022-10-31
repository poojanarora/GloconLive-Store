import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import BrowseFiles from '../../components/BrowseFiles';
import IconInputWithoutLabel from '../../components/IconInputWithoutLabel';
import PopupContent from '../../components/PopupContent';
import {COLORS, images} from '../../constant';
import showAlertPopup from '../../components/AlertComp';

const AddStoreVideoComponent = ({navigation, video}) => {
  const onShowPreview = () => {
    if (video && video.uri) {
      navigation.navigate('ShopVideoPreview');
    } else {
      showAlertPopup('Error', 'Please select a video for preview.', 'ok')
    }
  };

  const onCancel = () => {
    navigation.navigate('ViewProfile');
  };

  return (
    <SafeAreaView style={styles.safeAreaViewStyle}>
      <PopupContent
        closeAction={onShowPreview}
        cancelAction={onCancel}
        title="Add Store Video"
        subTitle="Add store video and title for same video"
        primaryButtonText="Upload"
        dangerButtonText="Preview Video">
        <IconInputWithoutLabel
          placeholder="Video Title Here"
          name="videoTitle"
          showIcon={false}
          icon={images.tick}
          error={false}
          errorMessage="Please enter video title."
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
    video: state.shopVideoPreview.shopVideo,
  };
};

const AddStoreVideo = connect(mapStateToProps, null)(AddStoreVideoComponent);

export default AddStoreVideo;
