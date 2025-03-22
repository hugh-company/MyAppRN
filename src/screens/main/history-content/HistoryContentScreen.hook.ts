import {useRoute} from '@react-navigation/native';
import {
  clearHistory,
  removeHistoryItem,
  removeHistoryItems,
  RootState,
} from '@redux';
import {useTheme} from '@theme';
import {PostTypeKey} from '@types';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

export const useHistoryContentScreen = () => {
  const dispatch = useDispatch();
  const [keyPost, setKeyPost] = React.useState(PostTypeKey.MOVIES);
  const [search, setSearch] = React.useState('');
  const [isSelect, setIsSelect] = React.useState(false);
  const [idsSelect, setIdsSelect] = React.useState<number[]>([]);
  const history = useSelector(
    (state: RootState) => state.dataLocalSlide.history,
  );
  const params = useRoute().params as any;

  const {themeColors} = useTheme();

  const handleRemoveHistoryItem = (id: number) => {
    dispatch(removeHistoryItem(id));
    setIdsSelect(idsSelect.filter(item => item !== id));
  };

  const handleClearHistory = () => {
    if (idsSelect?.length === history.length) {
      dispatch(clearHistory());
      setIdsSelect([]);
      setIsSelect(false);
    } else {
      dispatch(removeHistoryItems(idsSelect));
      const newIds = idsSelect.filter(item => !idsSelect.includes(item));
      setIdsSelect(newIds);
    }
  };
  const onSearch = (text: string) => {
    setSearch(text);
  };

  const filteredHistory = React.useMemo(() => {
    return history.filter(item => {
      const matchesType = item.posttype === keyPost;
      const matchesSearch = search
        ? item.title.toLowerCase().includes(search.toLowerCase())
        : true;
      return matchesType && matchesSearch;
    });
  }, [history, keyPost, search]);
  const onSelectOption = () => {
    setIsSelect(!isSelect);
    if (!isSelect) {
      setIdsSelect([]);
    }
  };
  const handleSelectId = (id: number) => {
    if (idsSelect.includes(id)) {
      setIdsSelect(idsSelect.filter(item => item !== id));
    } else {
      setIdsSelect([...idsSelect, id]);
    }
  };
  return {
    themeColors,

    params,
    history,
    handleRemoveHistoryItem,
    handleClearHistory,
    keyPost,
    setKeyPost,
    search,
    setSearch,
    onSearch,
    filteredHistory,
    onSelectOption,
    isSelect,
    idsSelect,
    handleSelectId,
    setIdsSelect,
  };
};
