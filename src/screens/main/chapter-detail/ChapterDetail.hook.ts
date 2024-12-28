import {useRoute} from '@react-navigation/native';
import {detailChapter} from '@services';
import {useTheme} from '@theme';
import {chapterDetailInterface} from '@types';
import {useState} from 'react';
import {createStyles} from './styles';
interface ChapterDetailInterface {
  chapter: chapterDetailInterface;
}
export const useChapterDetail = () => {
  const router = useRoute();
  const {chapter} = router.params as ChapterDetailInterface;
  const [data, setData] = useState<chapterDetailInterface>(detailChapter);
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);

  return {data, themeColors, styles};
};
