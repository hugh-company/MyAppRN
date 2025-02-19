import { ExitFullScreenIcon, FullScreenIcon } from '@assets';
import { AppText } from '@components';
import Slider from '@react-native-community/slider';
import { FontSize, FontWithFamily, Spacing, useTheme, WidthScreen } from '@theme';
import { formatTimeSeconds } from '@utils';
import React, { memo, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ButtonAction } from './ButtonAction';

interface AppControlBottomProps {
  currentTime?: number;
  duration: number;
  setCurrentTime: (time: number) => void; // Add this prop
  videoRef: any; // Add this prop
  loading: boolean; // Add this prop
  toggleFullScreen: () => void; // Add this prop
  isFullScreenVisible: boolean; // Add this prop
  isError: boolean; // Add this prop
  seekTime: number; // Add this prop
}

const SliderComponent = memo(Slider, (prevProps, nextProps) => {
  return prevProps.value === nextProps.value &&
    prevProps.minimumValue === nextProps.minimumValue &&
    prevProps.maximumValue === nextProps.maximumValue &&
    prevProps.minimumTrackTintColor === nextProps.minimumTrackTintColor &&
    prevProps.maximumTrackTintColor === nextProps.maximumTrackTintColor &&
    prevProps.thumbTintColor === nextProps.thumbTintColor;
});

export const AppControlBottom = ({ isError, duration, videoRef, currentTime = 0, setCurrentTime, toggleFullScreen, isFullScreenVisible, seekTime }: AppControlBottomProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const [seekTimeState, setSeekTimeState] = useState(currentTime);
  const [sliderWidth, setSliderWidth] = useState(0); // Add this line

  useEffect(() => {
    setSeekTimeState(seekTime);
  }, [seekTime]);

  const handleSlidingComplete = (value) => {
    setCurrentTime(value);
    videoRef.current.seek(value);
  };

  const handleValueChange = (value) => {
    setSeekTimeState(value);
  };

  const handleSliderLayout = (event) => { // Add this function
    const { width } = event.nativeEvent.layout;
    setSliderWidth(width);
  };

  const handleTouchEnd = (event) => { // Add this function
    const { locationX } = event.nativeEvent;
    const value = (locationX / sliderWidth) * duration;
    handleSlidingComplete(value);
  };

  if (isError) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.viewHeader}>
        <View style={styles.viewOption}>
          <View style={styles.viewTime}>
            <AppText style={styles.txtTime}>{formatTimeSeconds(seekTime)}</AppText>
          </View>
          <View style={styles.viewTime}>
            <AppText style={[styles.txtTime, { opacity: 0.6 }]} > / {formatTimeSeconds(duration)}</AppText>
          </View>
        </View>
        <ButtonAction Icon={isFullScreenVisible ? ExitFullScreenIcon : FullScreenIcon} onPress={toggleFullScreen} />
      </View>
      <View style={styles.viewBottom}>
        {/* {loading && <ActivityIndicator size="small" color={themeColors.primary} />} */}
        <SliderComponent
          style={[styles.slider, { width: WidthScreen }]}
          minimumValue={0}
          maximumValue={duration}
          value={seekTime}
          onValueChange={handleValueChange}
          onSlidingComplete={handleSlidingComplete}
          minimumTrackTintColor={themeColors.primary}
          maximumTrackTintColor={'rgba(255, 255, 255, 0.5)'}
          thumbTintColor="transparent"
          onLayout={handleSliderLayout} // Add this line
          onTouchEnd={handleTouchEnd} // Add this line
        />
      </View>
    </View>
  );
};

const createStyles = (themeColors: any) =>
  StyleSheet.create({
    container: {
    },
    viewHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: Spacing.width8,
      paddingHorizontal: Spacing.width8,
    },
    viewBottom: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: Spacing.width8,
    },
    viewOption: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    video: {
      width: '100%',
      height: '100%',
    },
    btnMute: {
      width: Spacing.width30,
      height: Spacing.width30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    header: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: Spacing.width16,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    viewTime: {
      alignItems: 'center',
    },
    txtTime: {
      fontSize: FontSize.FontSize10,
      ...FontWithFamily.FontWithFamily_500,
    },
    slider: {
      flex: 1,
      width: '100%',
      maxHeight: Spacing.height40,
      height: Spacing.height40,
      minHeight: Spacing.height40,
    },
    name: {
      fontSize: FontSize.FontSize18,
      flex: 1,
      ...FontWithFamily.FontWithFamily_500,
    },
  });

