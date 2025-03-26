import {useRoute} from '@react-navigation/native';
import {
  clearSavedItems,
  getToken,
  removeSavedItem,
  removeSavedItems,
  RootState,
} from '@redux';
import {getSavedPostApi, savePostApi, useSavedPostApi} from '@services';
import {useTheme} from '@theme';
import {PostTypeKey} from '@types';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export const useSavedPost = () => {
  const [keyPost, setKeyPost] = React.useState(PostTypeKey.MOVIES);
  const [search, setSearch] = React.useState('');
  const [isSelect, setIsSelect] = React.useState(false);
  const [idsSelect, setIdsSelect] = React.useState<number[]>([]);
  const savedLocal = useSelector(
    (state: RootState) => state.dataLocalSlide.savedItems,
  );
  const token = useSelector(getToken);
  const {data, isFetching, isLoading, refetch} = useSavedPostApi(keyPost);

  const saved = React.useMemo(
    () => (token ? savedLocal : isFetching ? [] : data?.data?.data),
    [isFetching, token, data, savedLocal],
  );
  const params = useRoute().params as any;
  const dispatch = useDispatch();
  const {themeColors} = useTheme();

  useEffect(() => {
    if (keyPost) {
      getListSaved(keyPost);
    }
  }, [keyPost]);
  // call api
  const getListSaved = async (type: PostTypeKey) => {
    try {
      const response: any = await getSavedPostApi(type);
      console.log('ResponseSave', response);
    } catch (error) {
      console.log({errorSaved: error});
    }
  };

  //

  const handleRemoveSavedItem = (id: number) => {
    if (!token) {
      dispatch(removeSavedItem(id));
    } else {
      handleSaveApi([id]);
    }

    setIdsSelect(idsSelect.filter(item => item !== id));
  };

  const handleClearSaved = () => {
    if (idsSelect?.length === filteredSaved.length) {
      if (!token) {
        dispatch(clearSavedItems());
      } else {
        handleSaveApi(saved.map(item => item.id));
      }

      setIdsSelect([]);
      setIsSelect(false);
    } else {
      if (!token) {
        dispatch(removeSavedItems(idsSelect));
      } else {
        handleSaveApi(idsSelect);
      }

      const newIds = idsSelect.filter(item => !idsSelect.includes(item));
      setIdsSelect(newIds);
    }
  };
  const onSearch = (text: string) => {
    setSearch(text);
  };

  const filteredSaved = React.useMemo(() => {
    return saved?.filter(item => {
      const matchesType = item.posttype === keyPost;
      const matchesSearch = search
        ? item.title.toLowerCase().includes(search.toLowerCase())
        : true;
      return matchesType && matchesSearch;
    });
  }, [saved, keyPost, search]);
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
  // callApi save ,remove

  const handleSaveApi = async (ids: number[]) => {
    if (token) {
      try {
        const response: any = await savePostApi(keyPost, ids);
        console.log({response});
        refetch();
      } catch (error) {
        console.log({errorSave: error});
      }
    } else {
    }
  };
  return {
    themeColors,

    params,
    saved,
    handleRemoveSavedItem,
    handleClearSaved,
    keyPost,
    setKeyPost,
    search,
    setSearch,
    onSearch,
    filteredSaved,
    onSelectOption,
    isSelect,
    idsSelect,
    handleSelectId,
    setIdsSelect,
    loading: isLoading || isFetching,
    refetch,
  };
};
