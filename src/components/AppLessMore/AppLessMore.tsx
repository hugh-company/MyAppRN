import { AppText } from '@components';
import { FontWithFamily, Spacing, useTheme, WidthScreen } from '@theme';
import { t } from 'i18next';
import React, { useCallback, useState } from 'react';
import { LayoutChangeEvent, Platform, TouchableOpacity, View } from 'react-native';
import RenderHTML, { defaultSystemFonts } from 'react-native-render-html';
import { createStyles } from './styles';

export interface AppLessMoreProps {
  html?: string
  text?: string
  initialNumberOfLines?: number
}
const systemFonts = [...defaultSystemFonts];

const AppLessMore = ({ html, initialNumberOfLines = 3, text }: AppLessMoreProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const [isExpanded, setIsExpanded] = useState(false);
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const onTextLayout = useCallback((e: any) => {
    setLengthMore(e.nativeEvent.lines.length >= initialNumberOfLines); //to check the text is more than 4 lines or not
    // console.log(e.nativeEvent);
  }, []);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  if (text) {
    <>
      <AppText
        onTextLayout={onTextLayout}
        numberOfLines={isExpanded ? undefined : initialNumberOfLines}>
        {text}
      </AppText>
      {
        lengthMore && (
          <TouchableOpacity onPress={toggleExpand}>
            <AppText>{isExpanded ? t('movie.show_less') : t('movie.more')}</AppText>
          </TouchableOpacity>
        )
      }
    </>;
  }
  const onLayout = useCallback((e: LayoutChangeEvent) => {
    setLengthMore(e.nativeEvent.layout.height >= 100);
  }
    , []);

  return (
    <View style={styles.container}>
      <View onLayout={onLayout} style={[styles.content, lengthMore && (!isExpanded ? { height: Spacing.height100 } : { height: 'auto' })]}>
        <RenderHTML
          contentWidth={WidthScreen - Spacing.width32}
          source={{ html: html || '' }}
          systemFonts={systemFonts}
          tagsStyles={{
            ul: {
              color: themeColors.text,
              ...FontWithFamily.FontWithFamily_400,
            },
            ol: {
              color: themeColors.text,
              ...FontWithFamily.FontWithFamily_500,
            },
            p: {
              color: themeColors.text,
              ...FontWithFamily.FontWithFamily_500,
            },
            h2: {
              ...FontWithFamily.FontWithFamily_600,
              ...(Platform.OS === 'android' && { fontWeight: '600' }), // 🎉 Huzzah! displays font on Android 🎉
            },
            strong: {
              color: themeColors.text,
              ...(Platform.OS === 'android' && { fontWeight: '600' }), // 🎉 Huzzah! displays font on Android 🎉
            },
            span: {
              color: themeColors.text,

              ...FontWithFamily.FontWithFamily_400,
            },
            li: {
              justifyContent: 'center',
              position: 'absolute',
              lineHeight: Spacing.height28,
              top: -Spacing.height6,
            },

          }}
        />
      </View>
      {lengthMore && <TouchableOpacity style={styles.btnMore} onPress={toggleExpanded}>
        <AppText style={styles.txtMore}>{isExpanded ? t('movie.show_less') : t('movie.more')}</AppText>
      </TouchableOpacity>}
    </View>
  );
};


export default AppLessMore;
