import { AppButton, AppInputVerifyCode, ContainerAuth } from '@components';
import { VerifyCodeType } from '@constants';
import { navigate, SCREEN_ROUTE } from '@navigation';
import React from 'react';
import { Controller } from 'react-hook-form';
import { useVerifyCode } from './VerifyCode.hook';
import { styles } from './styles';
const VerifyCode = () => {
  const { control, handleSubmit, setValue, onSubmit, type, phone } = useVerifyCode();
  return (
    <ContainerAuth style={styles.container} title={`Nhập mã OTP được gửi qua ${type === VerifyCodeType.SMS ? 'SMS' : 'Email'}`}
      description={`Mã OTP đã được gửi đến ${phone || ''}`} >
      <Controller
        control={control}
        name="code"
        render={({ field: { onChange, onBlur, value } }) => (
          <AppInputVerifyCode
            label="OTP*"
            value={value}
            maxLength={6}
            onChangeText={onChange}
            handleOtpChange={(code) => {
              console.log(code);
            }} />
        )}
      />
      <AppButton onPress={() => { navigate(SCREEN_ROUTE.SUPPORT_VERIFY_CODE); }} style={styles.btnErrorPhone} textStyle={styles.txtBtnErrorPhone}
        title="Thử đăng nhập bằng phương thức khác" />
    </ContainerAuth>
  );
};

export default VerifyCode;
