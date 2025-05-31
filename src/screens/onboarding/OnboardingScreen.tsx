import { BackgroundHeader, LogoTextIcon, Onboarding1, Onboarding2, Onboarding3 } from '@assets';
import { AppImage } from '@components';
import { setHasSeenOnboarding } from '@redux';
import { FontSize, FontWithFamily, HeightScreen, Spacing, ThemeColors, useTheme, WidthScreen } from '@theme';
import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

const { width, height } = Dimensions.get('window');

const DATA = [
  {
    key: '1',
    title: 'Đăng ký dịch vụ nhanh chóng',
    description: 'Tra cứu/ đăng ký/ quản lý nhanh chóng tất cả dịch vụ chỉ một chạm.',
    image: Onboarding1,
  },
  {
    key: '2',
    title: 'Thanh toán tiện lợi',
    description: 'Tích hợp nhiều cổng thanh toán an toàn và bảo mật thông tin.',
    image: Onboarding2,
  },
  {
    key: '3',
    title: 'Ưu đãi hấp dẫn',
    description: 'Khám phá nhung ưu đãi độc quyền từ các đối tác của chúng tôi.',
    image: Onboarding3,
  },
];



const OnboardingScreen = ({ navigation }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const { top, bottom } = useSafeAreaInsets();
  const { themeColors: ThemeColors } = useTheme();
  const styles = createStyles(ThemeColors);

  const dispatch = useDispatch();

  const handleNext = async () => {
    if (currentIndex < DATA.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      dispatch(setHasSeenOnboarding(true));
    }
  };

  const handleSkip = async () => {
    dispatch(setHasSeenOnboarding(true));
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  return (
    <View style={[styles.container,]}>
      <AppImage defaultSource={BackgroundHeader} style={styles.headerBackground} resizeMode="cover" />
      {/* Logo trên header */}
      <View style={[styles.header, { paddingTop: top, paddingBottom: bottom }]}>

        <AppImage defaultSource={LogoTextIcon} style={styles.logo} resizeMode='contain' />
      </View>
      {/* Slider */}
      <FlatList
        ref={flatListRef}
        data={DATA}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <AppImage defaultSource={item.image} style={styles.image} resizeMode="contain" />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
      />
      {/* Dots */}

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skip}>Bỏ qua</Text>
        </TouchableOpacity>
        <View style={styles.dotsContainer}>
          {DATA.map((_, idx) => (
            <View
              key={idx}
              style={[
                styles.dot,
                currentIndex === idx && styles.activeDot,
              ]}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.next}>{currentIndex === DATA.length - 1 ? 'Bắt đầu' : 'Tiếp theo'}</Text>
        </TouchableOpacity>
      </View >
    </View >
  );
};

export const createStyles = (themeColors: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: themeColors.background },
  header: { alignItems: 'center', paddingTop: Spacing.width16, position: 'relative' }, // Added position: 'relative'
  headerBackground: { ...StyleSheet.absoluteFillObject, width: WidthScreen, height: HeightScreen / 1.2 }, // Added style for background
  logo: { width: Spacing.width200, height: Spacing.width50, zIndex: 1 }, // Added zIndex to ensure logo is on top
  slide: { width, alignItems: 'center', justifyContent: 'center' },
  image: { width: width * 0.9, height: height * 0.5, marginVertical: 20 },
  title: { fontSize: FontSize.FontSize16, fontWeight: 'bold', textAlign: 'center', marginTop: Spacing.width16, color: '#333' },
  description: { fontSize: FontSize.FontSize14, textAlign: 'center', marginTop: 10, color: themeColors.disable, maxWidth: '80%' },
  dotsContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 20 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#ccc', marginHorizontal: 4 },
  activeDot: { backgroundColor: '#333', width: 16 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: Spacing.width16 },
  skip: { fontSize: 16, color: '#888' },
  nextButton: { backgroundColor: themeColors.primary, paddingHorizontal: 24, paddingVertical: 10, borderRadius: 20 },
  next: { color: themeColors.whiteColor, ...FontWithFamily.FontWithFamily_500, fontSize: 16 },
});

export default OnboardingScreen;
