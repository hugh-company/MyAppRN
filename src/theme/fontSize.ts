import {Dimensions, PixelRatio, Platform} from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const scale = SCREEN_WIDTH / 375;

export function normalize(size: number) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
}

export const FontSize = {
  FontSize8: normalize(8),
  FontSize9: normalize(9),
  FontSize10: normalize(10),
  FontSize11: normalize(11),
  FontSize12: normalize(12),
  FontSize13: normalize(13),
  FontSize14: normalize(14),
  FontSize15: normalize(15),
  FontSize16: normalize(16),
  FontSize17: normalize(17),
  FontSize18: normalize(18),
  FontSize19: normalize(19),
  FontSize20: normalize(20),
  FontSize21: normalize(21),
  FontSize22: normalize(22),
  FontSize24: normalize(24),
  FontSize32: normalize(32),
  FontSize38: normalize(38),
} as const;

// Types
export type FontSize = typeof FontSize;
export type FontSizeKey = keyof FontSize;
