import React, { useEffect, useRef, useState } from 'react';

import {
  Alert,
  BackHandler,
  Linking,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import ZegoUIKitPrebuiltCall from '@zegocloud/zego-uikit-prebuilt-call-rn';
// import ZegoUIKit, {ZegoToggleCameraButton} from @zego-uikit/components-rn
// import {ZegoUIKitPrebuiltCall} from @zego-uikit/prebuilt-call-rn
import ZegoUIKit from '@zegocloud/zego-uikit-rn';
import BackIcon from '../../components/BackIcon';
import { moderateScale } from 'react-native-size-matters';
import CallMenuBar from './CallMenuBar';
import { appConfig } from '../../config/config';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import {
  getIncomingCallQueue,
  updateCallStatus,
} from '../../actions/callActions';
import { CALL_STATUS, LOGIN_MODES } from '../../utils/appConstants';

const getRemoteParticipantCount = roomUserUpdatePayload => {
  if (Array.isArray(roomUserUpdatePayload)) {
    return roomUserUpdatePayload.length;
  }

  if (Array.isArray(roomUserUpdatePayload?.userList)) {
    return roomUserUpdatePayload.userList.length;
  }

  if (Array.isArray(roomUserUpdatePayload?.users)) {
    return roomUserUpdatePayload.users.length;
  }

  if (roomUserUpdatePayload?.userID || roomUserUpdatePayload?.userId) {
    return 1;
  }

  return 0;
};

const CallPageComponent = props => {
  const {
    route,
    profile,
    navigation,
    fetchIncomingCallQueue,
    updateCallStatus: updateCallStatusAction,
    auth,
  } = props;
  const { params } = route;
  const { callId, departmentCallerId } = params;
  const { deviceName, loginMode } = auth;
  let { name } = profile;
  if (loginMode === LOGIN_MODES.DEVICE) {
    name = deviceName;
  }
  const [isMicOn, setMicOn] = useState(true);
  const [isCameraOn, setCameraOn] = useState(true);
  const [frontCamera, setFrontCamera] = useState(true);
  const hasCompletedCallRef = useRef(false);
  const isEndingCallRef = useRef(false);
  const isMicToggleInFlightRef = useRef(false);
  const isCameraToggleInFlightRef = useRef(false);
  const isFrontCameraToggleInFlightRef = useRef(false);
  const hasPeerJoinedRef = useRef(false);

  const ensureMicrophonePermission = React.useCallback(async () => {
    const microphonePermission =
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.RECORD_AUDIO
        : PERMISSIONS.IOS.MICROPHONE;

    try {
      let permissionStatus = await check(microphonePermission);

      if (permissionStatus === RESULTS.GRANTED) {
        return true;
      }

      if (permissionStatus === RESULTS.DENIED) {
        permissionStatus = await request(microphonePermission);
        if (permissionStatus === RESULTS.GRANTED) {
          return true;
        }
      }

      if (permissionStatus === RESULTS.BLOCKED) {
        Alert.alert(
          'Permission Required',
          'Microphone access is blocked. Please enable it in app settings to continue the call.',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Open Settings',
              onPress: () => {
                Linking.openSettings();
              },
            },
          ],
        );
      }
    } catch (error) {
      console.log('ensureMicrophonePermission error', error);
    }

    return false;
  }, []);

  useEffect(() => {
    ensureMicrophonePermission();
  }, [ensureMicrophonePermission]);

  useEffect(() => {
    updateCallStatusAction(callId, CALL_STATUS.IN_PROGRESS, undefined, {
      showLoader: false,
      showErrorPopup: false,
    });
  }, [callId, updateCallStatusAction]);

  const navigateAfterCallEnd = React.useCallback(() => {
    const parentNavigation = navigation.getParent?.();

    if (parentNavigation && auth?.loginMode !== LOGIN_MODES.DEVICE) {
      parentNavigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Profile' }],
        }),
      );
      return;
    }

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'IncomingCallListing' }],
      }),
    );
  }, [auth?.loginMode, navigation]);

  const onCallStatusUpdate = React.useCallback(() => {
    fetchIncomingCallQueue();
    navigateAfterCallEnd();
  }, [fetchIncomingCallQueue, navigateAfterCallEnd]);

  const onEndCall = React.useCallback(async () => {
    if (hasCompletedCallRef.current || isEndingCallRef.current) {
      return;
    }

    hasCompletedCallRef.current = true;
    isEndingCallRef.current = true;

    try {
      await ZegoUIKit.leaveRoom();
    } catch (error) {
      console.log('leaveRoom error', error);
    }

    updateCallStatusAction(callId, CALL_STATUS.COMPLETED, onCallStatusUpdate, {
      showLoader: false,
      showErrorPopup: false,
    });
  }, [callId, onCallStatusUpdate, updateCallStatusAction]);

  useFocusEffect(
    React.useCallback(() => {
      const onHardwareBackPress = () => {
        onEndCall();
        return true;
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onHardwareBackPress,
      );

      return () => {
        subscription.remove();
      };
    }, [onEndCall]),
  );

  const onCameraToggle = async () => {
    if (isCameraToggleInFlightRef.current) {
      return;
    }

    isCameraToggleInFlightRef.current = true;

    try {
      await ZegoUIKit.turnCameraOn(departmentCallerId.toString(), !isCameraOn);
      setCameraOn(!isCameraOn);
    } catch (error) {
      console.log('turnCameraOn error', error);
    } finally {
      isCameraToggleInFlightRef.current = false;
    }
  };

  const onUseFrontFacingCamera = async () => {
    if (isFrontCameraToggleInFlightRef.current) {
      return;
    }

    isFrontCameraToggleInFlightRef.current = true;

    try {
      // The SDK exposes this method name; bracket access avoids a false hook lint hit.
      // eslint-disable-next-line dot-notation
      await ZegoUIKit['useFrontFacingCamera'](!frontCamera);
      setFrontCamera(!frontCamera);
    } catch (error) {
      console.log('useFrontFacingCamera error', error);
    } finally {
      isFrontCameraToggleInFlightRef.current = false;
    }
  };

  const onMicToggle = async () => {
    if (isMicToggleInFlightRef.current) {
      return;
    }

    isMicToggleInFlightRef.current = true;

    try {
      await ZegoUIKit.turnMicrophoneOn('', !isMicOn);
      setMicOn(!isMicOn);
    } catch (error) {
      console.log('turnMicrophoneOn error', error);
    } finally {
      isMicToggleInFlightRef.current = false;
    }
  };

  const onMorePress = () => {
    // navigation.navigate('InCallChat', {
    //   departmentCallerId,
    //   callId,
    //   shopperName,
    // });
  };

  return (
    <View style={styles.container}>
      {/* {!isJoin && <View style={styles.videoContainer} />} */}
      <View style={styles.backIcon}>
        <BackIcon navigate={navigation} onBack={onEndCall} />
      </View>
      <ZegoUIKitPrebuiltCall
        appID={appConfig.appID}
        appSign={appConfig.appSign}
        userID={departmentCallerId.toString()}
        userName={name}
        callID={callId}
        config={{
          scenario: 'Communication',
          turnOnMicrophoneWhenJoining: true,
          turnOnCameraWhenJoining: true,
          useSpeakerWhenJoining: true,
          onOnlySelfInRoom: () => {
            console.log('onOnlySelfInRoom', 'onOnlySelfInRoom');
            if (hasPeerJoinedRef.current) {
              onEndCall();
            }
          },
          onHangUp: () => {
            onEndCall();
          },
          roomUserUpdate: user => {
            console.log('roomUserUpdate', user);
            if (getRemoteParticipantCount(user) > 0) {
              hasPeerJoinedRef.current = true;
            }
          },
          bottomMenuBarConfig: {
            buttons: [],
          },
          audioConfig: {
            bitrate: 32000,
            codec: 'AAC',
            enableANS: true,
            enableAGC: true,
            enableAEC: true,
          },
        }}
      />
      {/* <ZegoStartCallInvitationButton isVideoCall={true} invitees={invitees} /> */}
      {/* <Button onPress={onEndCall} title="End Call"></Button> */}
      <CallMenuBar
        style={styles.menuBar}
        isMicOn={isMicOn}
        onEndCall={onEndCall}
        onMicToggle={onMicToggle}
        onCameraToggle={onCameraToggle}
        toggleFrontCamera={onUseFrontFacingCamera}
        onMorePress={onMorePress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
    position: 'relative',
  },
  videoContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'yellow',
    position: 'absolute',
    zIndex: 1,
  },
  backIcon: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    margin: moderateScale(40),
  },
  menuBar: {
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
  },
});

const mapStateToProps = state => {
  return {
    profile: state.profile,
    auth: state.app.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchIncomingCallQueue: () => dispatch(getIncomingCallQueue()),
    updateCallStatus: (callId, callStatus, onCallStatusUpdate, options) =>
      dispatch(
        updateCallStatus(callId, callStatus, onCallStatusUpdate, options),
      ),
  };
};

const CallPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CallPageComponent);

export default CallPage;
