import { AppText } from '@components';
import { t } from 'i18next';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, { runOnJS } from 'react-native-reanimated';
import Video, { SelectedTrackType } from 'react-native-video';
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
    uri,

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

  return (
    <TouchableOpacity
      style={[styles.container]}
      onPress={toggleControlsVisibility}
    >
      <Video
        source={{ uri: uri }}
        style={styles.video}
        controls={false}
        ref={videoRef}
        resizeMode="contain"
        onError={() => {

          setError(true);
        }}
        onProgress={(data) => runOnJS(updateProgress)(data.currentTime)}
        onLoad={({ duration }) => setDuration(duration)}
        muted={isMuted}
        paused={paused || showAds} // Pause the main video if an ad is shown
        rate={playbackRate}
        onLoadStart={() => setIsLoading(true)}
        onReadyForDisplay={() => setIsLoading(false)}

        selectedTextTrack={{
          type: SelectedTrackType.LANGUAGE,

        }}
      />

      {error && (
        <Animated.View style={styles.errorContainer}>
          <AppText style={styles.errorText}>{t('movie.error')}</AppText>
        </Animated.View>
      )}

      {controlsVisible && (
        <Animated.View style={[styles.controls]}>
          <HeaderControl
            onMenuPress={onMenuPress}
            goBackScreen={goBackScreen}
          />
          <ControlCenter isError={error} isLoading={isLoading} onPlayPause={togglePlayPause} onSkipBackward={rewind} onSkipForward={fastForward} paused={paused} />
          <AppControlBottom
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
      {showAds && <AppControlAds ad={ad} onSkipAd={skipAd} />}
      <ModalSpeed
        visible={isSpeedVisible}
        currentSpeed={playbackRate}
        onSelectSpeed={(speed) => {
          setPlaybackRate(speed);
          setSpeedVisible(false);
        }
        }
        onClose={() => {
          setSpeedVisible(false);
        }} />
    </TouchableOpacity>
  );
};

export default VideoScreen;
