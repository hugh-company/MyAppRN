import { AppButton, AppInput, AppInputPhone, AppText, ContainerAuth } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import React from 'react';
import { useSignUp } from './SignUp.hook';
import { styles } from './styles';

const SignUp = () => {
  const { control, onSubmit, errors } = useSignUp();
  return (
    <ContainerAuth title="Chào mừng bạn đến với KidsPlaza!" description="Nhập hoặc tạo tài khoản với vài bước đơn giản" style={styles.container} isKeyboardAvoidingView>
      <AppInputPhone containerStyle={styles.inputPhone} label="Số điện thoại*" placeholder="0909090909" control={control} name="phone" error={errors.phone?.message} />
      <AppText style={styles.txtAccept}>
        Tôi đồng ý với <AppText style={styles.txtAcceptLink}>Điều khoản Dịch vụ & Chính sách Bảo mật của</AppText> KidsPlaza
      </AppText>
      <AppButton onPress={() => { navigate(SCREEN_ROUTE.SUPPORT_VERIFY_CODE); }} style={styles.btnErrorPhone} textStyle={styles.txtBtnErrorPhone} title="Bạn gặp vấn đề với số điện thoại?" />
      <AppInput placeholder="Nhập mã mã giới thiệu (nếu có)" name="code" control={control} error={errors.code?.message} />
      <AppButton title="Tiếp tục" style={styles.button} onPress={onSubmit} />

    </ContainerAuth>
  );
};

export default SignUp;
