import { ColorsApp, Spacing } from '@theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export interface LoadingSearchProps { }

const LoadingSearch: React.FC<LoadingSearchProps> = () => {
  return (
    <View style={styles.container}>
      {/* Simulated search input placeholder */}
      <View style={styles.searchPlaceholder} />
      {/* Simulated list of search result placeholders */}
      {Array.from({ length: 5 }).map((_, index) => (
        <View style={styles.itemContainer} key={index}>
          <View style={styles.domainPlaceholder} />
          <View style={styles.feePlaceholder} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing.width16,
  },
  searchPlaceholder: {
    width: '100%',
    height: Spacing.height80,
    borderRadius: Spacing.width8,
    backgroundColor: ColorsApp.skeleton,
    marginBottom: Spacing.width16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.width16,
    gap: Spacing.width8,
  },
  domainPlaceholder: {
    flex: 1,
    height: Spacing.height80,
    borderRadius: Spacing.width4,
    backgroundColor: ColorsApp.skeleton,
  },
  feePlaceholder: {
    width: Spacing.width80,
    height: Spacing.height80,
    borderRadius: Spacing.width4,
    backgroundColor: ColorsApp.skeleton,
  },
});

export default LoadingSearch;
