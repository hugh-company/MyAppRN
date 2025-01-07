import {GlobalService} from '@components';
import {zodResolver} from '@hookform/resolvers/zod';
import {setToken, setUserInfo} from '@redux';
import {loginApi} from '@services';
import {useTheme} from '@theme';
import {showNotificationError, showNotificationSuccess} from '@utils';
import {loginFormData, loginSchema} from '@validations';
import {t} from 'i18next';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {createStyles} from './styles';

const defaultForm = {
  username: '',
  password: '',
};
export const useLoginScreen = () => {
  const [data, setData] = useState([]);
  const {themeColors} = useTheme();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: defaultForm,
    resolver: zodResolver(loginSchema),
  });
  const styles = createStyles(themeColors);

  const onSubmit = handleSubmit(async (form: loginFormData) => {
    const params = {
      username: form.username,
      password: form.password,
    };
    GlobalService.showLoading();

    try {
      const res = await loginApi(params);
      console.log({res});
      showNotificationSuccess(t('login.loginSuccess'), res?.message);
      dispatch(setToken(res?.data?.access_token));
      dispatch(setUserInfo(res?.data?.me));
      //
    } catch (error: any) {
      console.log({error: error});

      showNotificationError(t('login.loginFail'), error?.message);
    } finally {
      GlobalService.hideLoading();
    }
  });
  return {data, themeColors, styles, control, onSubmit, errors};
};
