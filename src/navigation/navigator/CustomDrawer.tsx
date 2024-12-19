import { ChapterIcon, DatingIcon, GameIcon, HomeIcon, ImageBook, ImageGame, ImageMovie, MovieIcon, PageProfileIcon, SavedIcon } from '@assets';
import { AppImage } from '@components';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { getToken } from '@redux';
import { Spacing, ThemeColors } from '@theme';
import { t } from 'i18next';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useTheme } from '../../theme/ThemeContext';
import { SCREEN_ROUTE } from '../router';
import { DrawerAuth } from './components/DrawerAuth';
import { DrawerMain } from './components/DrawerMain';

interface CustomDrawerProps extends DrawerContentComponentProps {
  // Add your custom props here

}

const CustomDrawer = (props: CustomDrawerProps) => {
  const { themeColors } = useTheme(); // Moved inside the function component
  const token = useSelector(getToken);
  const { bottom } = useSafeAreaInsets();

  const styles = createStyles(themeColors);
  const colors = token ? ['#050505', '#2D0C0C'] : ['#B1062E', '#1E1111'];
  const dataNavigation = [
    {
      name: t('navigation.home'),
      key: SCREEN_ROUTE.HOME,
      Icon: HomeIcon,
    },
    {
      name: t('navigation.movies'),
      key: SCREEN_ROUTE.MOVIES,
      Icon: MovieIcon,
    },
    {
      name: t('navigation.games'),
      key: SCREEN_ROUTE.GAMES,
      Icon: GameIcon,
    },
    {
      name: t('navigation.chapters'),
      key: SCREEN_ROUTE.CHAPTERS,
      Icon: ChapterIcon,
    },
    {
      name: t('navigation.dating'),
      key: SCREEN_ROUTE.DATING,
      Icon: DatingIcon,
    },
  ];

  const dataSettings = [
    {
      name: t('drawer.profile'),
      key: SCREEN_ROUTE.PROFILE,
      Icon: PageProfileIcon,
    },
    {
      name: t('drawer.movie_saved'),
      key: SCREEN_ROUTE.SAVED_MOVIE,
      Icon: SavedIcon,
    },
    {
      name: t('drawer.chapter_saved'),
      key: SCREEN_ROUTE.SAVED_CHAPTER,
      Icon: SavedIcon,
    },
  ];
  return (
    <View style={[styles.container]}>
      <LinearGradient
        colors={colors}
        style={styles.gradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        <View style={[styles.viewImage, {}]}>
          {[ImageBook, ImageGame, ImageMovie].map((item, index) => (
            <View key={index}>
              <AppImage key={index.toString()} resizeMode={'stretch'} style={styles.image} defaultSource={item} />
            </View>
          ))}
        </View>
        {token ? <DrawerMain listSettings={dataSettings} listNavigation={dataNavigation} /> : <DrawerAuth listNavigation={dataNavigation} />}
      </LinearGradient>
    </View>
  );
};

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
      backgroundColor: themeColors.background,
      flex: 1,
    },
    gradient: {
      flex: 1,
      height: '100%',
      width: '100%',
    },
    viewImage: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: Spacing.width32,
      marginTop: Spacing.width16,
    },
    image: {
      width: Spacing.width60,
      height: Spacing.width60,
    },

    body: {
      paddingHorizontal: Spacing.width32,
      marginTop: Spacing.width16,
    },

  });

export default CustomDrawer;
