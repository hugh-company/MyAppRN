import {zodResolver} from '@hookform/resolvers/zod';
import {paramsUpdateProfile, updateProfileApi} from '@services';
import {useTheme} from '@theme';
import {
  createProfileFormData,
  createProfileSchema,
  getPhoneNumber,
  validatePhoneNumber,
} from '@validations';
import {t} from 'i18next';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {createStyles} from './styles';
const defaultForm = {
  avatar: '',
  phone: {
    code: 'VN',
    number: '',
  },
  about_me: '',
  birthday: '',
  gender: '',
  fullname: '',
};
export const useCreateProfileScreen = () => {
  const [data, setData] = useState([]);
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);

  const {
    control,
    handleSubmit,
    formState: {errors},
    setError,
  } = useForm({
    defaultValues: defaultForm,
    resolver: zodResolver(createProfileSchema),
  });

  const onSubmit = handleSubmit(async (formData: createProfileFormData) => {
    const isValidatePhone = await validatePhoneNumber(
      formData.phone.code,
      formData.phone.number,
    );
    console.log({isValidatePhone});

    if (!isValidatePhone) {
      setError('phone.number', {
        message: t('validate.validate_phone_number'),
      });
      return;
    }
    const phoneNumber: string = await getPhoneNumber(
      formData.phone.code,
      formData.phone.number,
    );
    const params: paramsUpdateProfile = {
      ...formData,
      phone: phoneNumber || '',
    };
    console.log({params});
    try {
      const response = await updateProfileApi(params);
      console.log({response});
    } catch (error) {}
  });
  return {data, themeColors, styles, control, errors, onSubmit};
};
