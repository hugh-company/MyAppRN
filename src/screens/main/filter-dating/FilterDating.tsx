import { FilterIcon } from '@assets';
import { AppHeader } from '@components';
import { Spacing } from '@theme';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useFilterDating } from './FilterDating.hook';
import { ModalFilterDating } from './components/ModalFilterDating';

const FilterDating = () => {
  const { data, themeColors, styles, isFilter, setIsFilter } = useFilterDating();

  return (
    <View style={styles.container}>
      <AppHeader rightComponent={<TouchableOpacity onPress={() => setIsFilter(true)} style={styles.btnFilter}>
        <FilterIcon size={Spacing.width28} color="white" />
      </TouchableOpacity>} />



      <ModalFilterDating visible={isFilter} onClose={() => setIsFilter(false)} />
    </View>
  );
};

export default FilterDating;
