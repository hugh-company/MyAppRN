import { Spacing, useTheme } from '@theme';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
export interface LoadingHomeProps { }
const LoadingDetailMovie = ({ }: LoadingHomeProps) => {
  const { themeColors } = useTheme();
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <SkeletonPlaceholder>

        <View>
          <View style={styles.banner} />


          {/* Thư viện phim hay */}
          <View style={styles.librarySection}>
            <View style={styles.libraryTitle} />
            <View style={styles.optionView}>
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <View key={i} style={styles.itemInfo} />
                ))}
            </View>
            {/*  */}
            <View style={[styles.optionView, { justifyContent: 'space-between', marginHorizontal: Spacing.width16 }]}>
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <View key={i} >
                    <View style={styles.itemOption} />
                    <View style={styles.txtOption} />
                  </View>
                ))}
            </View>
            <View style={styles.descripton} />
            {/* <View style={{ flexDirection: 'row' }}>
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <View key={i} style={styles.movieItem} />
                ))}
            </View> */}
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
    width: '100%',
    height: Spacing.height335,
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

  librarySection: {
    marginVertical: Spacing.height16,

    gap: Spacing.width8,
  },
  libraryTitle: {
    width: '60%',
    height: Spacing.height32,
    marginBottom: 8,
    alignSelf: 'center',
    backgroundColor: '#E1E9EE',
  },
  movieItem: {
    width: Spacing.width240,
    height: Spacing.width320,
    borderRadius: 8,
    marginRight: 16,
    backgroundColor: '#E1E9EE',
  },
  optionView: {
    flexDirection: 'row',
    gap: Spacing.width16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.width32,
  },
  itemOption: {
    width: Spacing.width40,
    height: Spacing.width40,
    borderRadius: Spacing.width40,
  },
  txtOption: {
    width: Spacing.width40,
    height: Spacing.width13,
    marginTop: Spacing.width8,
  },
  itemInfo: {
    width: Spacing.width100,
    height: Spacing.width40,
  },
  descripton: {

    marginHorizontal: Spacing.width16,
    height: Spacing.width200,
    marginBottom: Spacing.width32,

  },
});
export default LoadingDetailMovie;
