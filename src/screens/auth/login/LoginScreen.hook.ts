import {zodResolver} from '@hookform/resolvers/zod';
import {useTheme} from '@theme';
import {loginFormData, loginSchema} from '@validations';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {createStyles} from './styles';

const defaultForm = {
  email: '',
  password: '',
};
export const useLoginScreen = () => {
  const [data, setData] = useState([]);
  const {themeColors} = useTheme();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: defaultForm,
    resolver: zodResolver(loginSchema),
  });
  const styles = createStyles(themeColors);

  const onSubmit = handleSubmit((form: loginFormData) => {
    console.log('Form submitted', form);
  });
  return {data, themeColors, styles, control, onSubmit, errors};
};
