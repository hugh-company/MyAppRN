import {GlobalService} from '@components';
import {zodResolver} from '@hookform/resolvers/zod';
import {registerApi} from '@services';
import {useTheme} from '@theme';
import {showNotificationError} from '@utils';
import {registerFormData, registerSchema} from '@validations';
import {t} from 'i18next';
import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {createStyles} from './styles';
const defaultForm: registerFormData = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  password2: '', // Change from password2 to confirmPassword
  address1: '',
  country: '',
  phonenumber: '',
  accountType: 'individual', // Ensure this matches the schema type
  personalId: '',
  companyTax: '',
  companyName: '',

  //
  affiliateCode: '',
};
export const useRegisterScreen = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    setError,
    reset,
    getValues,
    watch, // Add watch here
  } = useForm({
    defaultValues: defaultForm, // Ensure this matches the schema
    resolver: zodResolver(registerSchema),
  });
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  const dispatch = useDispatch();
  const onSubmit = handleSubmit(async (form: registerFormData) => {
    try {
      GlobalService.showLoading();
      const params: any = {
        firstname: form.firstname,
        lastname: form.lastname,
        email: form.email,
        password: form.password,
        password2: form.password2,
        address1: form.address1,
        country: form.country.toLowerCase(), // Ensure country is in lowercase
        phonenumber: form.phonenumber,
        accountType: form.accountType,
        personalId: form.personalId,
        companyTax: form.accountType === 'company' ? form.companyTax : null,
        companyName: form.accountType === 'company' ? form.companyName : null,
      };

      if (form.affiliateCode) {
        params.affiliateCode = form.affiliateCode;
      }
      const res = await registerApi(params);
      console.log({res});
      // dispatch(setToken(res?.data?.access_token));
      // dispatch(setUserInfo(res?.data?.me));
      // showNotificationSuccess(t('register.registerSuccess'), res?.message);
      // reset();
      // navigate(SCREEN_ROUTE.LOGIN);
    } catch (error: any) {
      // show error with field
      console.log({error: error});
      showNotificationError(
        t('register.registerFailed'),
        error?.response?.data || error?.message,
      );
      // const objectError = error?.errors;

      // errorFormUtils(objectError, setError);
      // showNotificationError(t('register.registerFail'), error?.message);
    } finally {
      GlobalService.hideLoading();
    }
  });

  return {control, errors, themeColors, styles, onSubmit, getValues, watch}; // Include watch in the return object
};
