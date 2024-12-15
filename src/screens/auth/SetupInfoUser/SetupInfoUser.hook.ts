import {zodResolver} from '@hookform/resolvers/zod';
import {navigate, SCREEN_ROUTE} from '@navigation';
import {SetupInfoUserFormData, setupInfoUserSchema} from '@validations';
import {useForm} from 'react-hook-form';

const defaultValues = {
  name: '',
  email: '',
};

export const useSetupInfoUser = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm({
    defaultValues,
    resolver: zodResolver(setupInfoUserSchema),
  });
  const name = watch('name');

  const onSubmit = (data: SetupInfoUserFormData) => {
    console.log(data);
    navigate(SCREEN_ROUTE.SIGN_UP);
  };
  return {control, handleSubmit, errors, onSubmit, name};
};
