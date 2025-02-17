import { CloseBigIcon, FilterIcon, HeadIcon, NoSearchImage, StarActiveIcon } from '@assets';
import { AppHeader, AppImage, AppSwipeProfile, AppText } from '@components';
import { Spacing } from '@theme';
import { t } from 'i18next';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFilterDating } from './FilterDating.hook';
import { ModalFilterDating } from './components/ModalFilterDating';

const FilterDating: React.FC = () => {
  const { data, styles, isFilter, setIsFilter, filter, onFilterApi,

    swipeRef, handleSwipe, handleSwipeAction,
  } = useFilterDating();
  const { bottom } = useSafeAreaInsets();


  const renderList = (): JSX.Element => {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.list}>
          {data.map((user, index) => (
            <AppSwipeProfile ref={swipeRef} key={user.id} item={user} onSwipe={(type) => handleSwipe(type, user)} />
          ))}
        </View>
        <View style={[styles.bottomOption, { paddingBottom: bottom || Spacing.width16 }]}>
          <TouchableOpacity style={styles.btnFavorite} onPress={() => handleSwipeAction('dislike')}>
            <CloseBigIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconLike} onPress={() => handleSwipeAction('like')}>
            <HeadIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnFavorite} onPress={() => handleSwipeAction('superlike')}>
            <StarActiveIcon />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const renderEmpty = (): JSX.Element => {
    return (
      <View style={styles.viewEmpty}>
        <AppImage defaultSource={NoSearchImage} style={styles.imageNotFound} />
        <AppText style={styles.txtNotFound}>{t('notFound')}</AppText>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <AppHeader rightComponent={<TouchableOpacity onPress={() => setIsFilter(true)} style={styles.btnFilter}>
        <FilterIcon size={Spacing.width28} color="white" />
      </TouchableOpacity>} />
      {data.length > 0 ? renderList() : renderEmpty()}
      {isFilter && <ModalFilterDating
        visible={isFilter}
        filter={filter}
        onClose={() => setIsFilter(false)}
        onFilter={(value) => {
          onFilterApi(value);
        }} />}

      {/* {matchUser && (
        <MatchScreen
          visible={!!matchUser}
          userMatch={matchUser}
          onClose={() => setMatchUser(null)}
        />
      )} */}
    </View>
  );
};

export default FilterDating;
