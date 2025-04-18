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
  showNotificationError,
  showNotificationSuccess,
  validatePhoneNumber,
} from '@utils';
import {createProfileFormData, createProfileSchema} from '@validations';
import {t} from 'i18next';
import {useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {LayoutRectangle, PermissionsAndroid, Platform} from 'react-native';
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
  rel_status: '',
  zalo: '',
  facebook: '',
  instagram: '',
};
export const useCreateProfileScreen = () => {
  const [jobs, setJobs] = useState<{id: string; name: string}[]>([]);
  const userInfo = useSelector(getUserInfo);
  const dispatch = useDispatch();
  const scrollRef = useRef<any>(null); // Reference for scrolling
  const [fieldLayouts, setFieldLayouts] = useState<
    Record<string, LayoutRectangle>
  >({});
  const {
    control,
    handleSubmit,
    formState: {errors, isDirty},
    setError,
    reset,
    setFocus,
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
      const rel_status = userInfo?.rel_status || '';
      const zalo = userInfo?.personal?.social?.zalo || '';
      const facebook = userInfo?.personal?.social?.facebook || '';
      const instagram = userInfo?.personal?.social?.instagram || '';
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
        rel_status,
        zalo, // socials
        facebook,
        instagram,
      });
    }
  };

  const scrollToError = (errors: any) => {
    const errorMessages = Object.values(errors).map(
      (error: any) => error.message,
    );
    const combinedMessage = errorMessages.join('\n'); // Combine all error messages
    showNotificationError(t('validate.errorTitle'), combinedMessage); // Show all errors
  };

  const handleFieldLayout = (fieldName: string, layout: LayoutRectangle) => {
    setFieldLayouts(prev => ({...prev, [fieldName]: layout}));
  };

  const onSubmit = async (formData: createProfileFormData) => {
    const isValidatePhone = await validatePhoneNumber(
      formData.phone.code,
      formData.phone.number,
    );
    console.log({isValidatePhone});

    if (!isValidatePhone) {
      setError('phone.number', {
        message: t('validate.validate_phone_number'),
      });
      scrollToError(errors); // Scroll to the first error
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
      rel_status: formData.rel_status,
      zalo: formData.zalo || '',
      facebook: formData.facebook || '',
      instagram: formData.instagram || '',
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
  };

  const onError = (errors: any) => {
    console.log('Validation errors:', errors);
    scrollToError(errors); // Scroll to the first error
  };

  const handleFormSubmit = handleSubmit(onSubmit, onError);

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

  return {
    control,
    errors,
    handleFormSubmit,
    jobs,
    scrollRef,
    handleFieldLayout,
  };
};
