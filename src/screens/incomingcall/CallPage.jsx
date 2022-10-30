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

const CallPageComponent = props => {
  const {route, profile, navigation} = props;
  const {params} = route;
  const {userID} = params;
  const {id, name} = profile;
  const [isJoin, setIsJoin] = useState(false);
  const [isMute, setMute] = useState(false);
  const [isCameraOn, setCameraOn] = useState(true);
  const [frontCamera, setFrontCamera] = useState(true);

  // useEffect(() => {
  //   ZegoUIKit.onUserJoin('', user => {
  //     console.log('onUserJoin', user);
  //     setIsJoin(true);
  //   });
  // }, []);

  const onEndCall = () => {
    navigation.navigate('IncomingCallListing');
  };

  const onCameraToggle = () => {
    ZegoUIKit.turnCameraOn(id.toString(), !isCameraOn).then(() => {
      setCameraOn(!isCameraOn);
    });
  };

  const onUseFrontFacingCamera = () => {
    ZegoUIKit.useFrontFacingCamera(!frontCamera).then(() => {
      setFrontCamera(!frontCamera);
    });
  };

  const onMicToggle = () => {
    ZegoUIKit.turnMicrophoneOn(id.toString(), !isMute).then(() => {
      setMute(!isMute);
    });
  };

  const onMorePress = () => {
    // navigation.navigate('InCallChat');
  };

  return (
    <View style={styles.container}>
      {/* {!isJoin && <View style={styles.videoContainer} />} */}
      <View style={styles.backIcon}>
        <BackIcon navigate={navigation} />
      </View>
      <ZegoUIKitPrebuiltCall
        appID={373788989}
        appSign="32768ab51eb29a34fea1bbd74cd8849b5293dbb111bef180b9494a5931e189fa"
        userID={id.toString()}
        userName={name}
        callID={userID.toString()}
        config={{
          onOnlySelfInRoom: () => {
            console.log('onOnlySelfInRoom', 'onOnlySelfInRoom');
            navigation.navigate('IncomingCallListing');
          },
          onHangUp: () => {
            navigation.navigate('IncomingCallListing');
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

const CallPage = connect(mapStateToProps, null)(CallPageComponent);

export default CallPage;
