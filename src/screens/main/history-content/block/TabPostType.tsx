import { AppText } from '@components';
import { ColorsApp, FontSize, FontWithFamily, Spacing } from '@theme';
import { PostTypeKey } from '@types';
import { t } from 'i18next';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
export interface TabPostTypeProps {
  onTabPostType: (key: PostTypeKey) => void;
  keyPost: PostTypeKey;
}

export function TabPostType(props: TabPostTypeProps) {
  const { onTabPostType, keyPost } = props;
  const listPostType = [
    {
      key: PostTypeKey.MOVIES,
      title: t('navigation.movies'),
    },

    {
      key: PostTypeKey.COMIC,
      title: t('navigation.comic'),
    },
    {
      key: PostTypeKey.GAMES,
      title: t('navigation.games'),
    },
  ];


  return (
    <View style={styles.container} >
      {listPostType.map((item, index) => (
        <TouchableOpacity style={[styles.btnPost, keyPost === item?.key && styles.btnPostActive]} onPress={() => onTabPostType(item.key)} key={index} >
          <AppText style={[styles.title, keyPost === item?.key && styles.titleActive]}>{item.title}</AppText>
        </TouchableOpacity>
      ))}
    </View>

  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: Spacing.width16,
  },
  title: {

    fontSize: FontSize.FontSize16,
    ...FontWithFamily.FontWithFamily_400,
    color: ColorsApp.disable,
  },
  titleActive: {
    color: ColorsApp.primary,
    ...FontWithFamily.FontWithFamily_600,
  },
  btnPost: {
    height: Spacing.height40,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPostActive: {
    // border-bottom: 2px solid var(--Border-active, #F4667E)
    borderBottomColor: '#F4667E',
    borderBottomWidth: 2,
  },
});
