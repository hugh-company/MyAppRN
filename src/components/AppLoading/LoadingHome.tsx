import { ColorsApp, Spacing } from '@theme';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
export interface LoadingHomeProps { }
const LoadingHome = ({ }: LoadingHomeProps) => {

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View>
        <View style={styles.banner} />

        <View style={styles.librarySection}>
          <View style={styles.libraryTitle} />
          <View style={styles.categorySection}>
            {Array(14)
              .fill(0)
              .map((_, i) => (
                <View key={i} style={styles.itemCategory} />
              ))}
          </View>
          <View style={{ flexDirection: 'row' }}>
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <View key={i} style={styles.movieItem} />
              ))}
          </View>
        </View>

        <View style={styles.librarySection}>
          <View style={styles.libraryTitle} />
          <View style={styles.categorySection}>
            {Array(14)
              .fill(0)
              .map((_, i) => (
                <View key={i} style={styles.itemCategory} />
              ))}
          </View>
          <View style={{ flexDirection: 'row' }}>
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <View key={i} style={styles.movieItem} />
              ))}
          </View>
        </View>
      </View>

    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',

  },
  banner: {
    width: '100%',
    height: Spacing.height302,
    borderBottomRightRadius: Spacing.width32,
    borderBottomLeftRadius: Spacing.width32,
    backgroundColor: ColorsApp.skeleton,
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
    marginVertical: Spacing.height32,
    paddingLeft: 16,
    gap: Spacing.width16,

  },
  libraryTitle: {
    width: '60%',
    height: Spacing.height32,
    marginBottom: 8,
    backgroundColor: ColorsApp.skeleton,
  },
  movieItem: {
    width: Spacing.width240,
    height: Spacing.width320,
    borderRadius: 8,
    marginRight: 16,
    backgroundColor: ColorsApp.skeleton,
  },
  categorySection: {
    flexDirection: 'row',
    gap: Spacing.width16,

  },
  itemCategory: {
    width: Spacing.width70,
    height: Spacing.width40,
    borderRadius: 8,
    backgroundColor: ColorsApp.skeleton,
  },
});
export default LoadingHome;
