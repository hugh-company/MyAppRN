import {useRoute} from '@react-navigation/native';
import {useTheme} from '@theme';
import {episodeChapterInterface} from '@types';
import {useCallback, useEffect, useState} from 'react';
import {createStyles} from './styles';
interface PreviewChapterProps {
  chapter: episodeChapterInterface;
}
export const usePreviewChapter = () => {
  const router = useRoute();
  const {chapter} = router.params as PreviewChapterProps;
  const [data, setData] = useState<{url: string}[]>([]);

  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);

  const fetchData = useCallback(() => {
    if (chapter) {
      const listImage = Array.from({length: 15}, (_, i) => {
        return {
          url: `${chapter?.link}/${i}-${i + 1}.jpg`,
        };
      });
      setData(listImage);
    }
  }, [chapter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {data, themeColors, styles, chapter};
};
