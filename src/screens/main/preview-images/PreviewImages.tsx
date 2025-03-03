import { CloseIcon } from '@assets';
import { goBack } from '@navigation';
import { Spacing, useTheme } from '@theme';
import React, { useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { FlatList } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SnapbackZoom } from 'react-native-zoom-toolkit';
import { usePreviewImages } from './PreviewImages.hook';
import { createStyles } from './styles';

const PreviewImages = (props: any) => {
  const { data } = usePreviewImages();
  const { top } = useSafeAreaInsets();
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const flatListRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onViewRef = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const renderItemBanner = ({ item, index }: any) => (

    <SnapbackZoom>
      <FastImage source={{ uri: item }} style={styles.image} resizeMode={'center'} />
    </SnapbackZoom>

  );

  if (data?.length === 0) { return null; }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal
        pagingEnabled
        key={'banner'}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItemBanner}
        keyExtractor={(item, index) => `banner_child_${index}`}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}

      />
      <View style={styles.dotsContainer}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
      <View style={[styles.header, { paddingTop: top || Spacing.width16 }]}>
        <TouchableOpacity onPress={() => goBack()} style={styles.btnBack}>
          <CloseIcon color={'white'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PreviewImages;
