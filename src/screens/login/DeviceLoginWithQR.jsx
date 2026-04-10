import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { connect } from 'react-redux';
// import QRCodeScanner from 'react-native-qrcode-scanner';
import { getUniqueId, getDeviceName } from 'react-native-device-info';
import showAlertPopup from '../../components/AlertComp';
import { addDevice } from '../../actions/deviceAction';
import { requestUserPermission } from '../../utils/firebaseNotificationHandler';
import { asyncStorageGetFCMToken } from '../../hooks/useAsyncStorage';
import QRScanner from './QRScanner';
import { COLORS } from '../../constant';
// import ButtonComp from '../../components/ButtonComp';
import { SafeAreaView } from 'react-native-safe-area-context';
// import {RNCamera} from 'react-native-camera';

const LinkDevice = ({ navigation, addDevice }) => {
  const scannerRef = useRef(null);
  const [deviceId, setDeviceId] = useState('');
  const [deviceName, setDeviceName] = useState('');

  //Function to validate add devvice form
  const validate = values => {
    const { department_id, device_id, name } = values;
    let error = '';
    if (!department_id) {
      error = 'Please select a department.';
    } else if (!device_id) {
      error = 'Unable to get device Id.';
    } else if (!name) {
      error = 'Unable to get device name';
    }
    return error;
  };

  const onDeviceAdded = () => {
    navigation.replace('IncomingCallStackScreen');
  };

  const onSuccess = async e => {
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err)
    // );
    const str = JSON.parse(e.data);
    const obj = JSON.parse(str);
    console.log('QR Code Data:', obj['department_ids']?.[0]);
    const fcmToken = await asyncStorageGetFCMToken();
    const departmentId = e.data;
    const payload = {
      department_id: obj['department_ids']?.[0] || '',
      device_id: deviceId,
      name: deviceName,
      fcm_token: fcmToken,
      status: '1',
    };
    console.log(payload);
    const error = validate(payload);
    if (error) {
      showAlertPopup('Error', error, 'ok', () => {
        scannerRef.current?.resetScanner();
      });
    } else {
      const onFail = () => {
        scannerRef.current?.resetScanner();
      };
      addDevice(payload, onDeviceAdded, onFail);
    }
  };

  useEffect(() => {
    requestUserPermission();
    getUniqueId()
      .then(uniqueId => {
        setDeviceId(uniqueId);
      })
      .catch(error => {
        console.warn(`getUniqueId Error: ${error}`);
      });
    getDeviceName()
      .then(deviceName => {
        setDeviceName(deviceName);
      })
      .catch(error => {
        console.warn(`getDeviceName Error: ${error}`);
      });
  }, []);

  return (
    <View style={styles.safeAreaViewStyle}>
      <View style={styles.center}>
        <Text style={styles.centerText}>
          Go to <Text style={styles.textBold}>Add Device</Text> on Gloconlive
          Store App from an another device.
        </Text>
      </View>
      <View style={styles.cameraContainer}>
        <QRScanner ref={scannerRef} onRead={onSuccess} />
      </View>
      <View style={styles.center}>
        <Text style={styles.centerText}>
          <Text style={styles.textBold}>
            Scan the QR Code to Link this Device
          </Text>{' '}
          with your GloconLive Store.
        </Text>
      </View>
    </View>
    // <QRCodeScanner
    //   onRead={onSuccess}
    //   // flashMode={RNCamera.Constants.FlashMode.torch}
    //   topContent={
    //     <Text style={styles.centerText}>
    //       Go to <Text style={styles.textBold}>Add Device</Text> on Gloconlive
    //       Store App from an another device.
    //     </Text>
    //   }
    //   bottomContent={
    //     <Text style={styles.bottomContent}>
    //       <Text style={styles.textBold}>
    //         Scan the QR Code to Link this Device
    //       </Text>{' '}
    //       with your GloconLive Store.
    //     </Text>
    //   }
    // />
  );
};

const styles = StyleSheet.create({
  safeAreaViewStyle: {
    flex: 1,
    backgroundColor: COLORS.primaryBackgroungColor,
  },
  center: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateScale(16),
  },
  cameraContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  centerText: {
    fontSize: moderateScale(18),
    padding: moderateScale(32),
    color: '#777',
  },
  bottomContent: {
    fontSize: moderateScale(18),
    padding: moderateScale(32),
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: moderateScale(21),
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: moderateScale(16),
  },
});

const mapDispatchToProps = dispatch => {
  return {
    addDevice: (payload, onDeviceAdded, onFail) =>
      dispatch(addDevice(payload, onDeviceAdded, onFail)),
  };
};

const DeviceLoginWithQR = connect(null, mapDispatchToProps)(LinkDevice);

export default DeviceLoginWithQR;
