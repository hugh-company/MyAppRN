import { ColorsApp, Spacing } from '@theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
export interface LoadingHomeProps { }
const LoadingDashboardSearch = ({ }: LoadingHomeProps) => {

  return (

    <View>
      {Array(3).fill(0).map((_, i) => (
        <View style={styles.container} >
          <View style={styles.viewTitle}>
            <View style={styles.libraryTitle} />
            <View style={styles.viewMore}
            />
          </View>
          <View style={styles.list}>
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <View key={i} style={styles.movieItem} />
              ))}
          </View>
        </View>
      ))}
    </View>

  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.width16,
  },

  list: { flexDirection: 'row', marginLeft: Spacing.width16, marginBottom: Spacing.width16 },
  image: {
    width: Spacing.width76,
    height: Spacing.width76,
    borderRadius: Spacing.width4,
  },

  librarySection: {
    marginBottom: Spacing.height32,

    gap: Spacing.width16,
  },
  libraryTitle: {
    width: '60%',
    height: Spacing.height32,
    marginBottom: 8,
    backgroundColor: ColorsApp.skeleton,
  },

  movieItem: {
    width: Spacing.width120,
    height: Spacing.width172,
    borderRadius: 4,
    marginRight: 16,
    backgroundColor: ColorsApp.skeleton,

  },
  categorySection: {
    flexDirection: 'row',
    gap: Spacing.width16,
    paddingLeft: Spacing.width16,
    marginVertical: Spacing.height16,
  },
  itemCategory: {
    width: Spacing.width70,
    height: Spacing.width40,
    borderRadius: 8,

  },
  viewTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: Spacing.width16,
    marginBottom: Spacing.width16,

  },
  viewMore: {
    width: Spacing.width70,
    height: Spacing.height32,
    backgroundColor: ColorsApp.skeleton,

  },
});
export default LoadingDashboardSearch;
