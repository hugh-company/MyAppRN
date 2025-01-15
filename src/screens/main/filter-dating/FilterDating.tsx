import { CloseBigIcon, FilterIcon, HeadIcon, StarActiveIcon } from '@assets';
import { AppHeader, AppSwipeProfile } from '@components';
import { Spacing } from '@theme';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFilterDating } from './FilterDating.hook';
import { ModalFilterDating } from './components/ModalFilterDating';

const FilterDating = () => {
  const { data, themeColors, styles, isFilter, setIsFilter } = useFilterDating();
  const { bottom } = useSafeAreaInsets();
  const handleSwipe = (direction) => {
    console.log(`Swiped ${direction}`);
    // setUsers((prev) => prev.slice(1)); // Remove the top card
  };



  return (
    <View style={styles.container}>
      <AppHeader rightComponent={<TouchableOpacity onPress={() => setIsFilter(true)} style={styles.btnFilter}>
        <FilterIcon size={Spacing.width28} color="white" />
      </TouchableOpacity>} />
      <View style={styles.list}>
        {data.map((user, index) => (
          <AppSwipeProfile key={user.id} item={user} onSwipe={handleSwipe} />
        ))}
      </View>
      <View style={[styles.bottomOption, { paddingBottom: bottom || Spacing.width16 }]}>
        <TouchableOpacity style={styles.btnFavorite} >
          <CloseBigIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconLike} >
          <HeadIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnFavorite} >
          <StarActiveIcon />
        </TouchableOpacity>
      </View>

      <ModalFilterDating visible={isFilter} onClose={() => setIsFilter(false)} />
    </View>
  );
};

export default FilterDating;
