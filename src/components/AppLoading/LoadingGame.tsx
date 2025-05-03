import { Spacing } from '@theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
export interface LoadingHomeProps { }
const LoadingGame = ({ }: LoadingHomeProps) => {

  return (
    <View style={styles.container}>
      <View style={styles.banner} />
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  banner: {
    width: '92%',
    height: Spacing.height250,
    borderRadius: Spacing.width16,
    marginHorizontal: Spacing.width16,
    backgroundColor: '#F5F5F5', // Lighter skeleton color
    marginBottom: Spacing.width16,
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
    backgroundColor: '#F5F5F5', // Lighter skeleton color
    borderRadius: Spacing.width8,
  },
  itemOne: {
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  name: {
    backgroundColor: '#F5F5F5', // Lighter skeleton color
    width: Spacing.width140,
    height: Spacing.width20,
    borderRadius: Spacing.width4,
  },
  name2: {
    width: Spacing.width100,
    height: Spacing.width15,
    backgroundColor: '#F5F5F5', // Lighter skeleton color
    borderRadius: Spacing.width4,
  },
  name3: {
    width: Spacing.width80,
    height: Spacing.width15,
    backgroundColor: '#F5F5F5', // Lighter skeleton color
    borderRadius: Spacing.width4,
  },
});

export default LoadingGame;
