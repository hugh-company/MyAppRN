import {goBack} from '@navigation';
import {useRoute} from '@react-navigation/native';
import {useTheme} from '@theme';
import {chapterEpisodeInterface} from '@types';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Orientation from 'react-native-orientation-locker';
import {useSharedValue, withTiming} from 'react-native-reanimated';
import {createStyles} from './styles';
interface VideoScreenProps {
  video: chapterEpisodeInterface;
}
export const useVideoScreen = () => {
  const router = useRoute();
  const {video} = (router?.params as unknown as VideoScreenProps) || {
    video: undefined,
  };
  console.log({video: video?.source});

  const [urlVideo, setUrlVideo] = useState(video?.source?.[0]?.link || '');
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  const videoRef = useRef<any>(null);
  const [error, setError] = useState(false);
  const [showAds, setShowAds] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  const currentTimeRef = useRef(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [isLoading, setIsLoading] = useState(true);
  const [controlsTimeout, setControlsTimeout] = useState();
  const [isFullScreenVisible, setIsFullScreenVisible] = useState(false);

  // state speed to control speed video
  const [isSpeedVisible, setSpeedVisible] = useState(false); // Add this line
  console.log({urlVideo});

  const [ad, setAd] = useState<{
    type: 'video' | 'image';
    uri: string;
    startTime: number;
  } | null>({
    type: 'video',
    uri: 'https://www.w3schools.com/html/mov_bbb.mp4',
    startTime: 10000,
  });

  // useEffect(() => {
  //   Orientation.lockToLandscape();
  //   return () => {
  //     Orientation.unlockAllOrientations();
  //   };
  // }, []);

  // useEffect(() => {
  //   if (ads.length > 0) {
  //     if (ads[0]) {
  //       setAd({
  //         type: 'video',
  //         uri: 'https://www.w3schools.com/html/mov_bbb.mp4',
  //         startTime: 10000,
  //       });
  //       setShowAds(true);
  //       setPaused(true); // Pause the main video when an ad is shown
  //     } else {
  //       setPaused(false);
  //     }
  //   }
  // }, []);

  const skipAd = useCallback(() => {
    setShowAds(false);
    setPaused(false);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  const togglePlayPause = useCallback(() => {
    if (paused) {
      videoRef?.current?.resume();
    } else {
      videoRef.current?.pause();
    }
    setPaused(prev => !prev);
  }, [paused]);

  const goBackScreen = useCallback(() => {
    Orientation.lockToPortrait(); // Ensure it locks to portrait mode when going back
    goBack();
  }, []);

  useEffect(() => {
    return () => {
      Orientation.lockToPortrait(); // Ensure it locks to portrait mode when the component unmounts
    };
  }, []);

  const fastForward = useCallback(() => {
    const newTime = currentTimeRef.current + 10;
    videoRef.current.seek(newTime);
    currentTimeRef.current = newTime;
    setPaused(false); // Ensure video continues playing after seeking
  }, []);

  const rewind = useCallback(() => {
    const newTime = currentTimeRef.current - 10;
    videoRef.current.seek(newTime);
    currentTimeRef.current = newTime;
    setPaused(false); // Ensure video continues playing after seeking
  }, []);

  const [controlsVisible, setControlsVisible] = useState(false);
  // sau 3s không tương tác thì ẩn control
  useEffect(() => {
    if (controlsVisible && !isLoading && !isSpeedVisible) {
      clearTimeout(controlsTimeout);
      const timeout: any = setTimeout(() => {
        setControlsVisible(false);
      }, 3000);
      setControlsTimeout(timeout);
    }
  }, [controlsVisible, isSpeedVisible]);
  const updateProgress = useCallback(time => {
    currentTimeRef.current = time;
  }, []);
  const toggleControlsVisibility = useCallback(() => {
    setControlsVisible(prev => !prev);
  }, []);
  const onMenuPress = () => {};
  const rotation = useSharedValue(0);

  const toggleFullScreen = useCallback(() => {
    setControlsVisible(false);
    if (isFullScreenVisible) {
      Orientation.unlockAllOrientations();
      Orientation.lockToPortrait(); // Ensure it locks to portrait mode
      rotation.value = withTiming(0, {duration: 300});
    } else {
      Orientation.lockToLandscape();
      rotation.value = withTiming(90, {duration: 300});
    }
    setIsFullScreenVisible(prev => !prev);
  }, [isFullScreenVisible, rotation]);

  return useMemo(
    () => ({
      setCurrentTime: time => {
        currentTimeRef.current = time;
      },
      currentTime: currentTimeRef.current,
      playbackRate,
      urlVideo,

      fastForward,
      paused,
      togglePlayPause,
      rewind,
      setDuration,
      isMuted,
      goBackScreen,
      toggleMute,
      duration,
      styles,
      videoRef,
      error,
      isSpeedVisible,
      setSpeedVisible,
      isLoading,
      setIsLoading,
      onMenuPress,
      toggleControlsVisibility,
      updateProgress,
      controlsVisible,
      showAds,
      ad,
      skipAd,
      setPlaybackRate,
      toggleFullScreen,
      isFullScreenVisible,
      setError,
    }),
    [
      playbackRate,
      urlVideo,
      fastForward,
      paused,
      togglePlayPause,
      rewind,
      setDuration,
      isMuted,
      goBackScreen,
      toggleMute,
      duration,
      styles,
      videoRef,
      error,
      isSpeedVisible,
      setSpeedVisible,
      isLoading,
      setIsLoading,
      onMenuPress,
      toggleControlsVisibility,
      updateProgress,
      controlsVisible,
      showAds,
      ad,
      skipAd,
      setPlaybackRate,
      toggleFullScreen,
      isFullScreenVisible,
      setError,
    ],
  );
};
