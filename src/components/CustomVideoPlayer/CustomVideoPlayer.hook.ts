import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {goBack} from '@navigation';
import {setMute, setSpeed, videoSettingsSelector} from '@redux';
import {getResolutionsFromM3U8} from '@services';
import {WidthScreen} from '@theme';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {AppState, Dimensions, Platform, StatusBar} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {OnLoadData} from 'react-native-video';
import {useDispatch, useSelector} from 'react-redux';
import {CustomVideoPlayerProps} from './CustomVideoPlayer';

export interface ItemQualityProps {
  resolution?: string;
  value: string;
  label?: string;
}
export const useCustomVideoPlayer = (props: CustomVideoPlayerProps) => {
  const {isFullScreenVisible, setIsFullScreenVisible, uri} = props;
  const videoRef = useRef<any>(null);
  const [error, setError] = useState(false);
  const [paused, setPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [controlsVisible, setControlsVisible] = useState(false);
  const bottomModal = React.useRef<BottomSheetModal>(null);
  const bottomQualityModal = React.useRef<BottomSheetModal>(null);
  const videoHeight = useSharedValue<number>((WidthScreen * 9) / 16);
  const videoWidth = useSharedValue<number>(Dimensions.get('window').width);
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;

  const [naturalSizeVideo, setNaturalSizeVideo] = useState({
    width: WidthScreen,
    height: (WidthScreen * 9) / 16,
  });
  //
  const [quality, setQuality] = useState('');
  const [listQuality, setListQuality] = React.useState<ItemQualityProps[]>([]);
  useEffect(() => {
    console.log({uri});

    getListQuality();
  }, [uri]);
  const getListQuality = async () => {
    const responseQuality = await getResolutionsFromM3U8(uri);
    console.log({responseQuality});
    setQuality(
      `${uri.split('/').slice(0, -1).join('/')}/${responseQuality?.[0]?.url}`,
    );
    setListQuality(
      responseQuality.map(item => {
        const title = item.url.split('/').pop()?.split('.')[0]; // Extract title from URL
        const urlFull = `${uri.split('/').slice(0, -1).join('/')}/${item.url}`;
        return {
          resolution: item.url,
          value: urlFull,
          label: title,
        };
      }),
    );
  };
  //

  const calculateVideoDimensions = (
    videoWidthValue: number,
    videoHeightValue: number,
  ) => {
    const {width, height} = Dimensions.get('window');
    const aspectRatio = videoWidthValue / videoHeightValue;
    const newHeight = width / aspectRatio;
    const newWidth = height * aspectRatio;
    if (newHeight > height) {
      return {
        height: height,
        width: newWidth,
      };
    } else {
      return {
        height: newHeight,
        width: width,
      };
    }
  };

  const updateVideoDimensions = (widthVideo: number, heightVideo: number) => {
    const {width, height} = Dimensions.get('window');
    const isLandscape = width > height;
    const videoDimensions = calculateVideoDimensions(widthVideo, heightVideo);

    if (isFullScreenVisible) {
      videoHeight.value = withTiming(isLandscape ? height : screenHeight);
      videoWidth.value = withTiming(isLandscape ? width : screenWidth);
    } else {
      videoHeight.value = withTiming(videoDimensions.height);
      videoWidth.value = withTiming(videoDimensions.width);
    }
  };

  useEffect(() => {
    const handleOrientationChange = () => {
      updateVideoDimensions(naturalSizeVideo.width, naturalSizeVideo.height);
    };

    Dimensions.addEventListener('change', handleOrientationChange);
    handleOrientationChange();

    return () => {
      // Dimensions.removeEventListener('change', handleOrientationChange);
    };
  }, [isFullScreenVisible, videoHeight, videoWidth]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: videoHeight.value,
    width: videoWidth.value,
  }));

  //
  const {isMute, speed} = useSelector(videoSettingsSelector);
  //
  const toggleMute = useCallback(() => {
    console.log('toggleMute', isMute);

    dispatch(setMute(!isMute));
  }, [isMute, dispatch]);

  const togglePlayPause = useCallback(() => {
    if (paused) {
      videoRef?.current?.resume();
    } else {
      videoRef.current?.pause();
    }
    setPaused(prev => !prev);
  }, [paused]);

  const goBackScreen = useCallback(() => {
    Orientation.lockToPortrait();
    setIsFullScreenVisible(false);
    goBack();
  }, [setIsFullScreenVisible]);

  const fastForward = useCallback(() => {
    const newTime = currentTime + 10;
    videoRef.current.seek(newTime);
    setCurrentTime(newTime);
    setPaused(false);
  }, [currentTime]);

  const rewind = useCallback(() => {
    const newTime = currentTime - 10;
    videoRef.current.seek(newTime);
    setCurrentTime(newTime);
    setPaused(false);
  }, [currentTime]);

  const toggleFullScreen = useCallback(() => {
    setControlsVisible(false);
    StatusBar.setHidden(true);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
    }
    if (isFullScreenVisible) {
      Orientation.unlockAllOrientations();
      Orientation.lockToPortrait();
    } else {
      Orientation.lockToLandscape();
    }
    setIsFullScreenVisible(prev => !prev);
  }, [isFullScreenVisible, setIsFullScreenVisible]);

  const handlePress = useCallback(() => {
    setControlsVisible(prev => !prev);
  }, []);

  useEffect(() => {
    if (controlsVisible) {
      const timeout: any = setTimeout(() => {
        setControlsVisible(false);
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [controlsVisible]);

  const handleDoubleClick = useCallback(() => {
    toggleFullScreen();
  }, [toggleFullScreen]);

  const updateProgress = useCallback(time => {
    setCurrentTime(time);
  }, []);

  useEffect(() => {
    setCurrentTime(0);

    setError(false);
  }, [uri]);
  const setPlaybackRate = useCallback(
    rate => {
      dispatch(setSpeed(rate));
    },
    [dispatch],
  );

  // control get info video
  const getInfoVideo = useCallback((event: OnLoadData) => {
    console.log({event});
    setDuration(event?.duration);
    setNaturalSizeVideo(event?.naturalSize);
    updateVideoDimensions(
      event?.naturalSize?.width,
      event?.naturalSize?.height,
    );
  }, []);

  const reinitializeVideo = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.seek(0);
      setPaused(false);
      setError(false);
      setIsLoading(true);
    }
  }, []);
  // data
  const dataSpeed = [
    {label: '0.25x', value: 0.25},
    {label: '0.5x', value: 0.5},
    {label: '1x', value: 1},
    {label: '1.5x', value: 1.5},
    {label: '2x', value: 2},
  ];
  const onChangeQuality = useCallback(
    value => {
      setQuality(value);
      if (videoRef.current) {
        console.log('aaaa', currentTime);
        // setIsLoading(true);

        setTimeout(() => {
          videoRef.current?.seek(currentTime);
          // videoRef.current?.re sume();
        }, 200);
      }
    },
    [currentTime],
  );

  useEffect(() => {
    const handleAppStateChange = nextAppState => {
      if (nextAppState === 'background') {
        setPaused(true);
        videoRef.current?.pause();
      }
      if (nextAppState === 'active') {
        setPaused(false);
        videoRef.current?.resume();
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return useMemo(
    () => ({
      setCurrentTime: time => {
        setCurrentTime(time);
      },
      currentTime,
      speed,
      handlePress,
      fastForward,
      paused,
      togglePlayPause,
      rewind,
      setDuration,
      isMute,
      goBackScreen,
      toggleMute,
      duration,
      videoRef,
      error,
      bottomModal,
      isLoading,
      setIsLoading,
      updateProgress,
      controlsVisible,
      setIsFullScreenVisible,
      setPlaybackRate,
      toggleFullScreen,
      isFullScreenVisible,
      setError,
      handleDoubleClick,
      setControlsVisible,
      setPaused,
      setVideoHeight: (height: number) => {
        videoHeight.value = height;
      },
      getInfoVideo,
      animatedStyle,
      reinitializeVideo,
      listQuality,
      bottomQualityModal,
      dataSpeed,
      quality,
      onChangeQuality,
    }),
    [
      currentTime,
      speed,
      handlePress,
      fastForward,
      paused,
      togglePlayPause,
      rewind,
      setDuration,
      isMute,
      goBackScreen,
      toggleMute,
      duration,
      videoRef,
      error,
      bottomModal,
      isLoading,
      setIsLoading,
      updateProgress,
      controlsVisible,
      setIsFullScreenVisible,
      setPlaybackRate,
      toggleFullScreen,
      isFullScreenVisible,
      setError,
      handleDoubleClick,
      setControlsVisible,
      setPaused,
      videoHeight,
      getInfoVideo,
      animatedStyle,
      reinitializeVideo,
      listQuality,
      bottomQualityModal,
      dataSpeed,
      quality,
      onChangeQuality,
    ],
  );
};
