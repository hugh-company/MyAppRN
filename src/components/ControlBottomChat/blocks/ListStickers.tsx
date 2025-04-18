import { AppText } from '@components';
import { stickersSelector } from '@redux';
import { ColorsApp, FontSize, FontWithFamily, Spacing } from '@theme';
import React from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { getStickerIcon } from '../../../utils/getSticker';

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
  const sticker = stickers[selectedTab];

  const tabListRef = React.useRef<FlatList>(null);
  const TAB_WIDTH = Spacing.width120;

  const scrollToTab = (index: number) => {
    if (tabListRef.current) {
      tabListRef.current.scrollToIndex({
        index: index,
        animated: true,
        viewPosition: 0.5, // Center the selected item
      });
    }
  };

  const handleSelectTab = (index: number) => {
    setSelectedTab(index);
    scrollToTab(index);
  };

  React.useEffect(() => {
    if (stickers?.length > 0) {
      scrollToTab(selectedTab);
    }
  }, [selectedTab, stickers]);

  const renderSticker = ({ item }: { item: string }) => {

    return (
      <TouchableOpacity
        onPress={() => {
          onSelectSticker(`${sticker.slug}:${item}`);
        }}
        style={[styles.stickerContainer, { width: itemSize, height: itemSize }]}
      >
        <Image
          source={{ uri: getStickerIcon(sticker.slug, item) }}
          style={[styles.icon, { width: itemSize, height: itemSize }]}
          resizeMode={'stretch'}
        />
      </TouchableOpacity>
    );
  };


  const renderTabItem = ({ item, index }: { item: any, index: number }) => {
    return (
      <TouchableOpacity
        onPress={() => handleSelectTab(index)}
        style={[
          styles.tabButton,
          { minWidth: TAB_WIDTH },
          selectedTab === index && styles.tabSelected,
        ]}
      >
        <AppText style={[
          styles.tabText,
          selectedTab === index && styles.tabTextSelected,
        ]} numberOfLines={1}>
          {item.title}
        </AppText>
      </TouchableOpacity>
    );
  };

  const renderTabButtons = () => {
    return (
      <FlatList
        ref={tabListRef}
        data={stickers || []}
        renderItem={renderTabItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabScrollContainer}
        contentContainerStyle={styles.tabContentContainer}
        decelerationRate="fast"
        snapToAlignment="center"
        onScrollToIndexFailed={(info) => {
          // Handle scroll failure gracefully
          const wait = new Promise(resolve => setTimeout(resolve, 500));
          wait.then(() => {
            if (tabListRef.current && stickers?.length > 0) {
              tabListRef.current.scrollToIndex({ index: info.index, animated: true });
            }
          });
        }}
      />
    );
  };

  const renderTabContent = () => {
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
      <Animated.View style={styles.tabSection}>
        {renderTabButtons()}
      </Animated.View>
      <Animated.View style={styles.contentSection}>
        {renderTabContent()}
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Spacing.height315,
    backgroundColor: ColorsApp.background,
  },
  tabSection: {
    height: Spacing.width60,
    borderBottomWidth: 1,
    borderBottomColor: ColorsApp.border,
  },
  contentSection: {
    flex: 1,
    paddingTop: Spacing.width8,
  },
  title: {
    fontSize: FontSize.FontSize16,
    ...FontWithFamily.FontWithFamily_600,
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  stickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  listItem: {
    gap: Spacing.width16,
    paddingHorizontal: Spacing.width16,
    marginVertical: Spacing.width16,
  },

  tabScrollContainer: {
    height: Spacing.width60,
  },
  tabContentContainer: {
    alignItems: 'center',
    height: Spacing.width60,
  },
  tabButton: {
    height: Spacing.width60,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.width8,
    paddingHorizontal: Spacing.width8,
  },
  tabText: {
    fontSize: FontSize.FontSize16,
    ...FontWithFamily.FontWithFamily_600,
  },
  tabTextSelected: {
    color: ColorsApp.primary, // Change text color for selected tab
  },
  tabSelected: {
    borderBottomWidth: 3, // Increased border width for visibility
    borderBottomColor: ColorsApp.primary,
  },
});
