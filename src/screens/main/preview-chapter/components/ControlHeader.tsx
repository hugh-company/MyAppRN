import { LeftIcon } from '@assets';
import { AppText } from '@components';
import { goBack } from '@navigation';
import { FontSize, FontWithFamily, Spacing, useTheme } from '@theme';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
export interface ControlHeaderProps {
  name: string;
  nameChapter: string;
}

export function ControlHeader(props: ControlHeaderProps) {
  const { name, nameChapter } = props;
  const { themeColors } = useTheme();
  const { top } = useSafeAreaInsets();
  return (
    <View style={[styles.container, {
      backgroundColor: themeColors.background,
      paddingTop: top + Spacing.width8,
    }]} >
      <TouchableOpacity style={styles.btn} onPress={() => goBack()}>
        <LeftIcon />
      </TouchableOpacity>
      <View style={styles.infoChapter}>
        <AppText style={styles.nameChapter}>{nameChapter}</AppText>
        <AppText style={styles.name}>{name}</AppText>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  btn: {
    width: Spacing.width50,
    // height: Spacing.width50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoChapter: {
    flex: 1,
    // alignItems: 'center',
    gap: Spacing.width10,

  },
  name: {
    fontSize: FontSize.FontSize12,
    ...FontWithFamily.FontWithFamily_400,
  },
  nameChapter: {
    fontSize: FontSize.FontSize14,
    ...FontWithFamily.FontWithFamily_700,
  },

});
