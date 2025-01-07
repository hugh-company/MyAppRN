import {
  CookingIcon,
  DrinkIcon,
  GameHandleIcon,
  MarketIcon,
  MusicIcon,
  OutDoorIcon,
  ParachuteIcon,
  PhotographyIcon,
  PlatteIcon,
  RippleIcon,
  RunIcon,
  TennisIcon,
  VoteIcon,
  YogaIcon,
} from '@assets';
import {navigate, SCREEN_ROUTE} from '@navigation';
import {useTheme} from '@theme';
import {t} from 'i18next';
import {useState} from 'react';
import {createStyles} from './styles';

export const useSettingFavorite = () => {
  const [data, setData] = useState([
    {id: 1, name: t('favorite.photography'), Icon: PhotographyIcon},
    {id: 2, name: t('favorite.shopping'), Icon: MarketIcon},
    {id: 3, name: t('favorite.karaoke'), Icon: VoteIcon},
    {id: 4, name: t('favorite.yoga'), Icon: YogaIcon},
    {id: 5, name: t('favorite.cooking'), Icon: CookingIcon},
    {id: 6, name: t('favorite.tennis'), Icon: TennisIcon},
    {id: 7, name: t('favorite.run'), Icon: RunIcon},
    {id: 8, name: t('favorite.swimming'), Icon: RippleIcon},
    {id: 9, name: t('favorite.traveling'), Icon: PlatteIcon},
    {id: 10, name: t('favorite.art'), Icon: OutDoorIcon},
    {id: 11, name: t('favorite.extreme'), Icon: ParachuteIcon},
    {id: 12, name: t('favorite.music'), Icon: MusicIcon},
    {id: 13, name: t('favorite.drink'), Icon: DrinkIcon},
    {id: 14, name: t('favorite.videoGame'), Icon: GameHandleIcon},
  ]);
  const [selected, setSelected] = useState<number[]>([]);
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);

  const onSelectFavorite = (id: number) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(item => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };
  const onFavorite = () => {
    navigate(SCREEN_ROUTE.FILTER_DATING);
  };
  return {
    data,
    themeColors,
    styles,
    selected,
    setSelected,
    onSelectFavorite,
    onFavorite,
  };
};
