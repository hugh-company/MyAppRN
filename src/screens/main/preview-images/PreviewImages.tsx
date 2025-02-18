import { CloseIcon } from '@assets';
import { AppImage } from '@components';
import { goBack } from '@navigation';
import { FlashList } from '@shopify/flash-list';
import { HeightScreen, Spacing, useTheme, WidthScreen } from '@theme';
import React, { useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
    <View key={index} style={styles.btn}>
      <ImageZoom
        cropWidth={WidthScreen}
        cropHeight={HeightScreen}
        imageWidth={WidthScreen}
        imageHeight={HeightScreen}
      >
        <AppImage uri={item} style={styles.image} resizeMode={'center'} isBase={false} />
      </ImageZoom>
    </View>
  );

  if (data?.length === 0) { return null; }

  return (
    <View style={styles.container}>
      <FlashList
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
        estimatedItemSize={WidthScreen}
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
