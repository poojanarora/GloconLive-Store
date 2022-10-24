import React, {useState, useRef} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Video from 'react-native-video';
const ShopVideoPreview = () => {
  const [video, setVideo] = useState(null);
  const videoPlayer = useRef(null);
  const pickVideo = async () => {
    let result = await launchImageLibrary({
      mediaType: 'video',
      quality: 1,
    });
    console.log(result);
    if (!result.didCancel) {
      setVideo(result.assets[0].uri);
    }
  };
  return (
    <View style={styles.videoBackground}>
      {video && (
        <Video
          source={{
            uri: video,
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
        <Button
          style={styles.changeVideoBtn}
          title="Change Video"
          color="red"
          onPress={() => pickVideo()}
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
  },
});

export default ShopVideoPreview;
