import { AppText } from '@components';
import { Spacing, useTheme } from '@theme';
import { t } from 'i18next';
import React, { useState } from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { defaultSystemFonts } from 'react-native-render-html';
import { createStyles } from './styles';

export interface AppLessMoreProps {
  html?: string
  text?: string
  initialNumberOfLines?: number
  style?: StyleProp<ViewStyle>
}
const systemFonts = [...defaultSystemFonts];


const AppLessMore = ({ html, initialNumberOfLines = 3, text = '', style }: AppLessMoreProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const characterLimit = 200; // Set your character limit here

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const truncatedText = text.length > characterLimit ? text.slice(0, characterLimit) + '...' : text;

  React.useEffect(() => {
    if (text.length > characterLimit) {
      setShowToggle(true);
    }
  }, [text]);

  return (
    <View style={[styles.container, style]}>
      {isExpanded ? (
        <ScrollView style={{ maxHeight: Spacing.height150 }}>
          <AppText>
            {text}
          </AppText>
        </ScrollView>
      ) : (
        <AppText>
          {truncatedText}
        </AppText>
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
