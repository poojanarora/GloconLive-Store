import React from 'react';
import {connect} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {moderateScale, scale} from 'react-native-size-matters';
import {handleVideoSelection} from '../actions/shopVideoAction';
import {COLORS} from '../constant';

const BrowseFilesComponent = ({onVideoSelect, video}) => {
  const pickVideo = async () => {
    let result = await launchImageLibrary({
      mediaType: 'video',
    });
    console.log(result);
    if (!result.didCancel) {
      onVideoSelect(result.assets[0]);
    }
  };

  return (
    <TouchableOpacity
      style={styles.browseFileSectionWrapper}
      onPress={pickVideo}>
      {!video ? (
        <>
          <Text style={styles.textStyle}>Drag & Drop here</Text>
          <Text style={styles.textStyle}>OR</Text>
          <Text style={styles.browseFiles}>Browse Files</Text>
        </>
      ) : (
        <Text style={styles.textStyle}>{video.fileName}</Text>
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
  browseFiles: {
    fontWeight: '500',
    fontSize: scale(12),
    color: COLORS.highLightColor,
    textDecorationLine: 'underline',
  },
});

const mapStateToProps = state => {
  return {
    video: state.shopVideoPreview.shopVideo,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onVideoSelect: video => dispatch(handleVideoSelection(video)),
  };
};

const BrowseFiles = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BrowseFilesComponent);
export default BrowseFiles;
