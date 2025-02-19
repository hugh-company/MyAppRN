import { ArrowDropLeft, ArrowDropRight, IconNumberedList, PlayStackedIcon } from '@assets';
import { Spacing, useTheme } from '@theme';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
export interface ControlBottomProps {
  onNextStep?: () => void;
  onPrevStep?: () => void;
  isNext?: boolean;
  isPrev?: boolean;
  onShowModal?: () => void;
  isFilter?: boolean;
  onFilter?: () => void;
}

export function ControlBottom(props: ControlBottomProps) {
  const { onNextStep, onPrevStep, isNext, isPrev, onFilter, onShowModal, isFilter } = props;
  const { themeColors } = useTheme();
  const { bottom } = useSafeAreaInsets();
  return (
    <View style={[styles.container, {
      backgroundColor: themeColors.background,
      paddingBottom: bottom,
    }]} >
      <TouchableOpacity style={[styles.btn, !isPrev && styles.disabledBtn]} onPress={onPrevStep} disabled={!isPrev}>
        <ArrowDropLeft width={Spacing.width30} height={Spacing.width30} />
      </TouchableOpacity>
      {isFilter && <TouchableOpacity onPress={onFilter} style={styles.btn} >
        <PlayStackedIcon width={Spacing.width28} height={Spacing.width28} color="#EDEDED" />
      </TouchableOpacity>
      }
      <TouchableOpacity onPress={onShowModal} style={styles.btn} >
        <IconNumberedList />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.btn, !isNext && styles.disabledBtn]} onPress={onNextStep} disabled={!isNext}>
        <ArrowDropRight width={Spacing.width30} height={Spacing.width30} />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  btn: {
    width: Spacing.width50,
    height: Spacing.width50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledBtn: {
    opacity: 0.5,
  },
});
