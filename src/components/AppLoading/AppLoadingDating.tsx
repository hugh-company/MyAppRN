import { Spacing, useTheme } from '@theme';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
export interface LoadingHomeProps { }
const AppLoadingDating = ({ }: LoadingHomeProps) => {
  const { themeColors } = useTheme();

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <SkeletonPlaceholder>

        <View>
          {/* Thư viện phim hay */}
          <View style={styles.librarySection}>

            {/* <View style={styles.categorySection}>
              {Array(14)
                .fill(0)
                .map((_, i) => (
                  <View>
                    <View key={i} style={styles.itemCategory} />
                    <View style={styles.txtCategory} />

                  </View>
                ))}
            </View> */}

            <View style={styles.btnSearch} />
            {/*  */}
            <View style={styles.libraryTitle} />
            <View style={{ flexDirection: 'row' }}>
              {Array(2)
                .fill(0)
                .map((_, i) => (
                  <View key={i} style={styles.movieItem} />
                ))}
            </View>
            <View style={{ flexDirection: 'row', marginTop: Spacing.width16 }}>
              {Array(2)
                .fill(0)
                .map((_, i) => (
                  <View key={i} style={styles.movieItem} />
                ))}
            </View>
          </View>


        </View>
      </SkeletonPlaceholder>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',

  },

  librarySection: {

    paddingLeft: 16,
    gap: Spacing.width16,
  },
  libraryTitle: {
    width: '60%',
    height: Spacing.height32,
    marginBottom: 8,
    backgroundColor: '#E1E9EE',
  },
  movieItem: {
    flex: 1,
    height: Spacing.width230,
    borderRadius: 8,
    marginRight: 16,
    backgroundColor: '#E1E9EE',
  },
  categorySection: {
    flexDirection: 'row',
    gap: Spacing.width16,
  },
  itemCategory: {
    width: Spacing.width56,
    height: Spacing.width56,
    borderRadius: Spacing.width56,
  },
  txtCategory: {
    width: Spacing.width56,
    height: Spacing.width16,
    marginTop: Spacing.width8,
  },
  btnSearch: {
    width: '95%',
    height: Spacing.width56,
    borderRadius: Spacing.width50,
    marginVertical: Spacing.width24,
  },
});
export default AppLoadingDating;
