import { AppImage, AppText } from '@components';
import { stickersSelector } from '@redux';
import { ColorsApp, FontSize, FontWithFamily, Spacing } from '@theme';
import { StickerInterface } from '@types';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { useSelector } from 'react-redux';

export interface ListStickersProps {
  isVisible: boolean;
  onSelectSticker: (value: string) => void;
}

export function ListStickers(props: ListStickersProps) {
  const { isVisible, onSelectSticker } = props;
  const stickers = useSelector(stickersSelector);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: isVisible ? withSpring(0) : withSpring(300) }],
    opacity: isVisible ? withTiming(1, { duration: 200 }) : withTiming(0, { duration: 200 }),
  }));

  const renderSticker = ({ item }: { item: string }) => {
    return (
      <TouchableOpacity onPress={() => onSelectSticker(item)}>
        <AppImage uri={item} style={styles.icon} isBase={false} />
      </TouchableOpacity>
    );
  };
  const renderItem = ({ item }: { item: StickerInterface }) => {
    return (
      <View style={styles.listItem}>
        <AppText style={styles.title}>{item.title}</AppText>
        <FlatList data={item?.items} renderItem={renderSticker} horizontal={true} showsHorizontalScrollIndicator={false} />
      </View>
    );
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <FlatList data={stickers} renderItem={renderItem} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Spacing.height275,
    backgroundColor: ColorsApp.background,
  },
  title: {
    fontSize: FontSize.FontSize16,
    ...FontWithFamily.FontWithFamily_600,

  },
  icon: {
    width: Spacing.width50,
    height: Spacing.width50,
    marginRight: Spacing.width8,
  },
  listItem: {
    gap: Spacing.width16,
    paddingHorizontal: Spacing.width16,
    marginVertical: Spacing.width16,
  },
});
