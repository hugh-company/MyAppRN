import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
export interface FavoriteUserProps { }
const { width, height } = Dimensions.get('window');

export function FavoriteUser(props: FavoriteUserProps) {
  const { } = props;
  return <LinearGradient
    colors={['#000000', '#1c1c1c', '#4d4d4d']}
    style={styles.container}
  >
    {/* Glowing Background */}
    <View style={styles.glowEffect} />

    {/* Profile Images */}
    <View style={styles.profilesContainer}>
      <View style={styles.imageWrapper}>
        <Image

          source={{ uri: 'https://via.placeholder.com/150' }} // Replace with user image
          style={[styles.profileImage, styles.leftImage]}
        />
      </View>
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }} // Replace with user image
          style={[styles.profileImage, styles.rightImage]}
        />
      </View>
    </View>

    {/* Match Icons */}
    <View style={styles.matchIcons}>
      <TouchableOpacity style={styles.iconCircle}>
        <Text style={styles.iconText}>❤️</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconCircle}>
        <Text style={styles.iconText}>❤️</Text>
      </TouchableOpacity>
    </View>

    {/* Match Text */}
    <View style={styles.textContainer}>
      <Text style={styles.matchText}>It's a match, Jake!</Text>
      <Text style={styles.subText}>
        Start a conversation now with each other.
      </Text>
    </View>
  </LinearGradient>;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  glowEffect: {
    position: 'absolute',
    bottom: height / 3,
    width: width * 1.5,
    height: width * 1.5,
    backgroundColor: 'rgba(255, 0, 127, 0.4)',
    borderRadius: width,
    opacity: 0.5,
  },
  profilesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  imageWrapper: {
    marginHorizontal: -20,
  },
  profileImage: {
    width: 150,
    height: 200,
    borderRadius: 15,
  },
  leftImage: {
    transform: [{ rotate: '-10deg' }],
  },
  rightImage: {
    transform: [{ rotate: '10deg' }],
  },
  matchIcons: {
    position: 'absolute',
    top: height * 0.35,
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  iconCircle: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  iconText: {
    fontSize: 20,
    color: 'red',
  },
  textContainer: {
    position: 'absolute',
    bottom: 80,
    alignItems: 'center',
  },
  matchText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
