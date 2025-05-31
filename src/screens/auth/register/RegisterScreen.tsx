import { AppButton, AppHeader, AppInput, AppInputCountries, AppInputDropdown, AppText } from '@components';
import { goBack } from '@navigation';
import { t } from 'i18next';
import React, { useRef } from 'react';
import { Controller } from 'react-hook-form';
import { TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRegisterScreen } from './RegisterScreen.hook';

const RegisterScreen = () => {
  const { control, errors, styles, onSubmit, watch } = useRegisterScreen(); // Destructure control and watch
  const accountType = watch('accountType'); // Watch accountType changes

  const accountTypeOptions = [
    { label: t('register.individual'), value: 'individual' },
    { label: t('register.company'), value: 'company' },
  ];

  const lastnameRef = useRef<any>(null);
  const firstnameRef = useRef<any>(null);
  const emailRef = useRef<any>(null);
  const phoneNumberRef = useRef<any>(null);
  const accountTypeRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const confirmPasswordRef = useRef<any>(null);
  const address1Ref = useRef<any>(null);
  const affiliateCodeRef = useRef<any>(null);
  const companyTaxRef = useRef<any>(null);
  const companyNameRef = useRef<any>(null);
  const personalIdRef = useRef<any>(null);

  return (
    <View style={styles.container}>
      <AppHeader title={t('register.title')} />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
        extraScrollHeight={100}
        style={styles.body}
      >
        <AppInput
          key={'lastname'}
          name="lastname"
          placeholder={t('register.lastname')}
          autoCapitalize="none"
          error={errors.lastname?.message}
          control={control}
          ref={lastnameRef}
          onSubmitEditing={() => firstnameRef.current?.focus()}
        />


        <AppInput
          key={'firstname'}
          name="firstname"
          placeholder={t('register.firstname')}
          autoCapitalize="none"
          error={errors.firstname?.message}
          control={control}
          ref={firstnameRef}
          onSubmitEditing={() => emailRef.current?.focus()}
        />


        <AppInput
          key={'email'}
          name="email"
          autoCapitalize="none"
          placeholder={t('register.email')}
          error={errors.email?.message}
          control={control}
          ref={emailRef}
          onSubmitEditing={() => phoneNumberRef.current?.focus()}
        />

        <AppInput
          key={'phonenumber'}
          name="phonenumber"
          placeholder={t('register.phonenumber')}
          autoCapitalize="none"
          error={errors.phonenumber?.message}
          control={control}
          ref={phoneNumberRef}
        />

        <AppInputDropdown
          key={'accountType'}
          name="accountType"
          data={accountTypeOptions}
          placeholder={t('register.accountType')}
          error={errors.accountType?.message}
          control={control}
          ref={accountTypeRef}
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
          onSubmitEditing={() => confirmPasswordRef.current?.focus()}
        />

        <AppInput
          name="password2"
          placeholder={t('register.confirmPassword')}
          error={errors.password2?.message}
          control={control}
          secureTextEntry={true}
          autoCapitalize="none"
          key={'password2'}
          ref={confirmPasswordRef}
          onSubmitEditing={() => address1Ref.current?.focus()}
        />

        <AppInput
          key={'address1'}
          name="address1"
          placeholder={t('register.address1')}
          autoCapitalize="none"
          error={errors.address1?.message}
          control={control}
          ref={address1Ref}
        />

        <Controller
          control={control}
          name="country"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <AppInputCountries
              value={value}
              onSelectCountry={(country) => onChange(country?.cca2)}
              placeholder={t('register.country')}
              error={error?.message}
            />
          )}
        />

        {accountType === 'company' ? (
          <>
            <AppInput
              key={'companyTax'}
              name="companyTax"
              placeholder={t('register.companyTax')}
              autoCapitalize="none"
              error={errors.companyTax?.message}
              control={control}
              ref={companyTaxRef}
              onSubmitEditing={() => companyNameRef.current?.focus()}
            />

            <AppInput
              key={'companyName'}
              name="companyName"
              placeholder={t('register.companyName')}
              autoCapitalize="none"
              error={errors.companyName?.message}
              control={control}
              ref={companyNameRef}
              onSubmitEditing={() => affiliateCodeRef.current?.focus()}
            />
          </>
        ) : (
          <AppInput
            key={'personalId'}
            name="personalId"
            placeholder={t('register.personalId')}
            autoCapitalize="none"
            error={errors.personalId?.message}
            control={control}
            ref={personalIdRef}
            onSubmitEditing={() => affiliateCodeRef.current?.focus()}
          />
        )}
        <AppInput
          key={'affiliateCode'}
          name="affiliateCode"
          placeholder={t('register.affiliateCode')}
          autoCapitalize="none"
          error={errors.affiliateCode?.message}
          control={control}
          ref={affiliateCodeRef}
          onSubmitEditing={() => onSubmit()}
        />
        <AppButton onPress={() => onSubmit()} label={t('register.title')} style={styles.btnLogin} />

        <View style={styles.viewAreYouAccount}>
          <AppText style={styles.txtAreYouAccount}>{t('register.youHaveAccount')} </AppText>
          <TouchableOpacity onPress={() => goBack()}>
            <AppText style={styles.createAccount}>{t('login.title')}</AppText>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default RegisterScreen;

