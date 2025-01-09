import {navigate, push, SCREEN_ROUTE} from '@navigation';
import {ButtonNavigationInterface, PostTypeKey} from '@types';
import {DeviceEventEmitter} from 'react-native';

export const showModalChapter = (visible: boolean, data: any[] | string) => {
  DeviceEventEmitter.emit('showModalChapter', {
    visible,
    data,
  });
};
export const goToDetail = ({item, type}: {item: any; type?: PostTypeKey}) => {
  switch (type) {
    case PostTypeKey.GAMES:
      return push(SCREEN_ROUTE.GAME_DETAIL, {game: item});

    case PostTypeKey.COMIC:
    case PostTypeKey.NOVEL:
      return push(SCREEN_ROUTE.CHAPTER_DETAIL, {chapter: item, type: type});
    case PostTypeKey.MOVIES:
      return push(SCREEN_ROUTE.MOVIE_DETAIL, {movie: item});
  }
};
//
export interface navigateViewListProps extends ButtonNavigationInterface {
  keyCategory?: string;
}
export const goToListView = (props: navigateViewListProps) => {
  navigate(SCREEN_ROUTE.VIEW_LIST, {
    ...props,
  });
};
