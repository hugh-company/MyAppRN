import { AppImage, AppText } from '@components';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import { PostTypeKey } from '@types';
import React, { useMemo } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

export interface LabelViewProps {
  style?: StyleProp<ViewStyle>;
  title?: string;
  type?: PostTypeKey;
  uri?: string;
}

export function LabelView(props: LabelViewProps) {
  const { title, type, style, uri } = props;
  const { themeColors } = useTheme();


  const styles = useMemo(() => createStyles(themeColors), [themeColors]);

  return <View style={[styles.container]}>
    <AppText style={styles.title}>
      {title}
    </AppText>
    <AppImage resizeMode={'contain'} uri={uri} style={styles.image} />
  </View>;
}

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: Spacing.width16,
    },
    title: {
      fontSize: FontSize.FontSize24,
      ...FontWithFamily.FontWithFamily_600,
    },
    image: {
      width: Spacing.width92,
      height: Spacing.width92,
    },
  });
