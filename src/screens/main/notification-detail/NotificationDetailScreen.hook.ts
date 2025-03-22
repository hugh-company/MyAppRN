import {useRoute} from '@react-navigation/native';
import {useTheme} from '@theme';
import {createStyles} from './styles';
interface notificationInterface {
  data: {
    title: string;
    description: any;
  };
}

export const useNotificationDetailScreen = () => {
  const {themeColors} = useTheme();
  const {params} = useRoute();
  const {description, title} = params?.data as any;

  const styles = createStyles(themeColors);

  return {title, styles, description, themeColors};
};
