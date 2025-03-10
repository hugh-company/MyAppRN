import {useLocation} from '@hooks';
import {getToken} from '@redux';
import {getDatingDashboardApi} from '@services';
import {useTheme} from '@theme';
import {
  dataHeaderDatingInterface,
  ModuleDating,
  TypeDatingInterface,
  TypeTabDatingApi,
  UserItemInterface,
} from '@types';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {createStyles} from './styles';

export const useDatingScreen = () => {
  //
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  const [tab, setTab] = useState<TypeTabDatingApi>(TypeTabDatingApi.NEAR_YOU);

  //
  const [dataHeader, setDataHeader] = useState<dataHeaderDatingInterface>();
  //
  const token = useSelector(getToken);
  const {
    checkPermissionLocation,
    isPermissionLocation,
    goToSettingLocation,
    getLocationDevice,
  } = useLocation();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [data, setData] = useState<UserItemInterface[]>([]);
  //

  useEffect(() => {
    setLoading(true);
    callApi();
  }, []);
  const callApi = async (type?: TypeTabDatingApi, pageNumber?: number) => {
    const params = {
      paged: pageNumber,
    };
    const response = await getDatingDashboardApi(
      type || TypeTabDatingApi.NEAR_YOU,
      params,
    );
    const responseData = response?.data?.modules;
    console.log({responseData}, dataHeader);
    const responseUser = responseData?.filter(
      item => item.type === TypeDatingInterface.USERS_LIST,
    )?.[0]?.items;
    const isNextPage = responseUser?.is_next;
    if (responseUser?.page === 1) {
      const category: any = responseData.find(
        item => item.type === TypeDatingInterface.TOP_NAV,
      );
      setDataHeader({
        tabs: category?.items || [],
        button: responseData.find(
          item => item.type === TypeDatingInterface.BUTTON,
        ) as ModuleDating,
        infoDating: responseData.find(
          item => item.type === TypeDatingInterface.USERS_LIST,
        ) as ModuleDating,
      });
    }

    setIsLoadingMore(!isNextPage);
    if (responseUser?.page === 1) {
      setData(responseUser?.data);
    } else {
      setData(prevData => [...prevData, ...(responseUser?.data || [])]);
    }
    setLoading(false);
  };

  useEffect(() => {
    callApi(tab, 1);
  }, [tab]);

  useEffect(() => {
    if (token) {
      checkLocation();
    }
  }, [token]);

  const checkLocation = async () => {
    const check = await checkPermissionLocation();

    if (check) {
      const location = await getLocationDevice();
      console.log({location});
    }
  };

  const onSelectTab = (type: TypeTabDatingApi) => {
    setLoading(true);
    setTab(type);
  };

  const loadMore = async () => {
    if (!isLoadingMore) {
      setIsLoadingMore(true);
      setPage(prevPage => prevPage + 1);
      await callApi(tab, page + 1);
      setIsLoadingMore(false);
    }
  };
  const onRefresh = async () => {
    setPage(1);
    setIsLoadingMore(false);
    await callApi(tab, 1);
  };
  return {
    data,
    themeColors,
    styles,
    loading,
    tab,
    onSelectTab,
    isPermissionLocation,
    goToSettingLocation,

    loadMore,
    isLoadingMore,
    dataHeader,
    onRefresh,
  };
};
