import { AppInputSearch, AppText } from '@components';
import { goBack } from '@navigation';
import { useTheme } from '@theme';
import { t } from 'i18next';
import { debounce } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { StyleProp, TextInput, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createStyles } from './styles';
export interface AppSearchInputProps {
  onSearch: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
  searchText?: string; // New prop
  onCancel?: () => void;
  style?: StyleProp<ViewStyle>
}
const AppSearchInput = ({ onSearch, placeholder, onClear, searchText, style, onCancel }: AppSearchInputProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const refSearch = useRef<TextInput>(null);
  const [search, setSearch] = useState(searchText || ''); // Initialize with searchText if provided
  const { top } = useSafeAreaInsets();
  const debounceSearch = useRef(
    debounce((text: string) => {
      onSearch(text);
    }, 0)
  ).current;

  const onChangeText = (text: string) => {
    setSearch(text);
    debounceSearch(text);
  };
  useEffect(() => {
    if (!search) {
      onClear && onClear();
    }
  }, [search]);

  useEffect(() => {
    if (searchText !== undefined) {
      setSearch(searchText);
    }
  }, [searchText]); // Update search state when searchText prop changes

  return (
    <View style={[styles.container, { paddingTop: top }, style]}>
      {onCancel && <TouchableOpacity style={styles.btnCancel} onPress={() => goBack()}>
        <AppText style={styles.txtCancel}>{t('cancel')}</AppText>
      </TouchableOpacity>}
      <AppInputSearch
        value={search}
        ref={refSearch}
        style={styles.containerInput}
        placeholder={placeholder || t('search.search')}
        onChangeText={onChangeText}

      />
    </View>
  );
};

export default AppSearchInput;
