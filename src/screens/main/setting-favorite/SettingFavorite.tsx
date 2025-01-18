import { AppButton, AppFlatListAnimated, AppHeader, AppLoading, AppText } from '@components';
import { Spacing } from '@theme';
import { t } from 'i18next';
import React from 'react';
import { View } from 'react-native';
import { useSettingFavorite } from './SettingFavorite.hook';
import { ItemFavorite } from './components/ItemFavorite';

const SettingFavorite = () => {
  const { data, themeColors, loading, onFavorite, styles, selected, onSelectFavorite } = useSettingFavorite();

  const renderItem = ({ item }: { item: { id: number; name: string; icon?: any } }) => {
    return <ItemFavorite item={item} listSelected={selected} onSelect={onSelectFavorite} />;
  };
  return (
    <View style={styles.container}>
      <AppHeader />
      <AppText style={styles.title}>{t('dating.createNewProfile')}</AppText>
      <AppText style={styles.description}>{t('dating.desNewProfile')}</AppText>
      {loading ? <AppLoading /> : <>

        <AppFlatListAnimated
          data={data}
          numColumns={2}
          style={styles.body}
          columnWrapperStyle={{ justifyContent: 'space-between', gap: Spacing.width16 }}
          renderItem={renderItem} />

        <View style={styles.bottom}>
          <AppButton
            disabled={selected?.length < 1}
            label={t('start')} style={styles.btnStart}
            onPress={onFavorite}
          />
        </View></>
      }


    </View>
  );
};

export default SettingFavorite;
