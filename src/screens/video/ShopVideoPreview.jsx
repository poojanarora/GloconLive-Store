import React, {useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import Video from 'react-native-video';
import ButtonComp from '../../components/ButtonComp';
import { handleVideoSelection } from '../../actions/shopVideoAction';
import { moderateScale } from 'react-native-size-matters';

const ShopVideoPreviewComponent = ({video, onChangeVideo}) => {
  const videoPlayer = useRef(null);
  const pickVideo = async () => {
    let result = await launchImageLibrary({
      mediaType: 'video',
      quality: 1,
    });
    console.log(result);
    if (!result.didCancel) {
      onChangeVideo(result.assets[0]);
    }
  };
  const {uri} = video;
  return (
    <View style={styles.videoBackground}>
      {uri && (
        <Video
          source={{
            uri: uri,
          }} // Can be a URL or a local file.
          ref={videoPlayer}
          // onBuffer={this.onBuffer} // Callback when remote video is buffering
          // onError={this.videoError} // Callback when video cannot be loaded
          style={styles.video}
          //   paused={pause}
          posterResizeMode="cover"
        />
      )}
      <View style={styles.changeVideo}>
        <ButtonComp
          btnText="Change Video"
          action={pickVideo}
          btnStyle={styles.changeVideoBtn}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  videoBackground: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // position: 'relative',
    // height: '100%',
    // width: '100%',
  },
  changeVideo: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginBottom: 30,
    marginEnd: 30,
  },
  videoControls: {
    height: 30,
    width: 30,
  },
  changeVideoBtn: {
    textTransform: 'none',
    width: moderateScale(120),
  },
});

const mapStateToProps = state => {
  return {
    video: state.shopVideoPreview.shopVideo,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChangeVideo: video => dispatch(handleVideoSelection(video)),
  };
};

const ShopVideoPreview = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShopVideoPreviewComponent);
export default ShopVideoPreview;
