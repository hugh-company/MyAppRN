import {goBack} from '@navigation';
import {setMute, setSpeed, videoSettingsSelector} from '@redux';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Platform, StatusBar} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import {useDispatch, useSelector} from 'react-redux';
import {CustomVideoPlayerProps} from './CustomVideoPlayer';

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
  const [isSpeedVisible, setSpeedVisible] = useState(false);
  //
  const {isMute, speed} = useSelector(videoSettingsSelector);
  //
  const toggleMute = useCallback(() => {
    console.log('toggleMute', isMute);

    dispatch(setMute(!isMute));
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
    setControlsVisible(pre => !pre);
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
  }, [controlsVisible, isSpeedVisible]);
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
  const setPlaybackRate = useCallback(rate => {
    dispatch(setSpeed(rate));
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
      isSpeedVisible,
      setSpeedVisible,
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
    }),
    [
      speed,
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
      isSpeedVisible,
      setSpeedVisible,
      isLoading,
      setIsLoading,
      setIsFullScreenVisible,
      updateProgress,
      controlsVisible,
      setPlaybackRate,
      toggleFullScreen,
      isFullScreenVisible,
      setError,
      handleDoubleClick,
      handlePress,
      setControlsVisible,
      currentTime,
      setPaused,
    ],
  );
};
