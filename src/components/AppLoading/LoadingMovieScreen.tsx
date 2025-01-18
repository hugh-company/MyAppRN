import { Spacing, useTheme } from '@theme';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
export interface LoadingHomeProps { }
const LoadingMovieScreen = ({ }: LoadingHomeProps) => {
  const { themeColors } = useTheme();
  const renderItem = ({ item }: any) => {
    return (
      <View style={styles.image} />
    );
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <SkeletonPlaceholder>
        <View>
          <View style={styles.librarySection}>
            {/* <View style={styles.search} /> */}
            {/* <View style={styles.categorySection}>
              {Array(14)
                .fill(0)
                .map((_, i) => (
                  <View key={i} style={styles.itemCategory} />
                ))}
            </View> */}
            <View style={styles.banner} />

          </View>
          <View style={styles.viewTitle}>
            <View style={styles.libraryTitle} />
            <View style={styles.viewMore}
            />
          </View>
          <View style={{ flexDirection: 'row', marginLeft: Spacing.width16, marginBottom: Spacing.width16 }}>
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <View key={i} style={styles.movieItem} />
              ))}
          </View>

          {/*  */}

          <View style={styles.viewTitle}>
            <View style={styles.libraryTitle} />
            <View style={styles.viewMore}
            />
          </View>
          <View style={{ flexDirection: 'row', marginLeft: Spacing.width16 }}>
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <View key={i} style={styles.movieItem} />
              ))}
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
  banner: {
    width: '92%',
    height: Spacing.height250,
    borderRadius: Spacing.width16,
    marginHorizontal: Spacing.width16,
  },

  dating: {

  },
  image: {
    width: Spacing.width76,
    height: Spacing.width76,
    borderRadius: Spacing.width4,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: Spacing.width16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E1E9EE',
  },
  headerTitle: {
    width: '50%',
    height: 20,
    marginLeft: 16,
    backgroundColor: '#E1E9EE',
  },
  section: {
    padding: 16,
  },
  appText: {
    width: '70%',
    height: 20,
    marginBottom: 8,
    backgroundColor: '#E1E9EE',
  },
  appSubtitle: {
    width: '50%',
    height: 16,
    backgroundColor: '#E1E9EE',
  },
  librarySection: {
    marginBottom: Spacing.height32,

    gap: Spacing.width16,
  },
  libraryTitle: {
    width: '60%',
    height: Spacing.height32,
    marginBottom: 8,
    backgroundColor: '#E1E9EE',
  },
  search: {
    width: '90%',
    height: Spacing.height40,
    borderRadius: Spacing.width4,
    marginHorizontal: Spacing.width16,

  },
  movieItem: {
    width: Spacing.width120,
    height: Spacing.width172,
    borderRadius: 8,
    marginRight: 16,

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

  },
});
export default LoadingMovieScreen;
