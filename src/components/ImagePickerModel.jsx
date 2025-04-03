import React from 'react';
import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  Platform,
  PermissionsAndroid,
  Alert,
  Linking,
} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {moderateScale} from 'react-native-size-matters';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';
import {COLORS, images} from '../constant';
import PopupContent from './PopupContent';

const ImagePickerModel = ({show, onImageSelection, onClose}) => {
  const requestStoragePermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const permission =
          Platform.Version >= 33
            ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
            : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

        const granted = await PermissionsAndroid.request(permission, {
          title: 'Storage Permission',
          message: 'This app needs access to your storage to select images.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        });

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Storage permission granted');
          return true;
        } else {
          console.log('Storage permission denied');
          Alert.alert(
            'Permission Required',
            'Storage permission is needed to access your gallery. Please enable it in app settings.',
            [
              {text: 'Cancel', style: 'cancel'},
              {
                text: 'Open Settings',
                onPress: async () => {
                  const canOpen = await Linking.canOpenURL('app-settings:');
                  if (canOpen) {
                    Linking.openSettings();
                  } else {
                    Alert.alert(
                      'Unable to Open Settings',
                      'Please open the settings manually to grant permissions.',
                    );
                  }
                },
              },
            ],
          );
          return false;
        }
      }
      return true; // For iOS, no permissions required here
    } catch (error) {
      console.log('Error requesting storage permission:', error);
      return false;
    }
  };

  const onFileSelection = async () => {
    const isAllowed = await requestStoragePermission();
    if (isAllowed) {
      try {
        const result = await launchImageLibrary({
          mediaType: 'photo',
          selectionLimit: 1, // Allow selecting only one image
        });

        if (result.didCancel) {
          console.log('User cancelled image picker');
          return;
        }

        if (result.assets && result.assets[0].fileSize > 1000000) {
          Alert.alert('Oops', 'Picture size should be less than 1 MB.', [
            {text: 'OK'},
          ]);
        } else if (result.assets) {
          onImageSelection(result.assets[0]); // Process selected image
        }
      } catch (e) {
        console.log('Error during file selection:', e);
      }
    }
  };

  const onCameraSelection = () => {
    check(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PermissionsAndroid.PERMISSIONS.CAMERA,
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
      showAlertPopup('Oops', 'Picture size should be less than 1 MB', 'Cancel');
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
