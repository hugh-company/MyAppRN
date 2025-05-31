import { AppButton, AppInput, AppText, ContainerAuth } from '@components';
import { navigateAuth, SCREEN_ROUTE } from '@navigation';
import { t } from 'i18next';
import React from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useLoginScreen } from './LoginScreen.hook';

interface LoginContainerProps {
  containerStyle?: StyleProp<ViewStyle>
}

const LoginContainer = ({ containerStyle }: LoginContainerProps) => {
  const { styles, control, errors, onSubmit } = useLoginScreen();
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef<any>(null);


  const onNavigateToForgotPassword = () => {
    navigateAuth(SCREEN_ROUTE.FORGOT_PASSWORD);
  };
  const onNavigateToRegister = () => {
    navigateAuth(SCREEN_ROUTE.REGISTER);
  };

  return (
    <ContainerAuth style={[styles.container, containerStyle]}>
      <AppText style={styles.txtTitle}>{t('login.title')}</AppText>
      <AppInput
        name="email"
        placeholder={t('login.email')}
        error={errors.email?.message}
        control={control}
        keyboardType={'email-address'}
        autoCapitalize="none"
        ref={emailRef}
        onSubmitEditing={() => passwordRef?.current.focus()}
      />
      <AppInput
        name="password"
        placeholder={t('login.password')}
        error={errors.password?.message}
        control={control}
        secureTextEntry={true}
        autoCapitalize="none"
        ref={passwordRef}
        onSubmitEditing={() => onSubmit()}
      />
      <TouchableOpacity style={styles.btnForgot} onPress={() => onNavigateToForgotPassword()}>
        <AppText style={styles.txtForgot}>{t('login.forgotPassword')}</AppText>
      </TouchableOpacity>
      <AppButton onPress={() => onSubmit()} label={t('login.title')} style={styles.btnLogin} />

      <View style={styles.viewAreYouAccount}>
        <AppText style={styles.txtAreYouAccount}>{t('login.youCanAccount')} </AppText>
        <TouchableOpacity onPress={() => onNavigateToRegister()}>
          <AppText style={styles.createAccount}>{t('register.title')}</AppText>
        </TouchableOpacity>
      </View>
    </ContainerAuth>
  );
};

export default LoginContainer;
