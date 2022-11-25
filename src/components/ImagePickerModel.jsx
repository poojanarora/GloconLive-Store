import React from 'react';
import { Modal, StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { moderateScale } from 'react-native-size-matters';
import { COLORS, images } from '../constant';
import PopupContent from './PopupContent';

const ImagePickerModel = ({ show, onImageSelection, onClose }) => {

  const onFileSelection = async () => {
    try {
      let result = await launchImageLibrary({
        mediaType: 'photo',
      });
      if (result.assets[0].fileSize > 1000000) {
        showAlertPopup('Oops', "Picture size should be less than 1 MB", 'Cancel');
      }
      else if (!result.didCancel) {
        onImageSelection(result.assets[0]);
      }
    } catch (e) {
      console.log('User cancelled image picker')

    }
  }
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
            <Text style={styles.text}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onFileSelection}
            style={styles.imageButton}>
            <Image
              style={styles.image}
              source={images.gallary}
            />
            <Text style={styles.text}>Gallery</Text>
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
    width: moderateScale(65),
    height: moderateScale(70),
    backgroundColor: COLORS.secondaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(10),
  },
  text: {
    fontWeight: 'bold',
    color: 'white'
  },
  image: {
    width: moderateScale(40),
    height: moderateScale(40),
    resizeMode: 'contain',
  }
});

export default ImagePickerModel;
