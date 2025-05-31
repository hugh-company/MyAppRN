import {logout, RootState} from '@redux';
import {useTheme} from '@theme';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createStyles} from './styles';

export const useProfileScreen = () => {
  const [data, setData] = useState([]);
  const token = useSelector((state: RootState) => state.accountSlice.token);
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  const dispatch = useDispatch();

  const onLogout = () => {
    // Implement logout functionality here
    dispatch(logout());
    console.log('Logout clicked');
  };
  return {data, themeColors, styles, token, onLogout};
};
