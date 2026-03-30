import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';

const QRScanner = ({ onRead }) => {
  const device = useCameraDevice('back');
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: codes => {
      if (codes.length > 0 && !scanned) {
        setScanned(true);
        onRead && onRead({ data: codes[0].value });
      }
    },
  });

  if (!device || !hasPermission) {
    return (
      <View style={styles.fallback}>
        <Text style={styles.fallbackText}>No Camera Access</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={{flex: 1}}
        device={device}
        isActive={!scanned}
        codeScanner={codeScanner}
      />
    </View>
  );
};

export default QRScanner;

const styles = StyleSheet.create({
  container: { flex: 1 },
  fallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  fallbackText: {
    fontSize: 16,
    color: '#777',
  },
});
