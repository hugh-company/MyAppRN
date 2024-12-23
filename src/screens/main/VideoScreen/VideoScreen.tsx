import React from 'react';
import { View } from 'react-native';
import Video from 'react-native-video';
import { useVideoScreen } from './VideoScreen.hook';

const VideoScreen = () => {
  const { data, themeColors, styles } = useVideoScreen();
  const videoUri = 'https://example.com/video.mp4'; // Replace with your video URI
  const subtitleUri = 'https://example.com/subtitle.vtt'; // Replace with your subtitle URI

  // useEffect(() => {
  //   Orientation.lockToLandscape();
  //   return () => {
  //     Orientation.unlockAllOrientations();
  //   };
  // }, []);

  return (
    <View style={styles.container}>
      <Video
        source={{ uri: videoUri }}
        style={styles.video}
        controls={true}
        resizeMode="contain"

      />
      {/* Placeholder for ads */}
      {/* <View style={styles.adContainer}>
        <AppText>Ad Placeholder</AppText>
      </View>
      <AppText>VideoScreen</AppText> */}
    </View>
  );
};

export default VideoScreen;
