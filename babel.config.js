module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',

    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@translations': './src/translations',
          '@api': './src/api',
          '@components': './src/components',
          '@hooks': './src/hooks',
          '@services': './src/services',
          '@screens': './src/screens',
          '@assets': './src/assets',
          '@validations': './src/validations',
          '@notifications': './src/notifications',
          '@utils': './src/utils',
          '@navigation': './src/navigation',
          '@redux': './src/redux',
          '@theme': './src/theme',
          '@types': './src/types',
          '@constants': './src/constants',
        },
      },
    ],
  ],
};
