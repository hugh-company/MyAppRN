import {getDataDashboardApi} from '@services';
import {PostTypeKey} from '@types';
import {useDispatch} from 'react-redux';

export interface usePostTypeProps {
  apiEndpoints: string[];
}

export function usePostType(props: usePostTypeProps) {
  const dispatch = useDispatch();
  const callApiHome = async () => {
    const responseHome: any = await getDataDashboardApi();
  };
  const data = [
    PostTypeKey.MOVIES,
    PostTypeKey.GAMES,
    PostTypeKey.COMIC,
    PostTypeKey.NOVEL,
  ];

  return {};
}
