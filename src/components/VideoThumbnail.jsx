import React, {useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import Video from 'react-native-video';
import {moderateScale, scale} from 'react-native-size-matters';

const VideoThumbnail = ({url}) => {
  //const videoPlayer = useRef(null);
  return (
    <View style={styles.videoBackground}>
      <Video
        source={{
          uri: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        }} // Can be a URL or a local file.
        //ref={videoPlayer}
        // onBuffer={this.onBuffer} // Callback when remote video is buffering
        // onError={this.videoError} // Callback when video cannot be loaded
        style={styles.video}
        paused={true}
        posterResizeMode="cover"
      />
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
    //backgroundColor: 'black',
    justifyContent: 'center',
  },
  videoBackground: {
    height: moderateScale(200),
    //backgroundColor: 'red',
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
});
export default VideoThumbnail;
