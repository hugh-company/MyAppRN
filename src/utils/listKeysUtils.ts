import {
  ChapterIcon,
  DatingIcon,
  GameIcon,
  HomeIcon,
  MovieIcon,
  PageProfileIcon,
  SavedIcon,
} from '@assets';
import {SCREEN_ROUTE} from '@navigation';
import {t} from 'i18next';

export const dataNavigation = [
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

export const dataSettings = [
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
