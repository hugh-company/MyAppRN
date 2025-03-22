import { BrandIcon, CheckRead, CloseIcon, LikeActiveIcon } from '@assets';
import { AppImage, AppNotFound, AppText } from '@components';
import { Spacing, useTheme } from '@theme';
import { PostTypeKey } from '@types';
import { getPrettyNumberString, goToDetail } from '@utils';
import { t } from 'i18next';
import React from 'react';
import { RefreshControl, StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { createStyles } from './styles';
export interface AppControlPostProps {
  data: any[];
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null | undefined;
  type?: PostTypeKey;
  contentContainerStyle?: StyleProp<ViewStyle>;
  ids?: number[];
  onSelectId?: (id: number) => void;
  isSelect?: boolean;
  onDelete?: (id: number) => void;
  style?: StyleProp<ViewStyle>;
  ListFooterComponent?: React.ComponentType<any> | React.ReactElement | null | undefined;
  refetch?: () => void;
  refreshing?: boolean;
}
const AppControlPost = ({ ListHeaderComponent, data, type, style, refreshing,
  contentContainerStyle, onDelete, ListFooterComponent,
  ids, onSelectId, isSelect, refetch }: AppControlPostProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const renderButtonSelect = (isSelectItem: boolean, id: number) => {
    if (isSelect) {
      if (isSelectItem) {
        return (
          <View style={styles.btnSelectActive}>
            <CheckRead />
          </View>
        );
      } else {
        return (
          <View style={styles.btnSelect}>
            {/* <CloseIcon color="white" /> */}
          </View>
        );
      }
    } else {
      return (
        <TouchableOpacity style={styles.btnDelete} onPress={() => onDelete?.(id)}>
          <CloseIcon color="white" size={16} />
        </TouchableOpacity>
      );
    }
  };
  const renderItem = ({ item }: { item: any }) => {
    const isSelectItem = ids?.includes(item.id) ?? false;
    return (
      <TouchableOpacity onPress={() => {
        if (isSelect) {
          onSelectId?.(item.id);
        }
        else {
          goToDetail({ item, type: type || item?.posttype });
        }
      }} style={styles.item}>
        <AppImage uri={item.feature?.path} style={styles.image} />
        <View style={styles.viewInfo}>
          <AppText numberOfLines={2} style={styles.name}>{item.title}</AppText>
          <View style={styles.viewOption}>
            <View style={styles.viewRow}>
              <LikeActiveIcon size={Spacing.width10} color={themeColors.star} />
              <AppText style={styles.txtView}>
                {getPrettyNumberString(item.like_count ?? 0)}
              </AppText>
            </View>

            <View style={styles.viewRow}>
              <BrandIcon />
              <AppText style={styles.txtLike}>{getPrettyNumberString(item.views ?? 0)} {t(type === PostTypeKey.GAMES ? 'home.playGame' : 'home.viewer')}</AppText>
            </View>
          </View>


        </View>
        {renderButtonSelect(isSelectItem, item.id)}
      </TouchableOpacity>
    );
  };
  return (

    <FlatList
      data={data}
      numColumns={2}
      ListEmptyComponent={<AppNotFound title={t('not_found.title')} description={t('not_found.description_history')} />}
      ListHeaderComponent={ListHeaderComponent}
      onRefresh={refetch}
      refreshControl={
        refetch && (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refetch}
            tintColor={themeColors.text}

          />
        )
      }
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      scrollEventThrottle={16}
      contentContainerStyle={contentContainerStyle}
      columnWrapperStyle={styles.columnWrapper}

      ListFooterComponent={ListFooterComponent || <View style={styles.bottom} />}

    />

  );
};

export default AppControlPost;
