import { AppImage, AppText } from '@components';
import { stickersSelector } from '@redux';
import { ColorsApp, FontSize, FontWithFamily, Spacing } from '@theme';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useSelector } from 'react-redux';

export interface ListStickersProps {
  isVisible: boolean;
  onSelectSticker: (value: string) => void;
}

export function ListStickers(props: ListStickersProps) {
  const { isVisible, onSelectSticker } = props;
  const stickers = useSelector(stickersSelector);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: isVisible ? withTiming(1, { duration: 200 }) : withTiming(0, { duration: 200 }),
  }));

  const layout = useWindowDimensions();

  const numColumns = 4;
  const itemSize = ((layout.width - (Spacing.width24 * (numColumns - 1) + Spacing.width32)) / numColumns);
  const [selectedTab, setSelectedTab] = React.useState(0);

  const renderSticker = ({ item }: { item: string }) => {
    return (
      <TouchableOpacity onPress={() => onSelectSticker(item)}>
        <AppImage uri={item} style={[styles.icon, { width: itemSize, height: itemSize }]} isBase={false} />
      </TouchableOpacity>
    );
  };

  const renderTabButtons = () => {
    return (
      <View style={styles.tabContainer}>
        {stickers?.map((sticker, idx) => (
          <TouchableOpacity key={idx} onPress={() => setSelectedTab(idx)} style={[styles.tabButton, selectedTab === idx && styles.tabSelected]}>
            <AppText style={styles.tabText}>{sticker.title}</AppText>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderTabContent = () => {
    const sticker = stickers[selectedTab];
    return (
      <FlatList
        data={sticker?.items || []}
        renderItem={renderSticker}
        numColumns={numColumns}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ marginBottom: Spacing.width16, gap: Spacing.width24 }}
        contentContainerStyle={{ paddingHorizontal: Spacing.width16 }}

      />
    );
  };

  if (!stickers) { return null; }
  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {renderTabButtons()}
      {renderTabContent()}
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

  },
  listItem: {
    gap: Spacing.width16,
    paddingHorizontal: Spacing.width16,
    marginVertical: Spacing.width16,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: ColorsApp.background,
    paddingVertical: Spacing.width8,
  },
  tabButton: {
    padding: Spacing.width8,
  },
  tabText: {
    fontSize: FontSize.FontSize16,
    ...FontWithFamily.FontWithFamily_600,
  },
  tabSelected: {
    borderBottomWidth: 2,
    borderBottomColor: ColorsApp.primary,
  },
});
