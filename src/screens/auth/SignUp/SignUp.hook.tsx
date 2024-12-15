import { zodResolver } from '@hookform/resolvers/zod';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { SignUpFormData, signUpSchema } from '@validations';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { useForm } from 'react-hook-form';

const defaultValues = {
  phone: '',
  code: '',
};
export const useSignUp = () => {
  const { control, handleSubmit, formState: { errors }, setError } = useForm({ defaultValues, resolver: zodResolver(signUpSchema) });
  const validatePhone = (phone: string) => {
    const isValid = isValidPhoneNumber(phone, 'VN');
    if (!isValid) {
      setError('phone', { message: 'Số điện thoại không đúng định dạng' });
      return false;
    }
    return true;
  };
  const onSubmit = handleSubmit(async (data: SignUpFormData) => {
    const isValid = await validatePhone(data.phone);
    if (isValid) {
      navigate(SCREEN_ROUTE.SELECT_VERIFY, { phone: data.phone });
    }
  });
  return { control, onSubmit, errors, handleSubmit };
};
