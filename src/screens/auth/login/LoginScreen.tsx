import { AppButton, AppInput, AppText, ContainerAuth } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { t } from 'i18next';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useLoginScreen } from './LoginScreen.hook';

const LoginScreen = () => {
  const { styles, control, errors, onSubmit } = useLoginScreen();
  console.log({ errors });

  return (
    <ContainerAuth style={styles.container}>
      <AppInput name="email" placeholder={t('login.email')} error={errors.email?.message} control={control} />
      <AppInput name="password" placeholder={t('login.password')} error={errors.password?.message} control={control} secureTextEntry={true} />
      <AppButton onPress={() => onSubmit()} label={t('login.login')} style={styles.btnLogin} />
      <TouchableOpacity style={styles.btnForgot} onPress={() => navigate(SCREEN_ROUTE.FORGOT_PASSWORD)}>
        <AppText style={styles.txtForgot}>{t('login.forgotPassword')}</AppText>
      </TouchableOpacity>
      <View style={styles.viewAreYouAccount}>
        <AppText style={styles.txtAreYouAccount}>{t('login.youCanAccount')} </AppText>
        <TouchableOpacity onPress={() => navigate(SCREEN_ROUTE.REGISTER)}>
          <AppText style={styles.createAccount}>{t('login.createAccountNow')}</AppText>
        </TouchableOpacity>
      </View>
    </ContainerAuth>
  );
};

export default LoginScreen;
