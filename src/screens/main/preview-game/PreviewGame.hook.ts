import {useRoute} from '@react-navigation/native';
import {useTheme} from '@theme';
import {useState} from 'react';
import {createStyles} from './styles';
interface PreviewGameProps {
  link: string;
}
export const usePreviewGame = () => {
  const router = useRoute();
  const {link} = router.params as PreviewGameProps;
  const [data, setData] = useState([]);
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  const [loading, setLoading] = useState(true);
  return {data, themeColors, styles, link, loading, setLoading, setData};
};
