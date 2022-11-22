import React from 'react';
import {Modal, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {moderateScale} from 'react-native-size-matters';
import {COLORS, images} from '../constant';
import PopupContent from './PopupContent';

const ImagePickerModel = ({show, onImageSelection, onClose}) => {
  const onFileSelection = async () => {
    let result = await launchImageLibrary({
      mediaType: 'photo',
    });
    if (!result.didCancel) {
      onImageSelection(result.assets[0]);
    }
  };
  const onCameraSelection = async () => {
    let result = await launchCamera({
      durationLimit: 10000,
      cameraType: 'front',
    });
    if (!result.didCancel) {
      onImageSelection(result.assets[0]);
    }
  };
  return (
    <Modal animationType="slide" transparent={true} visible={show}>
      <PopupContent
        showFooter={false}
        closeAction={onClose}
        title="Choose option">
        <View style={styles.imgPicker}>
          <TouchableOpacity
            onPress={onCameraSelection}
            style={styles.imageButton}>
            <Image
              style={styles.image}
              source={images.camera}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onFileSelection}
            style={styles.imageButton}>
            <Image
              style={styles.image}
              source={images.menu}
            />
          </TouchableOpacity>
        </View>
      </PopupContent>
    </Modal>
  );
};

const styles = StyleSheet.create({
  imgPicker: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  imageButton: {
    width: moderateScale(60),
    height: moderateScale(60),
    backgroundColor: COLORS.secondaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(10),
  },
  image: {
    width: moderateScale(40),
    height: moderateScale(40),
    resizeMode: 'contain',
  }
});

export default ImagePickerModel;