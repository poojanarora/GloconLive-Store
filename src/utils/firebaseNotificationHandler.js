import messaging from '@react-native-firebase/messaging';
import {
  asyncStorageGetFCMToken,
  asyncStorageSetFCMToken,
} from '../hooks/useAsyncStorage';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    console.log('Authorization status:', authStatus);
    generateFirebaseFCMToken();
  }
}

const generateFirebaseFCMToken = async () => {
  let fcmToken = await asyncStorageGetFCMToken();
  console.log('Old FMC Token ', fcmToken);
  if (fcmToken === null) {
    try {
      await messaging().registerDeviceForRemoteMessages();
      fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('New FMC Token ', fcmToken);
        await asyncStorageSetFCMToken(fcmToken);
      }
    } catch (error) {
      console.log('Error while generating fcm token ', error);
    }
  }
};
