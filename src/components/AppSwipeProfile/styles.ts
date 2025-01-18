import {
  FontSize,
  FontWithFamily,
  Shadow,
  Spacing,
  ThemeColors,
  WidthScreen,
} from '@theme';
import {StyleSheet} from 'react-native';

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    card: {
      position: 'absolute',
      width: WidthScreen,
      borderRadius: 20,
      overflow: 'hidden',
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.1,
      shadowRadius: 5,
      zIndex: 100,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    info: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      paddingHorizontal: Spacing.width16,
      paddingVertical: Spacing.height8,
    },
    name: {
      fontSize: FontSize.FontSize24,
      ...FontWithFamily.FontWithFamily_600,
    },
    profession: {
      fontSize: FontSize.FontSize16,
    },
    likeContainer: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: Spacing.width100,
      justifyContent: 'center',
    },
    btnLike: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: Spacing.width8,
      height: Spacing.width78,
      borderRadius: Spacing.width100,
      backgroundColor: themeColors.primary,
      paddingHorizontal: Spacing.width16,
    },
    btnDislike: {
      width: Spacing.width170,
      height: Spacing.width78,
      backgroundColor: themeColors.whiteColor,
      borderRadius: Spacing.width100,
      alignItems: 'center',
      justifyContent: 'center',
      gap: Spacing.width8,
      flexDirection: 'row',
      ...Shadow.normal,
    },
    likeText: {
      fontSize: FontSize.FontSize24,
      ...FontWithFamily.FontWithFamily_600,
    },
    dislikeContainer: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: Spacing.width100,
      padding: 10,
      justifyContent: 'center',
      borderRadius: 10,
    },
    dislikeText: {
      fontSize: FontSize.FontSize24,
      color: themeColors.star,
      ...FontWithFamily.FontWithFamily_600,
    },
    viewLocation: {
      flexDirection: 'row',
      alignItems: 'center',

      backgroundColor: 'rgba(0,0,0,0.5)',
      position: 'absolute',
      left: Spacing.width16,
      top: Spacing.width16,
      borderRadius: 20,
      padding: Spacing.width4,

      gap: Spacing.width4,
    },
    txtLocation: {
      fontSize: FontSize.FontSize12,
      color: '#fff',
      ...FontWithFamily.FontWithFamily_600,
    },
    btn: {
      width: '100%',
    },
    dotsContainer: {
      position: 'absolute',
      right: Spacing.width16,
      justifyContent: 'center',
      top: Spacing.width16,
      bottom: Spacing.width16,
    },
    dotsView: {
      backgroundColor: themeColors.btnSocial,
      paddingVertical: Spacing.width4,
      // paddingHorizontal: Spacing.width2,
      gap: Spacing.width8,
      borderRadius: Spacing.width8,
    },
    dot: {
      width: Spacing.width10,
      height: Spacing.width10,
      borderRadius: Spacing.width10,
      marginHorizontal: 4,
    },
    activeDot: {
      backgroundColor: themeColors.primary,
    },
    inactiveDot: {
      backgroundColor: themeColors.disable,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: 4,
    },
    linear: {
      ...StyleSheet.absoluteFillObject,
    },
  });
