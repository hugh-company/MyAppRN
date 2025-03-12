import { AppText } from '@components';
import { FontWithFamily, Spacing, useTheme } from '@theme';
import { t } from 'i18next';
import React, { useState } from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import RenderHTML, { defaultSystemFonts } from 'react-native-render-html';
import { createStyles } from './styles';

export interface AppLessMoreProps {
  value?: string
  initialNumberOfLines?: number
  style?: StyleProp<ViewStyle>
  maxHeight?: number
}
const systemFonts = [...defaultSystemFonts];


const AppLessMore = ({ value = '', maxHeight = Spacing.height150, style }: AppLessMoreProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const isHtml = value.includes('<') && value.includes('>');
  const characterLimit = 200; // Set your character limit here

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const truncatedValue = value.length > characterLimit ? value.slice(0, characterLimit) + '...' : value;

  const customRenderersProps = {
    a: {
      color: themeColors.primary,
      ...FontWithFamily.FontWithFamily_400,
    },
    p: {
      color: themeColors.text,
      ...FontWithFamily.FontWithFamily_400,
    },

    // Add more custom styles as needed
  };

  React.useEffect(() => {
    if (value.length > characterLimit) {
      setShowToggle(true);
    }
  }, [value]);

  return (
    <View style={[styles.container, style]}>
      {isExpanded ? (
        <ScrollView style={{ maxHeight: typeof maxHeight === 'number' ? maxHeight : parseFloat(maxHeight) }}>
          {isHtml ? (
            <RenderHTML contentWidth={maxHeight} source={{ html: value }} tagsStyles={customRenderersProps} />
          ) : (
            <AppText>
              {value}
            </AppText>
          )}
        </ScrollView>
      ) : (
        <>
          {isHtml ? (
            <RenderHTML contentWidth={maxHeight} source={{ html: truncatedValue }} tagsStyles={customRenderersProps} />
          ) : (
            <AppText>
              {truncatedValue}
            </AppText>
          )}
        </>
      )}
      {showToggle && (
        <TouchableOpacity hitSlop={
          { top: 10, bottom: 10, left: 10, right: 10 }
        } style={styles.btnMore} onPress={toggleExpand}>
          <AppText style={styles.txtMore}>{isExpanded ? t('movie.show_less') : t('movie.more')}</AppText>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AppLessMore;
