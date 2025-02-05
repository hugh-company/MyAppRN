import { Spacing } from '@theme';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
export interface LoadingHomeProps { }
const LoadingGame = ({ }: LoadingHomeProps) => {

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <SkeletonPlaceholder>
        <View>
          <View style={styles.librarySection}>
            {/* <View style={styles.search} /> */}

            <View style={styles.banner} />

          </View>
          {Array.from({ length: 10 }).map((_, index) => (
            <View style={styles.list} key={index}>

              <View style={styles.imageOne} />
              <View style={styles.itemOne}>
                <View style={{ gap: 6 }}>
                  <View style={styles.name} />

                </View>

                <View style={{ gap: 6 }}>
                  <View style={styles.name3} />
                  <View style={styles.name2} />
                </View>
              </View>
            </View>
          ))}

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

  list: {
    gap: Spacing.width16,
    marginBottom: Spacing.width16,
    flexDirection: 'row',
    marginHorizontal: Spacing.width16,
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
  imageOne: {
    width: Spacing.width96,
    height: Spacing.width96,
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
export default LoadingGame;
