import {zodResolver} from '@hookform/resolvers/zod';
import {getUserInfo} from '@redux';
import {getListJobsApi, paramsUpdateProfile, updateProfileApi} from '@services';
import {useTheme} from '@theme';
import {genderInterface} from '@types';
import {getInfoPhoneNumber, getPhoneNumber, validatePhoneNumber} from '@utils';
import {createProfileFormData, createProfileSchema} from '@validations';
import {t} from 'i18next';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useSelector} from 'react-redux';
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
  galleries: [] as string[],
  job: '',
};
export const useCreateProfileScreen = () => {
  const [data, setData] = useState([]);
  const [jobs, setJobs] = useState<{id: number; name: string}[]>([]);
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  const userInfo = useSelector(getUserInfo);

  const {
    control,
    handleSubmit,
    formState: {errors},
    setError,
    reset,
  } = useForm({
    defaultValues: defaultForm,
    resolver: zodResolver(createProfileSchema),
  });
  useEffect(() => {
    checkInfoUserWithForm();
    callApiJobs();
  }, []);
  const callApiJobs = async () => {
    const response: any = await getListJobsApi();
    console.log({response});
    setJobs(response?.data || []);
    // setData(response.data);
  };
  const checkInfoUserWithForm = async () => {
    // check info user with form
    if (userInfo) {
      const phoneNumber = await getInfoPhoneNumber(userInfo.phone);
      const phone = phoneNumber?.number || '';
      const code = phoneNumber?.country || 'VN';
      const avatar = userInfo.avatar || '';
      const about_me = userInfo.about_me || '';
      const birthday = userInfo.birthday || '';
      const fullname = userInfo.fullname || '';
      const gender = userInfo?.gender || '';
      const galleries = userInfo?.personal?.galleries || [];
      console.log('aa:', galleries);
      reset({
        avatar,
        phone: {
          code,
          number: phone,
        },
        about_me,
        birthday,
        fullname,
        gender,
        galleries,
      });
    }
  };
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
    const phoneNumber: string =
      (await getPhoneNumber(formData.phone.code, formData.phone.number)) || '';
    const params: paramsUpdateProfile = {
      ...formData,
      phone: phoneNumber || '',
      gender: formData.gender as genderInterface,
      galleries: formData.galleries || [],
    };
    console.log({params});
    try {
      const response = await updateProfileApi(params);
      console.log({response});
    } catch (error) {}
  });
  return {data, themeColors, styles, control, errors, onSubmit, jobs};
};
