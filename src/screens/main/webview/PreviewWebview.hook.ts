import {BASE_IMAGE_URL} from '@api';
import {getToken} from '@redux';
import {useTheme} from '@theme';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {createStyles} from './styles';

export const usePreviewWebview = () => {
  const [data, setData] = useState([]);
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  const [loading, setLoading] = useState(true);
  const token = useSelector(getToken);
  const link = `${BASE_IMAGE_URL}`;
  return {data, themeColors, styles, link, loading, setLoading};
};
