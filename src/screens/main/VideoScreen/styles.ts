import {FontWithFamily, Spacing, ThemeColors} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
      width: '100%',
      height: '100%',
    },
    video: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
    adContainer: {
      position: 'absolute',
      bottom: Spacing.height24,
      left: Spacing.width24,
      right: Spacing.width24,
      height: Spacing.height100,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    controls: {
      // flexDirection: 'row',
      // justifyContent: 'space-between',
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    controlButton: {
      backgroundColor: themeColors.btnSocial,
      width: Spacing.width40,
      height: Spacing.width40,
      borderRadius: Spacing.height24,
      alignItems: 'center',
      justifyContent: 'center',
    },

    controlMute: {
      position: 'absolute',
    },
    progressBarContainer: {
      height: 4,
      flex: 1,
      backgroundColor: '#ccc',
      borderRadius: 2,
      overflow: 'hidden',
    },
    progressBar: {
      height: '100%',
      backgroundColor: themeColors.primary,
    },
    centerControls: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: Spacing.width24,
      ...StyleSheet.absoluteFillObject,
      // transform: [{translateX: -50}, {translateY: -50}],
    },
    //
    viewOption: {
      flexDirection: 'row',
      justifyContent: 'space-between',

      alignItems: 'center',
      position: 'absolute',
      left: Spacing.width24,
      right: Spacing.width24,
      bottom: Spacing.height8,
      gap: Spacing.width16,
    },
    viewTime: {
      width: Spacing.width50,
      alignItems: 'center',
    },
    txtTime: {
      fontSize: 10,
      ...FontWithFamily.FontWithFamily_500,
    },
    loadingContainer: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    subtitlePicker: {
      position: 'absolute',
      bottom: Spacing.height24,
      left: Spacing.width24,
      right: Spacing.width24,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      color: themeColors.whiteColor,
    },

    viewHeader: {
      position: 'absolute',
      top: Spacing.width16,
      left: Spacing.width16,
      right: Spacing.width16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    btnBack: {
      width: Spacing.width40,
      height: Spacing.width40,
      borderRadius: Spacing.height24,
      backgroundColor: themeColors.btnSocial,
      alignItems: 'center',
      justifyContent: 'center',
    },
    // ads
    adsContainer: {
      position: 'absolute',
      bottom: Spacing.height24,
      left: Spacing.width24,
      right: Spacing.width24,
      height: Spacing.height100,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    adsText: {
      color: themeColors.whiteColor,
    },
    adsCloseText: {
      color: themeColors.primary,
      marginTop: Spacing.width16,
    },
    errorContainer: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorText: {
      color: themeColors.whiteColor,
    },
  });
