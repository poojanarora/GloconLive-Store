import React, {useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Video from 'react-native-video';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {COLORS} from '../constant';

const VideoThumbnail = ({url}) => {
  const videoPlayer = useRef(null);
  return (
    <>
      <View style={styles.videoThumbnailWrapper}>
        <Text style={styles.videoPreviewLabel}>Preview</Text>
        <View style={styles.videoWrapper}>
          <Video
            source={{
              uri: url,
            }} // Can be a URL or a local file.
            ref={videoPlayer}
            // onBuffer={this.onBuffer} // Callback when remote video is buffering
            // onError={this.videoError} // Callback when video cannot be loaded
            style={styles.video}
            paused={false}
            muted={true}
            posterResizeMode="cover"
            resizeMode="cover"
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  videoThumbnailWrapper: {
    height: moderateScale(180),
    marginHorizontal: moderateScale(15),
    marginTop: moderateVerticalScale(20),
    //backgroundColor: 'red',
  },
  videoPreviewLabel: {
    color: COLORS.primaryTextColor,
    fontSize: scale(15),
    fontWeight: '500',
  },
  videoWrapper: {
    flex: 1,
    backgroundColor: 'blue',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
});
export default VideoThumbnail;
