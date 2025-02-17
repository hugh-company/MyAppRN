import { AppInputSearch, AppText } from '@components';
import { goBack } from '@navigation';
import { useTheme } from '@theme';
import { t } from 'i18next';
import { debounce } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createStyles } from './styles';
export interface AppSearchInputProps {
  onSearch: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
}
const AppSearchInput = ({ onSearch, placeholder, onClear }: AppSearchInputProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const refSearch = useRef<TextInput>(null);
  const [search, setSearch] = useState('');
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
  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <TouchableOpacity style={styles.btnCancel} onPress={() => goBack()}>
        <AppText style={styles.txtCancel}>{t('cancel')}</AppText>
      </TouchableOpacity>
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
