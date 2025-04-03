import { AppButton, AppHeader, AppInput, AppText, LoginSocial } from '@components';
import { t } from 'i18next';
import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRegisterScreen } from './RegisterScreen.hook';

const RegisterScreen = () => {
  const { control, errors, styles, onSubmit } = useRegisterScreen();
  const fullnameRef = React.useRef(null);
  const usernameRef = React.useRef(null);
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  const confirmPasswordRef = React.useRef(null);

  return (
    <View style={styles.container}>
      <AppHeader />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
        extraScrollHeight={100}
        style={styles.body}
      >
        <View style={styles.viewInfo}>
          <AppText style={styles.title}>
            {t('register.title')}
          </AppText>
          <AppText style={styles.descripstion}>
            {t('register.descripstion')}
          </AppText>
        </View>

        <AppInput
          key={'fullname'}
          name="fullname"
          placeholder={t('login.fullname')}
          autoCapitalize="none"
          error={errors.fullname?.message}
          control={control}
          ref={fullnameRef}
          onSubmitEditing={() => usernameRef.current.focus()}
        />

        <AppInput
          key={'username'}
          name="username" placeholder={t('login.username')}
          autoCapitalize="none"
          error={errors.username?.message} control={control}
          ref={usernameRef}
          onSubmitEditing={() => emailRef.current.focus()}
        />

        <AppInput
          key={'email'}
          name="email"
          autoCapitalize="none"
          placeholder={t('register.email')} error={errors.email?.message} control={control}
          ref={emailRef}
          onSubmitEditing={() => passwordRef.current.focus()}
        />

        <AppInput
          name="password"
          placeholder={t('register.password')}
          error={errors.password?.message}
          control={control}
          secureTextEntry={true}
          key={'password'}
          autoCapitalize="none"
          ref={passwordRef}
          onSubmitEditing={() => confirmPasswordRef.current.focus()}
        />
        <AppInput name="confirmPassword"
          placeholder={t('register.confirmPassword')}
          error={errors.confirmPassword?.message}
          control={control}
          secureTextEntry={true}
          autoCapitalize="none"
          key={'confirmPassword'}
          ref={confirmPasswordRef}
          onSubmitEditing={() => onSubmit()}
        />

        <AppButton onPress={() => onSubmit()} label={t('register.register')} style={styles.btnLogin} />
        <LoginSocial isTopOr={true} />

      </KeyboardAwareScrollView>
    </View>
  );
};

export default RegisterScreen;

