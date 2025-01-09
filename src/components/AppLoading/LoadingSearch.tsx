import { Spacing } from '@theme';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const LoadingSearch = () => {


  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <SkeletonPlaceholder>
        <ScrollView >
          {Array.from({ length: 10 }).map((_, index) => (
            <View style={styles.list}>

              <View style={styles.imageOne} />
              <View style={styles.itemOne}>
                <View style={{ gap: 6 }}>
                  <View style={styles.name} />
                  <View style={styles.name2} />
                </View>

                <View style={{ gap: 6 }}>
                  <View style={styles.name3} />
                  <View style={styles.name2} />
                  <View style={styles.name2} />
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </SkeletonPlaceholder>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: Spacing.width16,
  },
  list: {
    gap: Spacing.width16,
    marginBottom: Spacing.width16,
    flexDirection: 'row',
  },
  item: {
    height: Spacing.height236,
    flex: 1,
  },
  imageOne: {
    width: Spacing.width92,
    height: Spacing.width138,
  },
  itemOne: {
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  name: {

    width: Spacing.width140,
    height: Spacing.width20,
  },
  name2: {
    width: Spacing.width100,
    height: Spacing.width15,
  },
  name3: {
    width: Spacing.width80,
    height: Spacing.width15,
  },
});
export default LoadingSearch;
