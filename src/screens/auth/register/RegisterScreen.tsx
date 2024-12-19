import { AppButton, AppHeader, AppInput, AppText, LoginSocial } from '@components';
import { t } from 'i18next';
import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRegisterScreen } from './RegisterScreen.hook';

const RegisterScreen = () => {
  const { control, errors, styles, onSubmit } = useRegisterScreen();

  return (
    <View style={styles.container}>
      <AppHeader />
      <KeyboardAwareScrollView style={styles.body}>
        <View style={styles.viewInfo}>
          <AppText style={styles.title}>
            {t('register.title')}
          </AppText>
          <AppText style={styles.descripstion}>
            {t('register.descripstion')}
          </AppText>

        </View>
        <AppInput name="name" placeholder={t('register.name')} error={errors.email?.message} control={control} />

        <AppInput name="email" placeholder={t('register.email')} error={errors.email?.message} control={control} />
        <AppInput name="password" placeholder={t('register.password')} error={errors.password?.message} control={control} secureTextEntry={true} />
        <AppInput name="confirmPassword" placeholder={t('register.confirmPassword')} error={errors.confirmPassword?.message} control={control} secureTextEntry={true} />

        <AppButton onPress={() => onSubmit()} label={t('register.register')} style={styles.btnLogin} />
        <LoginSocial isTopOr={true} />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default RegisterScreen;

