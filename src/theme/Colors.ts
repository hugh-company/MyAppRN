export const Colors = {
  primary: '#F65D79',
  background: '#F7CC15',
  green: '#21AB3B',
  red: '#FF0000',
  text: '#000000',
  border: '#E5E5EA',
  white: '#FFFFFF',
  orange: '#F2994A',
  success: '#21AB3B',
  warning: '#F2994A',
  info: '#21AB3B',
  error: '#FF0000',
  lightGray: '#E5E5EA',
  placeholder: '#8E8E93',
  black: 'black',
  buttonDelete: '#FFEBEE',
  txtDelete: '#FF5252',

  buttonCancel: '#E5E5EA',
  txtCancel: '#000000',
  buttonConfirm: '#21AB3B',
  txtConfirm: '#FFFFFF',
  backgroundShadowWhite: 'rgba(255, 255, 255, 0.5)',
};

export type ColorScheme = typeof Colors;
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
