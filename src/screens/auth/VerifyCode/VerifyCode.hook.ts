import {VerifyCodeType} from '@constants';
import {zodResolver} from '@hookform/resolvers/zod';
import {RouteProp, useRoute} from '@react-navigation/native';
import {VerifyCodeFormData, verifyCodeSchema} from '@validations';
import {useForm} from 'react-hook-form';
const defaultValues = {
  code: '',
};
export const useVerifyCode = () => {
  const {type, phone} =
    useRoute<
      RouteProp<{params: {type: VerifyCodeType; phone: string}}, 'params'>
    >().params;
  const {control, handleSubmit, setValue} = useForm<VerifyCodeFormData>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues,
  });
  const onSubmit = handleSubmit(data => {
    console.log(data);
  });
  return {control, handleSubmit, setValue, onSubmit, type, phone};
};
