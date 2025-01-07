import { AppText } from '@components';
import { t } from 'i18next';
import React, { memo, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, { runOnJS } from 'react-native-reanimated';
import Video from 'react-native-video';
import { useVideoScreen } from './VideoScreen.hook';
import AppControlAds from './components/AppControlAds';
import { AppControlBottom } from './components/AppControlBottom';
import { ControlCenter } from './components/ControlCenter';
import { HeaderControl } from './components/HeaderControl';
import { ModalSpeed } from './components/ModalSpeed';

const VideoScreen = () => {
  const {
    setCurrentTime,
    currentTime,
    playbackRate,
    urlVideo,

    fastForward,
    paused,
    togglePlayPause,
    rewind,
    setDuration, isMuted, goBackScreen, toggleMute,
    duration, styles, videoRef, error, isSpeedVisible,
    setSpeedVisible,
    isLoading, setIsLoading,
    onMenuPress, toggleControlsVisibility,
    updateProgress, controlsVisible, showAds, ad, skipAd, setPlaybackRate, toggleFullScreen, isFullScreenVisible,
    setError,
  } = useVideoScreen();

  const handlePress = useCallback(() => {
    toggleControlsVisibility();
  }, [toggleControlsVisibility]);

  return (
    <TouchableOpacity
      style={[styles.container]}
      onPress={handlePress}
    >
      <Video
        source={{ uri: urlVideo }}
        style={styles.video}
        controls={false}
        ref={videoRef}
        resizeMode="contain"
        onError={() => {
          setError(true);
        }}
        onProgress={(data) => runOnJS(updateProgress)(data.currentTime)}
        onLoad={({ duration }) => {
          setDuration(duration);
        }}
        muted={isMuted}
        paused={paused || showAds} // Pause the main video if an ad is shown
        rate={playbackRate}
        onLoadStart={() => setIsLoading(true)}
        onReadyForDisplay={() => setIsLoading(false)}
      // selectedTextTrack={{
      //   type: SelectedTrackType.LANGUAGE,

      // }}
      />

      {error && (
        <Animated.View style={styles.errorContainer}>
          <AppText style={styles.errorText}>{t('movie.error')}</AppText>
        </Animated.View>
      )}

      {controlsVisible && (
        <Animated.View style={[styles.controls]}>
          <MemoizedHeaderControl
            onMenuPress={onMenuPress}
            goBackScreen={goBackScreen}
          />
          <MemoizedControlCenter isError={error} isLoading={isLoading} onPlayPause={togglePlayPause} onSkipBackward={rewind} onSkipForward={fastForward} paused={paused} />
          <MemoizedAppControlBottom
            isFullScreenVisible={isFullScreenVisible}
            isSpeedVisible={isSpeedVisible}
            setSpeedVisible={setSpeedVisible}
            isError={error}
            isMuted={isMuted}
            setCurrentTime={setCurrentTime}
            toggleMute={toggleMute}
            videoRef={videoRef}
            duration={duration}
            currentTime={currentTime}
            loading={isLoading}
            toggleFullScreen={toggleFullScreen} />
        </Animated.View>
      )}
      {showAds && <MemoizedAppControlAds ad={ad} onSkipAd={skipAd} />}
      <MemoizedModalSpeed
        visible={isSpeedVisible}
        currentSpeed={playbackRate}
        onSelectSpeed={(speed) => {
          setPlaybackRate(speed);
          setSpeedVisible(false);
        }}
        onClose={() => {
          setSpeedVisible(false);
        }} />
    </TouchableOpacity>
  );
};

export default React.memo(VideoScreen);

// Wrap child components with React.memo and custom comparison function
const MemoizedHeaderControl = memo(HeaderControl);
const MemoizedControlCenter = memo(ControlCenter);
const MemoizedAppControlBottom = memo(AppControlBottom, (prevProps, nextProps) => {
  return prevProps.isFullScreenVisible === nextProps.isFullScreenVisible &&
    prevProps.isSpeedVisible === nextProps.isSpeedVisible &&
    prevProps.isError === nextProps.isError &&
    prevProps.isMuted === nextProps.isMuted &&
    prevProps.setCurrentTime === nextProps.setCurrentTime &&
    prevProps.toggleMute === nextProps.toggleMute &&
    prevProps.videoRef === nextProps.videoRef &&
    prevProps.duration === nextProps.duration &&
    prevProps.currentTime === nextProps.currentTime &&
    prevProps.loading === nextProps.loading &&
    prevProps.toggleFullScreen === nextProps.toggleFullScreen;
});
const MemoizedAppControlAds = memo(AppControlAds);
const MemoizedModalSpeed = memo(ModalSpeed);
