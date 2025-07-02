import { AnimatedInputScrollerRef, AppButton, AppHeader, AppInput, AppInputCountries, AppInputDropdown, AppText } from '@components';

import { goBack } from '@navigation';
import { t } from 'i18next';
import React, { useRef } from 'react';
import { Controller } from 'react-hook-form';
import { TextInput, TouchableOpacity, View } from 'react-native';
import AnimatedInputScroller from '../../../components/AnimatedInputScroller';
import { useRegisterScreen } from './RegisterScreen.hook';

const RegisterScreen = () => {
  const { control, errors, styles, onSubmit, watch } = useRegisterScreen();
  const accountType = watch('accountType');
  const scrollerRef = useRef<AnimatedInputScrollerRef>(null);

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

  // Helper function to focus and scroll
  const focusAndScroll = (refToFocus: React.RefObject<TextInput | View | any>) => { // Added View for broader type
    if (refToFocus.current) {
      // Attempt to focus only if the focus method exists
      if (typeof refToFocus.current.focus === 'function') {
        refToFocus.current.focus();
      }
      // Attempt to scroll to it
      if (scrollerRef.current) {
        // Ensure the component referred by refToFocus can be handled by measureLayout
        // This might require AppInputDropdown (and other custom inputs) to use forwardRef
        // and pass the ref to an actual View or TextInput component.
        scrollerRef.current.scrollToInput(refToFocus);
      }
    }
  };

  return (
    <View style={styles.container}>

      <AppHeader title={t('register.title')} isBackground />
      <AnimatedInputScroller
        ref={scrollerRef} // Assign the ref
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
        extraScrollHeight={100} // You might want to adjust this
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
          onSubmitEditing={() => focusAndScroll(firstnameRef)}
        />


        <AppInput
          key={'firstname'}
          name="firstname"
          placeholder={t('register.firstname')}
          autoCapitalize="none"
          error={errors.firstname?.message}
          control={control}
          ref={firstnameRef}
          onSubmitEditing={() => focusAndScroll(emailRef)}
        />


        <AppInput
          key={'email'}
          name="email"
          autoCapitalize="none"
          placeholder={t('register.email')}
          error={errors.email?.message}
          control={control}
          ref={emailRef}
          onSubmitEditing={() => focusAndScroll(phoneNumberRef)}
        />

        <AppInput
          key={'phonenumber'}
          name="phonenumber"
          placeholder={t('register.phonenumber')}
          autoCapitalize="none"
          error={errors.phonenumber?.message}
          control={control}
          ref={phoneNumberRef}
          // Assuming accountTypeRef is the next, or handle differently if it's a dropdown without direct focus
          // For a dropdown, focus() might not be applicable, but scrolling to it is.
          onSubmitEditing={() => focusAndScroll(accountTypeRef)}
        />

        <AppInputDropdown
          key={'accountType'}
          name="accountType"
          data={accountTypeOptions}
          placeholder={t('register.accountType')}
          error={errors.accountType?.message}
          control={control}
          ref={accountTypeRef}
        // AppInputDropdown likely doesn't have onSubmitEditing.
        // Use a prop like onSelect, onValueChange, or onClose to trigger the next action.

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
          onSubmitEditing={() => focusAndScroll(confirmPasswordRef)}
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
          onSubmitEditing={() => focusAndScroll(address1Ref)}
        />

        <AppInput
          key={'address1'}
          name="address1"
          placeholder={t('register.address1')}
          autoCapitalize="none"
          error={errors.address1?.message}
          control={control}
          ref={address1Ref}
          // Assuming country is next, but it's a Controller, not a direct ref.
          // You might need a different strategy for Controller-based inputs
          // or if AppInputCountries can take a ref.
          // For now, let's assume it focuses the next available field based on accountType
          onSubmitEditing={() => {
            if (accountType === 'company') {
              focusAndScroll(companyTaxRef);
            } else {
              focusAndScroll(personalIdRef);
            }
          }}
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
              onSubmitEditing={() => focusAndScroll(companyNameRef)}
            />

            <AppInput
              key={'companyName'}
              name="companyName"
              placeholder={t('register.companyName')}
              autoCapitalize="none"
              error={errors.companyName?.message}
              control={control}
              ref={companyNameRef}
              onSubmitEditing={() => focusAndScroll(affiliateCodeRef)}
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
            onSubmitEditing={() => focusAndScroll(affiliateCodeRef)}
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
      </AnimatedInputScroller>
    </View>
  );
};

export default RegisterScreen;

