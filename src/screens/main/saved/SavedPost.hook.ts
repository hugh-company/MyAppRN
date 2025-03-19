import {useRoute} from '@react-navigation/native';
import {RootState} from '@redux/store';
import {useTheme} from '@theme';
import {PostTypeKey} from '@types';
import {useSelector} from 'react-redux';
import {createStyles} from './styles';

interface savedPostInterface {
  type: PostTypeKey;
}

export const useSavedPost = () => {
  const {params} = useRoute();
  const {type, title} = params as savedPostInterface;
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);

  const data = useSelector((state: RootState) => {
    if (type === 'movie') {
      return state.savedPostSlice.movies;
    }
    if (type === 'comic') {
      return state.savedPostSlice.comics;
    }
    if (type === 'novel') {
      return state.savedPostSlice.novels;
    }
    return [];
  });
  console.log({data});

  return {data, themeColors, styles, type, title};
};
