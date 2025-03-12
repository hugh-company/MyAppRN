import { useTheme } from '@theme';
import React, { useEffect } from 'react';
import { NativeModules, requireNativeComponent } from 'react-native';
import { createStyles } from './styles';
const { VideoPlayerView } = NativeModules;

export interface AppVideosProps {
  videoUrl: string;
}
const NativeVideoPlayerView = requireNativeComponent('VideoPlayerView');

export const AppVideos = ({ videoUrl }: AppVideosProps) => {
  const videoPlayerRef = React.useRef(null);
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  useEffect(() => {
    // Set video source when component is mounted
    if (videoPlayerRef?.current) {
      videoPlayerRef.current.setVideoSource(videoUrl);
    }

    return () => {
      if (videoPlayerRef?.current) {
        videoPlayerRef.current.pauseVideo();  // Pause video when screen is unmounted
      }
    };
  }, [videoUrl]);
  return (
    <NativeVideoPlayerView
      ref={videoPlayerRef}
    // style={styles.container}
    />
  );
};


