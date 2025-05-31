import { CloseIcon, SearchIcon } from '@assets';
import { FontWithFamily, Spacing, useTheme } from '@theme';
import { t } from 'i18next';
import React, { useRef, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, ViewStyle } from 'react-native';
import { createStyles } from './styles';

export interface AppInputSearchDomainProps {
  style?: ViewStyle;
  inputStyle?: ViewStyle;
  editable?: boolean;
  placeholder?: string;
  onClickSearch?: (text: string) => void;
  autoFocus?: boolean; // new optional prop
}

const AppInputSearchDomain: React.FC<AppInputSearchDomainProps> = ({
  style,
  inputStyle,
  editable = true,
  placeholder,
  onClickSearch,
  autoFocus = false,
}) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const [value, setValue] = useState('');
  const inputRef = useRef<TextInput>(null);

  const handleSearch = () => {
    if (onClickSearch) {
      onClickSearch(value);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        onPress={() => {
          if (!editable) {
            handleSearch();
          } else {
            inputRef.current?.focus(); // Ensure input is focused only when editable
          }
        }}
        style={[styles.inputContainer, inputStyle]}
        activeOpacity={editable ? 1 : 0.7}
      >
        <SearchIcon size={Spacing.width20} color={themeColors.text} />
        <Text style={{ color: themeColors.primary, ...FontWithFamily.FontWithFamily_700 }}>www.</Text>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholderTextColor={themeColors.subtile}
          placeholder={placeholder || t('search.movies')}
          value={value}
          onChangeText={setValue}
          editable={editable}
          pointerEvents={!editable ? 'none' : undefined} // add pointerEvents
          autoFocus={editable ? autoFocus : false} // pass autoFocus
          onSubmitEditing={handleSearch}
          onFocus={() => {
            if (!editable) {
              handleSearch(); // Ensure handleSearch is called when editable is false
            }
          }}
        />
        {!!value && (
          <TouchableOpacity
            style={styles.btnClose}
            onPress={() => setValue('')}
          >
            <CloseIcon size={Spacing.width12} color={themeColors.text} />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default AppInputSearchDomain;
