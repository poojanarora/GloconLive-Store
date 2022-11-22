import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import ButtonComp from '../../components/ButtonComp';
// import {RNCamera} from 'react-native-camera';

export default DeviceLoginWithQR = ({navigation}) => {
  const onSuccess = e => {
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err)
    // );
  };

  return (
      <QRCodeScanner
        onRead={onSuccess}
        // flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={
          <Text style={styles.centerText}>
            Go to{' '}
            <Text style={styles.textBold}>Add Device</Text> on
            Gloconlive Store App from an another device.
          </Text>
        }
        bottomContent={
          <Text style={styles.centerText}>
            Scan the QR Code to{' '}
            <Text style={styles.textBold}>Link this Device</Text> 
            {' '}with your GloconLive Store.
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
