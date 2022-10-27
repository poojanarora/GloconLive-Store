import React from 'react';
import {connect} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {handleVideoSelection} from '../actions/shopVideoAction';
import {COLORS} from '../constant';

const BrowseFilesComponent = ({onVideoSelect}) => {
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
      <Text>Drag & Drop here</Text>
      <Text>OR</Text>
      <Text>Browse Files</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  browseFileSectionWrapper: {
    flexDirection: 'row',
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
  },
});

const mapDispatchToProps = dispatch => {
  return {
    onVideoSelect: video => dispatch(handleVideoSelection(video)),
  };
};

const BrowseFiles = connect(null, mapDispatchToProps)(BrowseFilesComponent);
export default BrowseFiles;
