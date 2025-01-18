import { CloseBigIcon, FilterIcon, HeadIcon, StarActiveIcon } from '@assets';
import { AppHeader, AppSwipeProfile } from '@components';
import { Spacing } from '@theme';
import React, { useEffect, useState } from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFilterDating } from './FilterDating.hook';
import MatchScreen from './components/MatchScreen';
import { ModalFilterDating } from './components/ModalFilterDating';

const FilterDating = () => {
  const { data, themeColors, styles, isFilter, setIsFilter, filter, onFilterApi } = useFilterDating();
  const { bottom } = useSafeAreaInsets();
  const [matchUser, setMatchUser] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleSwipe = (direction, user) => {
    console.log(`Swiped ${direction}`, user);
    if (direction === 'like') {
      handleLike(user);
    } else if (direction === 'dislike') {
      handleDislike(user);
    } else if (direction === 'superlike') {
      handleSuperLike(user);
    }
  };

  const handleLike = (user) => {
    setMatchUser(user);
  };

  const handleDislike = (user) => {
    console.log('Disliked');
    // Add your dislike logic here
  };

  const handleSuperLike = (user) => {
    console.log('Super Liked');
    // Add your super like logic here
  };

  useEffect(() => {
    if (Platform.OS === 'android' && matchUser) {
      const timer = setTimeout(() => {
        setMatchUser(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [matchUser]);

  return (
    <View style={styles.container}>
      <AppHeader rightComponent={<TouchableOpacity onPress={() => setIsFilter(true)} style={styles.btnFilter}>
        <FilterIcon size={Spacing.width28} color="white" />
      </TouchableOpacity>} />
      <View style={styles.list}>
        {data.map((user, index) => (
          <AppSwipeProfile key={user.id} item={user} onSwipe={(type) => handleSwipe(type, user)} />
        ))}
      </View>
      <View style={[styles.bottomOption, { paddingBottom: bottom || Spacing.width16 }]}>
        <TouchableOpacity style={styles.btnFavorite} onPress={() => handleDislike(data[0])}>
          <CloseBigIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconLike} onPress={() => handleLike(data[0])}>
          <HeadIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnFavorite} onPress={() => handleSuperLike(data[0])}>
          <StarActiveIcon />
        </TouchableOpacity>
      </View>
      <ModalFilterDating
        visible={isFilter}
        filter={filter}
        onClose={() => setIsFilter(false)}
        onFilter={(value) => {
          onFilterApi(value);
        }} />

      {matchUser && (
        <MatchScreen
          visible={!!matchUser}
          userMatch={matchUser}
          onClose={() => setMatchUser(null)}
        />
      )}
    </View>
  );
};

export default FilterDating;
