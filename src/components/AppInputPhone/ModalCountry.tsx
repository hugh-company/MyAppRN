import { CloseIcon } from '@assets';
import { Spacing, ThemeColors, useTheme } from '@theme';
import { debounce } from 'lodash';
import React from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppImage } from '../AppImage';
import { AppInputSearch } from '../AppInputSearch';
import { AppText } from '../AppText';
import { countryInterface } from './AppInputPhoneDefault';
import { country } from './country';

interface ModalCountryProps {
  value: string;
  visible: boolean;
  onClose?: () => void;
  onSelectCountry?: (value: countryInterface) => void;
}

export const ModalCountry = ({ visible, onClose, value, onSelectCountry }: ModalCountryProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const { top, bottom } = useSafeAreaInsets();
  const [search, setSearch] = React.useState('');
  const [data, setData] = React.useState(country);
  const debouncedSearchRef = React.useRef(debounce((text, setData) => {
    const searchText = text.toLowerCase();

    if (searchText === '') {

      setData(country);
      return;
    }
    const newData = country.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.cca2.toLowerCase().includes(searchText.toLowerCase()) ||
        item.callingCode.some(code => code.includes(searchText.toLowerCase()))
      );
    });
    setData(newData);
  }, 500)).current;

  const onSearch = (text: string) => {
    setSearch(text);
    debouncedSearchRef(text, setData);
  };

  const translateY = useSharedValue(300);

  React.useEffect(() => {
    if (visible) {
      translateY.value = withSpring(0);
    } else {
      translateY.value = withTiming(0);
      setSearch('');
      setData(country);
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const handleSelectCountry = (item: countryInterface) => {
    onSelectCountry?.(item);
    onClose?.();
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={() => onClose?.()}>
      <View style={styles.modalOverlay}>
        <Animated.View style={[styles.modalContainer, animatedStyle]}>
          <View style={[styles.header, { paddingTop: top || Spacing.width16 }]}>
            <TouchableOpacity onPress={() => onClose?.()}>
              <CloseIcon color="black" />
            </TouchableOpacity>
            <AppInputSearch
              value={search}
              style={styles.containerInput}
              placeholder={"Vui lòng nhập tên quốc gia, mã quốc gia hoặc mã gọi"}
              onChangeText={(text) => onSearch(text)}
            />
          </View>
          {/* list */}
          <KeyboardAwareFlatList
            data={data}
            renderItem={({ item }) => <RenderItem item={item} styles={styles} valueSelect={value} onPress={() => handleSelectCountry(item)} />}
            keyExtractor={(item) => item.cca2}
          />
        </Animated.View>
      </View>
    </Modal>
  );
};

const RenderItem = React.memo(({ item, styles, valueSelect, onPress }: { item: countryInterface, styles: any, valueSelect: string, onPress?: () => void }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.item, valueSelect === item.cca2 && styles.itemSelect]} >

      <AppImage uri={item.flag} style={styles.flag} isBase={false} resizeMode={'contain'} />
      <AppText>(+{item?.callingCode?.[0]}) {item?.name}</AppText>

    </TouchableOpacity>
  );
});
const createStyles = (themeColors: ThemeColors) => StyleSheet.create({
  modalOverlay: {
    flex: 1,

    backgroundColor: themeColors.background,
  },
  modalContainer: {

    backgroundColor: themeColors.background,
    borderRadius: 10,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.width16,
    paddingHorizontal: Spacing.width16,
    borderBottomWidth: 1,
    borderBottomColor: themeColors.border,
  },
  containerInput: {
    flex: 1,
    marginHorizontal: Spacing.width16,
  },
  item: {
    padding: Spacing.width16,
    borderBottomWidth: 1,
    borderBottomColor: themeColors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.width16,
  },
  itemSelect: {
    backgroundColor: themeColors.primary,
  },
  flag: {
    width: Spacing.width30,
    height: Spacing.width20,
  },
});
