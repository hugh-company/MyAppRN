import { AppImage, AppText } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { getUserInfo } from '@redux';
import { FontSize, Spacing, ThemeColors, useTheme } from '@theme';
import { navHorizontalInterface, TypeOptionsDating } from '@types';
import { t } from 'i18next';
import React from 'react';
import { FlatList, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useSelector } from 'react-redux';
import { SlideImage } from './SlideImage';
export interface ListHorizontalUserProps {
  data: navHorizontalInterface[];
  onPress?: (item: navHorizontalInterface) => void;
  style?: StyleProp<ViewStyle>;
  tabSelected?: TypeOptionsDating;
}

export function ListHorizontalUser(props: ListHorizontalUserProps) {
  const { data, onPress, style, tabSelected = TypeOptionsDating.NEAR_YOU } = props;
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const profile = useSelector(getUserInfo);
  const menuBorderColors = {
    [TypeOptionsDating.NEAR_YOU]: {
      borderColor: themeColors.primary,
      borderWidth: 3,
    },
    [TypeOptionsDating.MATCHED]: {
      borderColor: themeColors.primary,
      borderWidth: 3,
    },
    [TypeOptionsDating.LIKE]: {
      borderColor: '#6B87F9',
      borderWidth: 3,
    },
  };
  const renderImageNearYou = (item: navHorizontalInterface) => {
    return (
      <TouchableOpacity onPress={() => {
        onPress && onPress(item);
      }} style={[styles.viewImageNearYou, item.heading === tabSelected && menuBorderColors[tabSelected]]}>
        <SlideImage data={item.items} style={styles.imageNearYou} />
        <View style={styles.dots} />
        <View style={styles.location}>
          <AppImage uri={item.icon} style={styles.iconSize} />
        </View>
      </TouchableOpacity>
    );
  };

  const renderInfoUser = () => {
    return (
      <TouchableOpacity onPress={() => navigate(SCREEN_ROUTE.CREATE_PROFILE)} style={[styles.item, { marginRight: 0 }]}>
        <AppImage uri={profile?.avatar} style={styles.viewProfile} />
        <AppText style={styles.txt}>{t('profile')}</AppText>
      </TouchableOpacity>
    );
  };
  const renderItem = ({ item }: { item: navHorizontalInterface }) => {
    return (
      <TouchableOpacity style={[styles.item]} onPress={() => {
        onPress && onPress(item);
      }}>
        {item?.heading === TypeOptionsDating.NEAR_YOU ? renderImageNearYou(item) : <View>

          <AppImage uri={item?.item} style={[styles.image, item?.heading === tabSelected && menuBorderColors[tabSelected]]} />
          <View style={styles.icon}>
            <AppImage uri={item?.icon} style={styles.iconSize} />
          </View>
        </View>}
        <AppText style={styles.txt}>{item.label}</AppText>
      </TouchableOpacity>
    );
  };
  return (
    <View style={[styles.container, style]}>
      <FlatList
        data={data}
        renderItem={renderItem}
        horizontal
        style={styles.list}

        keyExtractor={(item, index) => `list_category_${index}`}
      />
      {renderInfoUser()}
    </View>
  );
}
const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    list: {
      paddingVertical: Spacing.width16,
    },
    image: {
      width: Spacing.width56,
      height: Spacing.width56,
      borderRadius: Spacing.width56,

    },
    wrapper: {
      gap: Spacing.width16,
    },
    iconSize: {
      width: Spacing.width24,
      height: Spacing.width24,

    },
    item: {
      marginRight: Spacing.width16,
      gap: Spacing.width12,
      alignItems: 'center',

    },
    viewProfile: {
      width: Spacing.width56,
      height: Spacing.width56,
      borderRadius: Spacing.width56,
      borderWidth: 1,
      borderColor: themeColors.whiteColor,
    },
    viewImageNearYou: {
      shadowColor: themeColors.primary,
      // backgroundColor: themeColors.primary,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.27,
      shadowRadius: 0.65,
      borderRadius: Spacing.width56,
      elevation: 1,
      //

    },
    imageNearYou: {


    },


    //
    dots: {
      width: Spacing.width12,
      height: Spacing.width12,
      borderRadius: Spacing.width12,
      backgroundColor: themeColors.primary,
      position: 'absolute',
      top: 0,
      right: 0,
    },
    txt: {
      fontSize: FontSize.FontSize10,
      color: themeColors.whiteColor,

    },
    location: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      backgroundColor: 'rgba(0,0,0,0.5)',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
