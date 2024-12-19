import { AppText } from '@components';
import { dataNavigation } from '@utils';
import React from 'react';
import { View } from 'react-native';
import { useChapterScreen } from './ChapterScreen.hook';

const ChapterScreen = () => {
  const { data, themeColors, styles } = useChapterScreen();

  return (
    <View style={styles.container}>
      {dataNavigation.map((item, index) => (
        <AppText key={item.key}  >{item.name}</AppText>
      )
      )}

    </View>
  );
};

export default ChapterScreen;
