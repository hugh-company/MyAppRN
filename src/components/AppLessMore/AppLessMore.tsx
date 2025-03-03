import { AppText } from '@components';
import { useTheme } from '@theme';
import { t } from 'i18next';
import React, { useCallback, useState } from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { defaultSystemFonts } from 'react-native-render-html';
import { createStyles } from './styles';

export interface AppLessMoreProps {
  html?: string
  text?: string
  initialNumberOfLines?: number
  style?: StyleProp<ViewStyle>
}
const systemFonts = [...defaultSystemFonts];


const AppLessMore = ({ html, initialNumberOfLines = 3, text, style }: AppLessMoreProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const onTextLayout = useCallback(e => {
    if (isFirstRender) {
      const { lines } = e.nativeEvent;
      if (lines.length > initialNumberOfLines) {
        setShowToggle(true);
      }
      setIsFirstRender(false);
    }
  }, [isFirstRender, initialNumberOfLines]);


  return (
    <View style={[styles.container, style]}>
      <AppText
        onTextLayout={onTextLayout}
        numberOfLines={isFirstRender ? undefined : isExpanded ? undefined : initialNumberOfLines}
      >
        {text}
      </AppText>
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
