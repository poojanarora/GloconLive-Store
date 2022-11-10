import React from 'react';
import {Modal, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {images} from '../constant';
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
    <Modal animationType="slide" transparent={false} visible={show}>
      <PopupContent
        showFooter={false}
        closeAction={onClose}
        title="Choose option">
        <View style={styles.imgPicker}>
          <TouchableOpacity onPress={onCameraSelection}>
            <Image
              style={{
                width: moderateScale(50),
                height: moderateScale(50),
                resizeMode: 'contain',
              }}
              source={images.camera}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onFileSelection}>
            <Image
              style={{
                width: moderateScale(50),
                height: moderateScale(50),
                resizeMode: 'contain',
              }}
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
});

export default ImagePickerModel;
