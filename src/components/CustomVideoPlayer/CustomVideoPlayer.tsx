import { AppText } from '@components';
import { goBack } from '@navigation';
import { useTheme } from '@theme';
import { chapterEpisodeInterface } from '@types';
import { t } from 'i18next';
import React, { memo } from 'react';
import { Platform, StyleProp, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import Animated, { runOnJS } from 'react-native-reanimated';
import Video from 'react-native-video';
import { AppControlBottom } from './components/AppControlBottom';
import { ControlCenter } from './components/ControlCenter';
import { HeaderControl } from './components/HeaderControl';
import { ModalSpeed } from './components/ModalSpeed';
import { useCustomVideoPlayer } from './CustomVideoPlayer.hook';
import { createStyles } from './styles';

export interface CustomVideoPlayerProps {
  uri: string;
  style?: StyleProp<ViewStyle>;
  styleVideo?: StyleProp<ViewStyle>;
  isFullScreenVisible: boolean;
  setIsFullScreenVisible: any;
  typeMovie?: 'tvseries' | 'movies';
  valueChapter?: number;
  onSkipNext?: () => void;
  onSkipPrevious?: () => void;
  episodes?: chapterEpisodeInterface[];
}

const CustomVideoPlayer = (props: CustomVideoPlayerProps) => {
  const { themeColors } = useTheme();
  const { uri, style, styleVideo, isFullScreenVisible, typeMovie = 'movies',
    valueChapter = 0, episodes = [],
    onSkipNext, onSkipPrevious,
  } = props;
  const styles = createStyles(themeColors);
  const {
    videoRef,
    error,
    isMute,
    currentTime,
    paused,
    toggleFullScreen,
    duration,
    speed,
    isLoading,
    setCurrentTime,
    toggleMute,
    togglePlayPause,
    rewind,
    fastForward,
    updateProgress,
    bottomModal, handlePress,
    setIsFullScreenVisible,
    setPaused, controlsVisible,
    animatedStyle,
    setPlaybackRate,
    getInfoVideo,
    setError, setIsLoading, reinitializeVideo, listQuality, bottomQualityModal, dataSpeed,
    quality, onChangeQuality,
  } = useCustomVideoPlayer(props);

  return (
    <Animated.View style={[styles.containerVideo, animatedStyle]}>

      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={[styles.container, style, isFullScreenVisible && { ...styles.fullScreen }]}>
          <Video
            source={{ uri: quality ? quality : uri }}
            controls={false}
            ref={videoRef}
            resizeMode={'contain'}
            style={[styleVideo, styles.video]}
            onError={(e) => {
              console.log({ e });
              setError(true);

            }}
            onProgress={(data) => {
              runOnJS(updateProgress)(data.currentTime);
            }}
            onLoad={(event) => {
              runOnJS(getInfoVideo)(event);
            }}

            muted={isMute}
            paused={paused}
            rate={speed}
            onLoadStart={() => setIsLoading(true)}
            onReadyForDisplay={() => setIsLoading(false)}
            onEnd={() => {
              // setPaused(true);
              onSkipNext?.();
            }}
            {...(Platform.OS === 'android' && {
              ignoreSilentSwitch: 'ignore',
              playInBackground: true,
              playWhenInactive: true,
            })}
          />

          {error && (
            <Animated.View style={styles.errorContainer}>
              <AppText style={styles.errorText}>{t('movie.error')}</AppText>
            </Animated.View>
          )}
          {controlsVisible && <Animated.View style={[styles.controls]}>
            <MemoizedHeaderControl
              isFullScreenVisible={isFullScreenVisible}
              goBackScreen={() => {
                console.log({ isFullScreenVisible });

                if (isFullScreenVisible) {
                  Orientation.unlockAllOrientations();
                  Orientation.lockToPortrait();
                  setIsFullScreenVisible(false);
                } else {
                  goBack();
                }
              }}
              isMuted={isMute}
              toggleMute={toggleMute}
              setSpeedVisible={() => {
                bottomModal.current?.present();
              }}
            />
            {
              !error && <>
                <ControlCenter
                  isError={error}
                  isLoading={isLoading}
                  currentTime={currentTime}
                  onPlayPause={togglePlayPause}
                  onSkipBackward={rewind}
                  onSkipForward={fastForward}
                  paused={paused}
                  onSkipNext={onSkipNext}
                  onSkipPrevious={onSkipPrevious}
                  typeMovie={typeMovie}
                  isSkipNext={valueChapter < episodes?.length - 1}
                  isSkipPrevious={valueChapter > 0}
                />
                <MemoizedAppControlBottom
                  isFullScreenVisible={isFullScreenVisible}
                  isError={error}
                  setCurrentTime={setCurrentTime}
                  videoRef={videoRef}
                  duration={duration}
                  currentTime={currentTime}
                  loading={isLoading}
                  toggleFullScreen={toggleFullScreen}
                  seekTime={currentTime}


                  qualities={listQuality}
                  onQuality={() => {
                    bottomQualityModal.current?.present();
                  }}
                />
              </>
            }
          </Animated.View>}
          <MemoizedModalSpeed
            refModal={bottomModal as any}
            value={speed}
            title={t('movie.speed')}
            data={dataSpeed}
            onSelectSpeed={(speedVideo) => {
              setPlaybackRate(speedVideo);
            }}
          />
          <MemoizedModalSpeed
            title={t('movie.quality')}
            refModal={bottomQualityModal as any}
            value={quality}
            data={listQuality}
            onSelectSpeed={(value) => {
              console.log({ value });
              onChangeQuality(value);
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

const MemoizedHeaderControl = memo(HeaderControl);
const MemoizedAppControlBottom = memo(AppControlBottom, (prevProps, nextProps) => {
  return prevProps.isFullScreenVisible === nextProps.isFullScreenVisible &&
    prevProps.isError === nextProps.isError &&
    prevProps.setCurrentTime === nextProps.setCurrentTime &&
    prevProps.videoRef === nextProps.videoRef &&
    prevProps.duration === nextProps.duration &&
    prevProps.currentTime === nextProps.currentTime &&
    prevProps.loading === nextProps.loading &&
    prevProps.toggleFullScreen === nextProps.toggleFullScreen &&
    prevProps.qualities === nextProps.qualities;
});
const MemoizedModalSpeed = memo(ModalSpeed);
export default CustomVideoPlayer;
