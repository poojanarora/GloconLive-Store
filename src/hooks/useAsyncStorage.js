import AsyncStorage from '@react-native-async-storage/async-storage';

export const localStorageSetItem = async payload => {
  AsyncStorage.setItem('GLOCON_LIVE_APP', JSON.stringify(payload));
  return true;
};

export const localStorageGetItem = async () => {
  const data = await AsyncStorage.getItem('GLOCON_LIVE_APP');
  return data != null ? JSON.parse(data) : null;
};

export const localStorageRemoveItem = async () => {
  await AsyncStorage.removeItem('GLOCON_LIVE_APP');
  return true;
};

export const localStorageUpdateToken = async token => {
  const data = await AsyncStorage.getItem('GLOCON_LIVE_APP');
  if (data != null) {
    data.accessToken = token;
    localStorageSetItem(data);
  }
};

export const localStorageGetAccessToken = async () => {
  const data = await AsyncStorage.getItem('GLOCON_LIVE_APP');
  if (data != null) {
    let parsedData = JSON.parse(data);
    return parsedData.accessToken;
  } else {
    return '';
  }
};

export const asyncStorageGetFCMToken = async () => {
  return await AsyncStorage.getItem('GLOCON_LIVE_APP_FCM_TOKEN');
};

export const asyncStorageSetFCMToken = async token => {
  await AsyncStorage.setItem('GLOCON_LIVE_APP_FCM_TOKEN', token);
  return true;
};
