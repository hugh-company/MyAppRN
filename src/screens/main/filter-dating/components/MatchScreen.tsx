import { AppImage } from '@components';
import { NavigationUtils } from '@navigation';
import { useNavigation } from '@react-navigation/native';
import { getUserInfo, setIsDashboardDating } from '@redux';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import { UserFindInterface } from '@types';
import React, { useEffect } from 'react';
import {
  Dimensions,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');
interface matchUserProps {
  userMatch: UserFindInterface;
  visible: boolean;
  onClose: () => void;
}
const MatchScreen = ({ userMatch, visible, onClose }: matchUserProps) => {
  const navigation = useNavigation();
  const infoUser = useSelector(getUserInfo);
  const { themeColors } = useTheme();
  const styles = createStyle(themeColors);
  const dispatch = useDispatch();
  const leftImageAnim = useSharedValue(-200);
  const rightImageAnim = useSharedValue(200);

  const leftImageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: -leftImageAnim.value },

        { rotate: '8deg' },
      ],
    };
  });

  const rightImageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: -rightImageAnim.value },
        { rotate: '-8deg' },
      ],
    };
  });

  const startAnimation = () => {
    leftImageAnim.value = withTiming(width / 1.7, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });
    rightImageAnim.value = withTiming(-width / 1.7, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });
  };

  useEffect(() => {
    if (visible) {
      startAnimation();
    }
  }, [visible]);

  useEffect(() => {

    const timer = setTimeout(() => {
      dispatch(setIsDashboardDating(true));
      NavigationUtils.pop(3);
      setTimeout(() => {

        onClose();
      }, 5000);
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation, onClose]);

  useEffect(() => {
    if (Platform.OS === 'android' && visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      presentationStyle="fullScreen"

    >
      <LinearGradient
        colors={['#000000', '#1c1c1c', '#4d4d4d']}
        style={styles.container}
      >
        <View style={styles.profilesContainer}>
          <Animated.View style={[styles.imageWrapperUserMatch, leftImageStyle]}>
            <AppImage
              uri={userMatch?.avatar}
              style={[styles.profileImage]}
            />
            {/* Match Icons */}
            <View style={styles.matchIconsUserMatch}>
              <TouchableOpacity style={styles.iconCircle}>
                <Text style={styles.iconText}>❤️</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
          <Animated.View style={[styles.imageWrapperUserInfo, rightImageStyle]}>
            <AppImage
              uri={infoUser?.avatar}
              style={[styles.profileImage]}
            />
            <View style={styles.matchIconsUserInfo}>
              <TouchableOpacity style={styles.iconCircle}>
                <Text style={styles.iconText}>❤️</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>



        {/* Match Text */}
        <View style={styles.textContainer}>
          <Text style={styles.matchText}>It's a match, {userMatch.fullname}!</Text>
          <Text style={styles.subText}>
            Start a conversation now with each other.
          </Text>
        </View>


      </LinearGradient>
    </Modal>
  );
};

const createStyle = (themesColor: ThemeColors) => StyleSheet.create({
  container: {

    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: width,
    height: Platform.OS === 'android' ? height + 50 : height,
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
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.width24,

  },

  imageWrapperUserInfo: {
    width: Spacing.width160,
    height: Spacing.width240,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 0.15,
    shadowRadius: 25,
    elevation: 5, // for Android
    position: 'absolute',
    top: -Spacing.height50,
    right: '50%',
    transform: [{ rotate: '-8deg' }],
  },
  imageWrapperUserMatch: {
    width: Spacing.width160,
    height: Spacing.width240,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 0.15,
    shadowRadius: 25,
    elevation: 5, // for Android
    position: 'absolute',
    bottom: -Spacing.height50,
    left: '50%',
    transform: [{ rotate: '8deg' }],
  },
  profileImage: {
    width: Spacing.width160,
    height: Spacing.width240,
    borderRadius: Spacing.width15,

  },
  topImage: {
    top: '15%',
    transform: [{ rotate: '-8deg' }],
    right: '30%',
  },
  bottomImage: {
    bottom: '15%',
    transform: [{ rotate: '8deg' }],
    left: '30%',
  },
  matchIconsUserMatch: {
    position: 'absolute',

    flexDirection: 'row',
    justifyContent: 'space-evenly',
    left: -Spacing.width20,
    top: -Spacing.width20,
  },
  matchIconsUserInfo: {
    position: 'absolute',

    flexDirection: 'row',
    justifyContent: 'space-evenly',
    left: -Spacing.width20,
    bottom: -Spacing.width20,
  },
  iconCircle: {
    width: Spacing.width50,
    height: Spacing.width50,
    backgroundColor: 'white',
    borderRadius: Spacing.width50,
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
    bottom: Spacing.height100,
    alignItems: 'center',
  },
  matchText: {
    fontSize: FontSize.FontSize24,
    ...FontWithFamily.FontWithFamily_600,
    color: themesColor.primary,
  },
  subText: {
    color: themesColor.subtile,
    textAlign: 'center',
  },
  testButton: {
    position: 'absolute',
    bottom: Spacing.height50,
    backgroundColor: themesColor.primary,
    padding: Spacing.width10,
    borderRadius: Spacing.width10,
  },
  testButtonText: {
    color: 'white',
    fontSize: FontSize.FontSize16,
    ...FontWithFamily.FontWithFamily_600,
  },
});

export default MatchScreen;
