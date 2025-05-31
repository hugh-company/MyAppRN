import {RootState} from '@redux';
import {useTheme} from '@theme';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {createStyles} from './styles';

export const useCartScreen = () => {
  const [data, setData] = useState([]);
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  const carts = useSelector((state: RootState) => state.cartSlice.items);

  return {data, themeColors, styles, carts};
};
