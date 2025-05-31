import {GlobalService} from '@components';
import {zodResolver} from '@hookform/resolvers/zod';
import {setToken, setUserInfo} from '@redux';
import {loginApi} from '@services';
import {useTheme} from '@theme';
import {showNotificationError, showNotificationSuccess} from '@utils';
import {loginFormData, loginSchema} from '@validations';
import {t} from 'i18next';
import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {createStyles} from './styles';

const defaultForm = {
  email: 'hieunguyendev102@gmail.com',
  password: 'trunghieu111',
};
export const useLoginScreen = () => {
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
      username: form.email,
      password: form.password,
    };
    GlobalService.showLoading();

    try {
      const res = await loginApi(params);
      console.log({res});
      showNotificationSuccess(t('login.loginSuccess'), res?.message);
      dispatch(setToken(res?.data?.accessToken));
      dispatch(setUserInfo(res?.data?.user));
      //
    } catch (error: any) {
      console.log({error: error});

      showNotificationError(t('login.loginFailed'), t('login.messageFailed'));
    } finally {
      GlobalService.hideLoading();
    }
  });
  return {themeColors, styles, control, onSubmit, errors};
};
