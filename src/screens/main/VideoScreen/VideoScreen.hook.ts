import {goBack} from '@navigation';
import {useTheme} from '@theme';
import {useCallback, useEffect, useRef, useState} from 'react';
import {Dimensions} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {createStyles} from './styles';

export const useVideoScreen = () => {
  const [uri, setUri] = useState(
    'https://vip.opstream10.com/20220309/177_4a9b764f/index.m3u8',
  );
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  const videoRef = useRef<any>(null);
  const [error, setError] = useState(false);
  const [showAds, setShowAds] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [isLoading, setIsLoading] = useState(true);
  const [controlsTimeout, setControlsTimeout] = useState();
  const [isFullScreenVisible, setIsFullScreenVisible] = useState(false);
  const unmuteOnVolumeChange = useCallback(
    () => setIsMuted(!isFullScreenVisible),
    [isMuted, setIsMuted, isFullScreenVisible],
  );
  // state speed to control speed video
  const [isSpeedVisible, setSpeedVisible] = useState(false); // Add this line

  // Add the subtitles array
  const subtitles = [
    {
      language: 'es',
      title: 'Spanish',
      type: 'text/vtt',
      index: 0,
      selected: true,
    },
    {language: 'en', title: 'English', type: 'text/vtt', index: 1},
  ];
  const [selectedSubtitle, setSelectedSubtitle] = useState(0); // 0 for English, 1 for Vietnamese

  const ads = [
    {
      type: 'video',
      uri: 'https://www.w3schools.com/html/mov_bbb.mp4',
      startTime: 10000,
    },
    {
      type: 'image',
      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQlQgBYHc-oK1CtI_SeIkYNHT0UWkIaPLQCQ&s',
      startTime: 20000,
    },
  ];

  const [ad, setAd] = useState<{
    type: 'video' | 'image';
    uri: string;
    startTime: number;
  } | null>({
    type: 'video',
    uri: 'https://www.w3schools.com/html/mov_bbb.mp4',
    startTime: 10000,
  });

  const [screenDimensions, setScreenDimensions] = useState(
    Dimensions.get('window'),
  );

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

  const skipAd = () => {
    setShowAds(false);
    setPaused(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const togglePlayPause = () => {
    if (paused) {
      videoRef?.current?.resume();
    } else {
      videoRef.current?.pause();
    }
    setPaused(!paused);
  };
  const goBackScreen = () => {
    goBack();
  };

  const fastForward = () => {
    const newTime = currentTime + 10;
    videoRef.current.seek(newTime);
    setCurrentTime(newTime);
    setPaused(false); // Ensure video continues playing after seeking
  };

  const rewind = () => {
    const newTime = currentTime - 10;
    videoRef.current.seek(newTime);
    setCurrentTime(newTime);
    setPaused(false); // Ensure video continues playing after seeking
  };
  const handleUserInteraction = () => {};
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
  const updateProgress = time => {
    setCurrentTime(time);
  };
  const toggleControlsVisibility = () => {
    setControlsVisible(!controlsVisible);
  };
  const onMenuPress = () => {};
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${rotation.value}deg`}],
    };
  });

  const toggleFullScreen = () => {
    setControlsVisible(false);
    if (isFullScreenVisible) {
      Orientation.unlockAllOrientations();
      rotation.value = withTiming(0, {duration: 300});
    } else {
      Orientation.lockToLandscape();
      rotation.value = withTiming(90, {duration: 300});
    }
    setIsFullScreenVisible(!isFullScreenVisible);
  };

  return {
    themeColors,
    styles,
    videoRef,
    error,
    showAds,

    subtitles,
    handleUserInteraction,
    setCurrentTime,
    currentTime,
    playbackRate,
    uri,
    fastForward,
    paused,
    togglePlayPause,
    rewind,
    setDuration,
    duration,
    isMuted,
    setIsMuted,
    goBackScreen,
    toggleMute,
    isLoading,
    setIsLoading,
    selectedSubtitle,
    setSelectedSubtitle,
    isFullScreenVisible,
    setIsFullScreenVisible,
    unmuteOnVolumeChange,
    onMenuPress,
    toggleControlsVisibility,
    updateProgress,
    controlsVisible,
    ad,
    skipAd,
    isSpeedVisible, // Add this line
    setSpeedVisible, // Add this line

    setPlaybackRate,
    toggleFullScreen, // Update this line
    screenDimensions, // Add this line
    animatedStyle, // Add this line
    setError,
  };
};
