import {useRoute} from '@react-navigation/native';
import {useTheme} from '@theme';
import {useState} from 'react';
import {createStyles} from './styles';
interface PreviewImagesProps {
  images: any[];
}
export const usePreviewImages = () => {
  const params = useRoute().params as PreviewImagesProps;
  const images = params?.images;
  const [data, setData] = useState(images);
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);

  return {data, themeColors, styles};
};
