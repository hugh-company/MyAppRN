import { CloseIcon, SearchIcon } from '@assets';
import { Spacing, useTheme } from '@theme';
import { t } from 'i18next';
import React, { forwardRef } from 'react';
import { TextInput, TouchableOpacity, View, ViewStyle } from 'react-native';
import { createStyles } from './styles';
export interface AppInputSearchProps {
  value?: string;
  style?: ViewStyle;
  onChangeText?: (text: string) => void;
  editable?: boolean;
  placeholder?: string;
  inputStyle?: ViewStyle;
  onClickSearch?: () => void;
}
const AppInputSearch = forwardRef<TextInput, AppInputSearchProps>((props, ref) => {
  const { value, style, onChangeText, placeholder, inputStyle, editable = true } = props;
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={() => {
        if (!editable) {
          props.onClickSearch && props.onClickSearch();
        }
      }} style={[styles.inputContainer, inputStyle]}>
        <SearchIcon size={Spacing.width20} color={themeColors.text} />
        <TextInput
          ref={ref}
          style={[
            styles.input,
          ]}
          placeholderTextColor={themeColors.subtile}
          placeholder={placeholder || t('search.movies')}
          value={value}
          onChangeText={onChangeText}
          editable={editable}
          onPress={() => {
            if (!editable) {
              props.onClickSearch && props.onClickSearch();
            }
          }}
        />
        {value && <TouchableOpacity style={styles.btnClose} onPress={() => {
          if (onChangeText) {
            onChangeText('');
          }
        }}><CloseIcon size={Spacing.width12} color={themeColors.subtile} /></TouchableOpacity>}
      </TouchableOpacity>

    </View>
  );

});



export default AppInputSearch;
