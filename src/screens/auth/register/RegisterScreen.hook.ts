import {zodResolver} from '@hookform/resolvers/zod';
import {useTheme} from '@theme';
import {registerFormData, registerSchema} from '@validations';
import {useForm} from 'react-hook-form';
import {createStyles} from './styles';
const defaultForm = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};
export const useRegisterScreen = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: defaultForm,
    resolver: zodResolver(registerSchema),
  });
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);

  const onSubmit = handleSubmit((form: registerFormData) => {
    console.log('Form submitted', form);
  });
  return {control, errors, themeColors, styles, onSubmit};
};
