export const lightColors = {
  colorMain4: '#007AFF',
  primary: '#007AFF',
  secondary: '#5856D6',
  tertiary: '#34C759',
  quaternary: '#FF2D55',
  background: '#FFFFFF',
  surface: '#F2F2F7',
  text: '#000000',
  textSecondary: '#3C3C43',
  textTertiary: '#787880',
  textQuaternary: '#C7C7CC',
  border: '#C6C6C8',
  borderSecondary: '#E5E5EA',
  borderTertiary: '#D1D1D6',
  borderQuaternary: '#C7C7CC',
  success: '#34C759',
  error: '#FF3B30',
  warning: '#FF9500',
  info: '#5856D6',
  whiteColor: '#FFFFFF',
  colorDisable: '#E5E5EA',
  placeholder: '#8E8E93',
  inputBackground: '#F2F2F7',
  inputBorder: '#C6C6C8',
  inputText: '#000000',
  buttonConfirm: '#007AFF',
  buttonCancel: '#FF2D55',
};

export const darkColors = {
  colorMain4: '#0A84FF',
  primary: '#0A84FF',
  secondary: '#5E5CE6',
  tertiary: '#30D158',
  quaternary: '#FF375F',
  background: '#000000',
  surface: '#1C1C1E',
  text: '#FFFFFF',
  textSecondary: '#EBEBF5',
  textTertiary: '#98989F',
  textQuaternary: '#48484A',
  border: '#38383A',
  borderSecondary: '#2C2C2E',
  borderTertiary: '#383838',
  borderQuaternary: '#48484A',
  success: '#30D158',
  error: '#FF453A',
  warning: '#FF9F0A',
  info: '#5E5CE6',
  whiteColor: '#FFFFFF',
  colorDisable: '#E5E5EA',
  placeholder: '#8E8E93',
  inputBackground: '#F2F2F7',
  inputBorder: '#C6C6C8',
  inputText: '#000000',
  buttonConfirm: '#007AFF',
  buttonCancel: '#FF2D55',
};

export type ThemeColors = typeof lightColors;

export const Colors = {
  light: lightColors,
  dark: darkColors,
  buttonConfirm: '',
  buttonCancel: '',
};

export default Colors;

// shadow
export const Shadow = {
  normal: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.27,
    shadowRadius: 0.65,

    elevation: 1,
  },
  bold: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
  },
  textShadowWhite: {
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 1,
  },
  textShadowBlack: {
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 1,
  },
};
