import { FilterIcon, LocationIcon2, ProfileIcon } from '@assets';
import { AppButton, AppText, HeaderMain } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { Spacing } from '@theme';
import { t } from 'i18next';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDatingScreen } from './DatingScreen.hook';
import AppListDating from './components/AppListDating';
import { ButtonSearch } from './components/ButtonSearch';
import { ListHorizontalUser } from './components/ListHorizontalUser';

export const DatingScreen = () => {
  const { data, loading, styles, tab,
    onSelectTab, isPermissionLocation, goToSettingLocation, loadMore, isLoadingMore,
    dataHeader, onRefresh,
  } = useDatingScreen();


  if (!isPermissionLocation) {
    return (
      <View style={styles.containerLocation}>
        <LocationIcon2 width={Spacing.width100} height={Spacing.width100} />
        <AppText style={styles.titleLocation}>{t('permission.permission_location')}</AppText>
        <AppText style={styles.desLocation}>{t('permission.des_permission_location')}</AppText>
        <AppButton isWrap style={styles.btnLocation} label={t('permission.setting_location')} onPress={goToSettingLocation} />
      </View>
    );
  }
  console.log({ data });
  const renderHeader = () => {
    return (
      <View style={styles.header}>
        {dataHeader?.button && <ButtonSearch label={dataHeader?.button.label} style={styles.search} onPress={() => {
          navigate(SCREEN_ROUTE.FILTER_DATING);
        }} />}
        {dataHeader?.infoDating && <View style={styles.label}>
          <AppText style={styles.title}>{dataHeader?.infoDating?.label}</AppText>
          <AppText style={[styles.total]}>{dataHeader?.infoDating?.total}</AppText>
        </View>}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(209, 16, 48, 0.72)', 'rgba(1, 1, 1, 0.72)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <HeaderMain
          title={t('navigation.dating')}
          isSearch={false}
          renderIconRight={<View style={styles.optionHeader}>
            <TouchableOpacity onPress={() => navigate(SCREEN_ROUTE.FILTER_DATING)} style={styles.btnMessage}>
              <FilterIcon size={Spacing.width28} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate(SCREEN_ROUTE.CREATE_PROFILE)} style={styles.btnMessage}>
              <ProfileIcon />
            </TouchableOpacity>

          </View>}
        />
        <ListHorizontalUser
          data={dataHeader?.tabs || []}
          tabSelected={tab}
          onPress={(item) => {
            onSelectTab(item.type as any);
          }}
          style={styles.tab}

        />
      </LinearGradient>
      <AppListDating
        data={data}
        loading={loading}
        ListHeaderComponent={renderHeader}
        onRefresh={onRefresh}

        onEndReached={loadMore}

      />
    </View>
  );
};


