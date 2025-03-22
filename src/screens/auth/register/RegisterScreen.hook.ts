import {GlobalService} from '@components';
import {zodResolver} from '@hookform/resolvers/zod';
import {navigate, SCREEN_ROUTE} from '@navigation';
import {setToken, setUserInfo} from '@redux';
import {registerApi} from '@services';
import {useTheme} from '@theme';
import {errorFormUtils, showNotificationSuccess} from '@utils';
import {registerFormData, registerSchema} from '@validations';
import {t} from 'i18next';
import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {createStyles} from './styles';
const defaultForm = {
  fullname: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};
export const useRegisterScreen = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    setError,
    reset,
  } = useForm({
    defaultValues: defaultForm,
    resolver: zodResolver(registerSchema),
  });
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  const dispatch = useDispatch();
  const onSubmit = handleSubmit(async (form: registerFormData) => {
    try {
      GlobalService.showLoading();
      const params = {
        username: form.username,
        email: form.email,
        password: form.password,
        password_repeat: form.confirmPassword,
        fullname: form.fullname,
      };
      const res = await registerApi(params);
      console.log({res});
      dispatch(setToken(res?.data?.access_token));
      dispatch(setUserInfo(res?.data?.me));
      showNotificationSuccess(t('register.registerSuccess'), res?.message);
      reset();
      navigate(SCREEN_ROUTE.LOGIN);
    } catch (error: any) {
      // show error with field
      console.log({error: error});

      const objectError = error?.errors;

      errorFormUtils(objectError, setError);
      // showNotificationError(t('register.registerFail'), error?.message);
    } finally {
      GlobalService.hideLoading();
    }
  });

  return {control, errors, themeColors, styles, onSubmit};
};
