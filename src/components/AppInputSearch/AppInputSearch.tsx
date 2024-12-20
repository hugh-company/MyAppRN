import { SearchIcon } from '@assets';
import { Spacing, useTheme } from '@theme';
import { t } from 'i18next';
import React, { forwardRef } from 'react';
import { TextInput, View, ViewStyle } from 'react-native';
import { createStyles } from './styles';
export interface AppInputSearchProps {
  value?: string;
  style?: ViewStyle;
  onChangeText?: (text: string) => void;
  editable?: boolean
}
const AppInputSearch = forwardRef<TextInput, AppInputSearchProps>((props, ref) => {
  const { value, style, onChangeText } = props;
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  return (
    <View style={[styles.container, style]}>
      <View style={styles.inputContainer}>
        <SearchIcon size={Spacing.width20} color={themeColors.subtile} />
        <TextInput
          ref={ref}

          style={[
            styles.input,
            style,

          ]}
          editable={false}
          placeholderTextColor={themeColors.placeholder}
          placeholder={t('search.movies')}
          value={value}
          onChangeText={onChangeText}

        />
      </View>

    </View>
  );

});



export default AppInputSearch;
