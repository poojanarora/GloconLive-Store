import React, {useEffect, useState} from 'react';

import {Button, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import ZegoUIKitPrebuiltCall from '@zegocloud/zego-uikit-prebuilt-call-rn';
// import ZegoUIKit, {ZegoToggleCameraButton} from @zego-uikit/components-rn
// import {ZegoUIKitPrebuiltCall} from @zego-uikit/prebuilt-call-rn
import ZegoUIKit from '@zegocloud/zego-uikit-rn';
import BackIcon from '../../components/BackIcon';
import {moderateScale} from 'react-native-size-matters';
import CallMenuBar from './CallMenuBar';
import {appConfig} from '../../config/config';
import { getIncomingCallQueue } from '../../actions/callActions';

const CallPageComponent = props => {
  const {route, profile, navigation, fetchIncomingCallQueue} = props;
  const {params} = route;
  const {callId, shopperName, departmentCallerId} = params;
  const {name} = profile;
  const [isMicOn, setMicOn] = useState(true);
  const [isCameraOn, setCameraOn] = useState(true);
  const [frontCamera, setFrontCamera] = useState(true);

  const onEndCall = () => {
    fetchIncomingCallQueue();
    navigation.navigate('IncomingCallListing');
  };

  const onCameraToggle = () => {
    ZegoUIKit.turnCameraOn(departmentCallerId.toString(), !isCameraOn).then(
      () => {
        setCameraOn(!isCameraOn);
      },
    );
  };

  const onUseFrontFacingCamera = () => {
    ZegoUIKit.useFrontFacingCamera(!frontCamera).then(() => {
      setFrontCamera(!frontCamera);
    });
  };

  const onMicToggle = () => {
    ZegoUIKit.turnMicrophoneOn(departmentCallerId.toString(), !isMicOn).then(
      () => {
        setMicOn(!isMicOn);
      },
    );
  };

  const onMorePress = () => {
    navigation.navigate('InCallChat', {
      departmentCallerId,
      callId,
      shopperName,
    });
  };

  return (
    <View style={styles.container}>
      {/* {!isJoin && <View style={styles.videoContainer} />} */}
      <View style={styles.backIcon}>
        <BackIcon navigate={navigation} />
      </View>
      <ZegoUIKitPrebuiltCall
        appID={appConfig.appID}
        appSign={appConfig.appSign}
        userID={departmentCallerId.toString()}
        userName={name}
        callID={callId}
        config={{
          onOnlySelfInRoom: () => {
            console.log('onOnlySelfInRoom', 'onOnlySelfInRoom');
            onEndCall();
          },
          onHangUp: () => {
            onEndCall();
          },
          roomUserUpdate: user => {
            console.log('roomUserUpdate', user);
          },
          bottomMenuBarConfig: {
            buttons: [],
          },
        }}
      />
      {/* <ZegoStartCallInvitationButton isVideoCall={true} invitees={invitees} /> */}
      {/* <Button onPress={onEndCall} title="End Call"></Button> */}
      <CallMenuBar
        style={styles.menuBar}
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
    margin: moderateScale(20),
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchIncomingCallQueue: () => dispatch(getIncomingCallQueue()),
  };
};

const CallPage = connect(mapStateToProps, mapDispatchToProps)(CallPageComponent);

export default CallPage;
