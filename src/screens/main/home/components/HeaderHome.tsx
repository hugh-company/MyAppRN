import { CartIcon } from '@assets';
import { AppText } from '@components';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '@redux';
import { FontSize, Spacing, ThemeColors, useTheme } from '@theme';
import React from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

interface HeaderHomeProps {

  styleHeader?: StyleProp<ViewStyle>;
}

export const HeaderHome = ({ styleHeader }: HeaderHomeProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const { top } = useSafeAreaInsets();
  const profile = useSelector((state: RootState) => state.accountSlice.userInfo);
  const token = useSelector((state: RootState) => state.accountSlice.token);
  const navigation = useNavigation();

  return (
    <Animated.View style={[styles.container, styleHeader, { paddingTop: top || Spacing.width16 }]}>
      <View style={[styles.header]}>
        <AppText style={styles.txtHello}>

          Xin chào, <AppText style={styles.txtName}>{` ${profile?.fullname || 'Khách'}!`}</AppText>

        </AppText>
        <TouchableOpacity>
          <CartIcon />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: themeColors.primary,
      paddingBottom: Spacing.width16,
    },
    linear: {
      ...StyleSheet.absoluteFillObject,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: Spacing.width16,

    },
    //
    txtHello: {
      fontSize: FontSize.FontSize16,
      color: themeColors.whiteColor,
    },
    txtName: {
      fontSize: FontSize.FontSize16,
      color: themeColors.whiteColor,
      fontWeight: 'bold',
    },
    //
    btnMenu: {
      width: Spacing.width32,
      height: Spacing.width32,
      justifyContent: 'center',
      alignItems: 'center',
    },
    banner: {

    },
  });
