import {useRoute} from '@react-navigation/native';
import {useTheme} from '@theme';
import {movieDetailInterface} from '@types';
import {useState} from 'react';
import {createStyles} from './styles';
interface MovieDetailScreenProps {
  movie: movieDetailInterface;
}
export const useMovieDetailScreen = () => {
  const router = useRoute();
  const {movie} = (router?.params as unknown as MovieDetailScreenProps) || {
    type: undefined,
  };
  const [detailMovie, setDetailMovie] = useState<
    movieDetailInterface | undefined
  >(movie);
  const [chapterSelect, setChapterSelect] = useState(1);
  const [data, setData] = useState([]);
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);

  return {
    data,
    themeColors,
    styles,
    detailMovie,
    chapterSelect,
    setChapterSelect,
  };
};
