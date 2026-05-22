import React, {useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  Vibration,
  StyleSheet,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import CircularButton from '../../components/CircularButton.jsx';
import {images} from '../../constant';
import {updateCallStatus} from '../../actions/callActions';
import {CALL_STATUS} from '../../utils/appConstants';
import styles from './ringingStyle';

const ONE_SECOND_IN_MS = 1000;
const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  2 * ONE_SECOND_IN_MS,
  3 * ONE_SECOND_IN_MS,
];

const Ringing = ({navigation}) => {
  const route = useRoute();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Ringing component mounted');
    Vibration.vibrate(PATTERN, true);
  }, []);

  //function to handel call receive
  const handelAccept = () => {
    Vibration.cancel();
    const {callId, departmentCallerId, shopperName} = route.params;
    dispatch(
      updateCallStatus(callId, CALL_STATUS.IN_PROGRESS, undefined, {
        showLoader: false,
        showErrorPopup: false,
      }),
    );
    navigation.navigate('CallPage', {
      callId,
      shopperName,
      departmentCallerId,
    });
  };

  //function to handel call disconnect
  const handelDecline = () => {
    Vibration.cancel();
    dispatch(
      updateCallStatus(route.params?.callId, CALL_STATUS.COMPLETED, undefined, {
        showLoader: false,
        showErrorPopup: false,
      }),
    );
    navigation.replace('IncomingCallListing');
  };

  return (
    <SafeAreaView style={styles.safeAreaViewStyle}>
      <View style={styles.body}>
        <View style={styles.callerDetailSection}>
          <Image style={styles.callerImageStyle} source={images.user1} />
          <Text style={styles.callerNameStyle}>
            {route.params?.shopperName}
          </Text>
          <Text style={styles.incommingLabelStyle}>Incoming Call</Text>
        </View>
        <View style={styles.callActionSection}>
          <View style={styles.callActionButtonWrapper}>
            <CircularButton
              btnIcon={images.call_receive}
              btnStyle={localStyles.acceptButton}
              btnIconStyle={{
                height: moderateScale(25),
                width: moderateScale(25),
              }}
              btnAction={handelAccept}
            />
            <Text style={styles.callActionButtonText}>Accept</Text>
          </View>
          <View style={styles.callActionButtonWrapper}>
            <CircularButton
              btnIcon={images.disconnect}
              btnStyle={localStyles.declineButton}
              btnIconStyle={{
                height: moderateScale(30),
                width: moderateScale(30),
              }}
              btnAction={handelDecline}
            />
            <Text style={styles.callActionButtonText}>Decline</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  acceptButton: {
    backgroundColor: 'green',
  },
  declineButton: {
    backgroundColor: 'red',
  },
});

export default Ringing;
