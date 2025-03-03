import {GlobalService} from '@components';
import {zodResolver} from '@hookform/resolvers/zod';
import {navigate, SCREEN_ROUTE} from '@navigation';
import {getUserInfo, setLocation, setUserInfo} from '@redux';
import {
  getListJobsApi,
  paramsUpdateProfile,
  sendLocationUserApi,
  updateProfileApi,
} from '@services';
import {genderInterface} from '@types';
import {
  errorFormUtils,
  formatDate,
  getInfoPhoneNumber,
  getPhoneNumber,
  showNotificationSuccess,
  validatePhoneNumber,
} from '@utils';
import {createProfileFormData, createProfileSchema} from '@validations';
import {t} from 'i18next';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {useDispatch, useSelector} from 'react-redux';

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
  const [jobs, setJobs] = useState<{id: string; name: string}[]>([]);
  const userInfo = useSelector(getUserInfo);
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: {errors, isDirty},
    setError,
    reset,
  } = useForm({
    defaultValues: defaultForm,
    resolver: zodResolver(createProfileSchema),
  });
  useEffect(() => {
    checkInfoUserWithForm();
    callApiJobs();
    requestLocationPermission();
  }, []);

  const callApiJobs = async () => {
    try {
      const response: any = await getListJobsApi();
      console.log({response});
      setJobs(response?.data || []);
    } catch (error) {
      console.log({error});
    }
    // setData(response.data);
  };
  const checkInfoUserWithForm = async () => {
    // check info user with form
    console.log({userInfo});

    if (userInfo) {
      const phoneNumber = await getInfoPhoneNumber(userInfo.phone);
      const phone = phoneNumber?.number || '';
      const code = phoneNumber?.country || 'VN';
      const avatar = userInfo.avatar || '';
      const about_me = userInfo.about_me || '';
      const birthday = userInfo.birthday || '';
      const fullname = userInfo.fullname || '';
      const gender = userInfo?.gender || '';
      const job = userInfo?.personal?.job || '';
      const galleries = userInfo?.personal?.galleries || [];
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
        job,
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

    if (!isDirty) {
      goToFavorites();
      return;
    }
    GlobalService.showLoading();
    const phoneNumber: string =
      (await getPhoneNumber(formData.phone.code, formData.phone.number)) || '';
    const params: paramsUpdateProfile = {
      ...formData,
      phone: phoneNumber || '',
      gender: formData.gender as genderInterface,
      galleries: formData.galleries || [],
      birthday: formatDate(formData.birthday, 'YYYY-MM-DD') || '',
    };
    console.log({params});

    try {
      const response: any = await updateProfileApi(params);
      console.log({response});
      dispatch(setUserInfo(response.data));
      showNotificationSuccess(
        t('user_info.titleSuccessUpdateUser'),
        t('user_info.desSuccessUpdateUser'),
      );
      goToFavorites();
    } catch (error) {
      console.log({error});
      const objectError = error?.errors;
      errorFormUtils(objectError, setError);
    } finally {
      GlobalService.hideLoading();
    }
  });
  const goToFavorites = () => {
    navigate(SCREEN_ROUTE.SETTING_FAVORITE);
  };

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: t('permission.titleLocation'),
            message: t('permission.messageLocation'),
            buttonNeutral: 'Ask Me Later',
            buttonNegative: t('permission.notAllow'),
            buttonPositive: t('permission.allow'),
          },
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission denied');
          return;
        }
      } else {
        const granted = await Geolocation.requestAuthorization('whenInUse');
        if (granted !== 'granted') {
          console.log('Location permission denied');
          return;
        }
      }
      Geolocation.getCurrentPosition(
        async position => {
          console.log({position});
          const {latitude, longitude} = position.coords;
          try {
            const responseLocation = await sendLocationUserApi({
              lat: latitude,
              lng: longitude,
            });
            console.log({responseLocation});
            // dispatch(setUserInfo(responseLocation.data));
            dispatch(setLocation({latitude: latitude, longitude: longitude}));
          } catch (error) {
            console.log({error});
          }
        },
        error => {
          console.error(error);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } catch (err) {
      console.warn(err);
    }
  };

  return {control, errors, onSubmit, jobs};
};
