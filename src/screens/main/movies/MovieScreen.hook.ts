import {useTheme} from '@theme';
import {useState} from 'react';
import {createStyles} from './styles';

export const useMovieScreen = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  const [activeCategory, setActiveCategory] = useState(1);

  const onSearch = (text: string) => {
    setSearch(text);
  };
  const onSelectedCategory = (id: number) => {
    setActiveCategory(id);
  };
  return {
    data,
    themeColors,
    styles,
    search,
    onSearch,
    activeCategory,
    onSelectedCategory,
  };
};
