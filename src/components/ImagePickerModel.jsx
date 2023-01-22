import React from 'react';
import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  Platform,
} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {moderateScale} from 'react-native-size-matters';
import {
  PERMISSIONS,
  RESULTS,
  check,
  request,
} from 'react-native-permissions';
import {COLORS, images} from '../constant';
import PopupContent from './PopupContent';

const ImagePickerModel = ({show, onImageSelection, onClose}) => {
  const onFileSelection = async () => {
    try {
      let result = await launchImageLibrary({
        mediaType: 'photo',
      });
      if (result.assets[0].fileSize > 1000000) {
        showAlertPopup(
          'Oops',
          'Picture size should be less than 1 MB',
          'Cancel',
        );
      } else if (!result.didCancel) {
        onImageSelection(result.assets[0]);
      }
    } catch (e) {
      console.log('User cancelled image picker');
      // onClose();
    }
  };

  const onCameraSelection = () => {
    check(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA,
    )
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            request(
              Platform.OS === 'ios'
                ? PERMISSIONS.IOS.CAMERA
                : PERMISSIONS.ANDROID.CAMERA,
            )
              .then(result => {
                switch (result) {
                  case RESULTS.UNAVAILABLE:
                    console.log(
                      'This feature is not available (on this device / in this context)',
                    );
                    break;
                  case RESULTS.DENIED:
                    console.log(
                      'The permission has not been requested / is denied but requestable',
                    );
                    break;
                  case RESULTS.LIMITED:
                    console.log(
                      'The permission is limited: some actions are possible',
                    );
                    break;
                  case RESULTS.GRANTED:
                    console.log('The permission is granted');
                    openCamera();
                    break;
                  case RESULTS.BLOCKED:
                    console.log(
                      'The permission is denied and not requestable anymore',
                    );
                    break;
                }
              })
              .catch(() => {
                // onClose();
              });
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            openCamera();
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch(error => {
        // …
        // onClose();
      });
  };

  const openCamera = async () => {
    let result = await launchCamera({
      durationLimit: 10000,
      cameraType: 'front',
      quality: 0.1,
    });
    if (result.assets[0].fileSize > 1000000) {
      showAlertPopup(
        'Oops',
        'Picture size should be less than 1 MB',
        'Cancel',
      );
    } else if (!result.didCancel) {
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
            <Image style={styles.image} source={images.camera} />
            <Text style={styles.text}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onFileSelection}
            style={styles.imageButton}>
            <Image style={styles.image} source={images.gallary} />
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
    color: 'white',
  },
  image: {
    width: moderateScale(40),
    height: moderateScale(40),
    resizeMode: 'contain',
  },
});

export default ImagePickerModel;
