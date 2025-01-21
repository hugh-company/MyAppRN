import {useLocation} from '@hooks';
import {getToken} from '@redux';
import {useTheme} from '@theme';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {createStyles} from './styles';

export const useDashboardCreateProfile = () => {
  const [data, setData] = useState([]);
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  const token = useSelector(getToken);
  const {checkPermissionLocation, isPermissionLocation, goToSettingLocation} =
    useLocation();
  useEffect(() => {
    if (token) {
      checkPermissionLocation();
    }
  }, [token]);

  return {
    data,
    themeColors,
    styles,
    token,
    checkPermissionLocation,
    isPermissionLocation,
    goToSettingLocation,
  };
};
