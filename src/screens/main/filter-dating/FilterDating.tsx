import { FilterIcon } from '@assets';
import { AppHeader } from '@components';
import { Spacing } from '@theme';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useFilterDating } from './FilterDating.hook';
import { MatchesUser } from './components/MatchesUser';
import { ModalFilterDating } from './components/ModalFilterDating';

export const FilterDating: React.FC = () => {
  const { data, styles, isFilter, setIsFilter, filter, onFilterApi,
    handleSwipe, loading,
  } = useFilterDating();

  return (
    <View style={styles.container}>
      <AppHeader
        rightComponent={<TouchableOpacity onPress={() => setIsFilter(true)} style={styles.btnFilter}>
          <FilterIcon size={Spacing.width28} color="white" />
        </TouchableOpacity>} />
      <MatchesUser data={data || []} onSendAction={handleSwipe} />
      <ModalFilterDating
        visible={isFilter}
        filter={filter}
        onClose={() => setIsFilter(false)}
        onFilter={(value) => {
          onFilterApi(value);
        }} />

    </View>
  );
};

