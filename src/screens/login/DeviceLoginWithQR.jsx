import React, {useState, useEffect} from 'react';
import {StyleSheet, Text} from 'react-native';
import { connect } from 'react-redux';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {getUniqueId, getDeviceName} from 'react-native-device-info';
import showAlertPopup from '../../components/AlertComp';
import {addDevice} from '../../actions/deviceAction';
// import ButtonComp from '../../components/ButtonComp';
// import {RNCamera} from 'react-native-camera';

const LinkDevice = ({navigation, addDevice}) => {
  const [deviceId, setDeviceId] = useState('');
  const [deviceName, setDeviceName] = useState('');

  //Function to validate add devvice form
  const validate = values => {
    const {department_id, device_id, name} = values;
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
    navigation.navigate('IncomingCallListing', {
      isDevice: true
    });
  }

  const onSuccess = e => {
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err)
    // );
    const departmentId = e.data;
    const payload = {
      department_id: departmentId,
      device_id: deviceId,
      name: deviceName,
      status: '1',
    };

    const error = validate(payload);
    if (error) {
      showAlertPopup('Error', error, 'ok');
    } else {
      addDevice(payload, onDeviceAdded);
    }
  };

  useEffect(() => {
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
    <QRCodeScanner
      onRead={onSuccess}
      // flashMode={RNCamera.Constants.FlashMode.torch}
      topContent={
        <Text style={styles.centerText}>
          Go to <Text style={styles.textBold}>Add Device</Text> on Gloconlive
          Store App from an another device.
        </Text>
      }
      bottomContent={
        <Text style={styles.centerText}>
          <Text style={styles.textBold}>
            Scan the QR Code to Link this Device
          </Text>{' '}
          with your GloconLive Store.
        </Text>
      }
    />
  );
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

const mapDispatchToProps = dispatch => {
  return {
    addDevice: (payload, onDeviceAdded) => dispatch(addDevice(payload, onDeviceAdded))
  };
};

const DeviceLoginWithQR = connect(
  null,
  mapDispatchToProps,
)(LinkDevice);

export default DeviceLoginWithQR;
