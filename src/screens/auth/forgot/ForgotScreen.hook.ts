import {zodResolver} from '@hookform/resolvers/zod';
import {forgotPasswordApi} from '@services';
import {useTheme} from '@theme';
import {showNotificationError, showNotificationSuccess} from '@utils';
import {forgotPasswordFormData, forgotPasswordSchema} from '@validations';
import {t} from 'i18next';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {createStyles} from './styles';
const defaultForm = {
  email: '',
};
export const useForgotScreen = () => {
  const [data, setData] = useState([]);
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: defaultForm,
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = handleSubmit(async (form: forgotPasswordFormData) => {
    setLoading(true);
    const params = {
      email: form.email,
    };

    try {
      const response: any = await forgotPasswordApi(params.email);
      console.log({response});
      showNotificationSuccess(t('forgot.successTitle'), response?.message);
    } catch (error) {
      showNotificationError(t('forgot.titleFailed'), t('forgot.messageFailed'));
    } finally {
      setLoading(false);
    }
  });
  return {data, themeColors, styles, onSubmit, control, errors, loading};
};
