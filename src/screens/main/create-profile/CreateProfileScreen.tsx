import { AppButton, AppDate, AppHeader, AppInput, AppInputDropdown, AppInputPhone, AppInputSocial, AppText, UploadImage, UploadListImage } from '@components';
import { genderInterface } from '@types';
import { t } from 'i18next';
import React from 'react';
import { Controller } from 'react-hook-form';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useCreateProfileScreen } from './CreateProfileScreen.hook';
import { styles } from './styles';

export const CreateProfileScreen = () => {
  const { control, errors, handleFormSubmit, jobs, scrollRef, handleFieldLayout } = useCreateProfileScreen();
  const gender = [
    {
      label: t('male'),
      value: genderInterface.MALE,
    },
    {
      label: t('girl'),
      value: genderInterface.FEMALE,
    },
    {
      label: t('allGender'),
      value: genderInterface.OTHER,
    },
  ];

  const relStatus = [
    { label: t('single'), value: 'single' },
    { label: t('in_relationship'), value: 'in_relationship' },
    { label: t('engaged'), value: 'engaged' },
    { label: t('married'), value: 'married' },
    { label: t('separated'), value: 'separated' },
    { label: t('divorced'), value: 'divorced' },
    { label: t('widowed'), value: 'widowed' },
  ];

  return (
    <View style={styles.container}>
      <AppHeader />
      <KeyboardAwareScrollView
        ref={scrollRef} // Attach scrollRef
        extraScrollHeight={20} // Add extra scroll height for better visibility
        enableAutomaticScroll={true} // Enable automatic scrolling
        keyboardShouldPersistTaps="handled" // Ensure taps are handled properly
        showsVerticalScrollIndicator={false}
        style={styles.body}>
        <AppText style={styles.title}>{t('dating.createNewProfile')}</AppText>
        <AppText style={styles.description}>{t('dating.desNewProfile')}</AppText>

        <Controller
          control={control}
          name="avatar"
          render={({ field: { onChange, value } }) => (
            <UploadImage
              uri={value}
              style={styles.avatar}
              containerStyle={styles.btnAvatar}
              onUploadImage={onChange}
              error={errors?.avatar?.message}
            />
          )} />
        <AppInputPhone
          control={control}
          name="phone"
          placeholder={t('placeholderPhone')}
          error={errors.phone?.number?.message}

        />
        <AppInput
          control={control}
          name="fullname"
          placeholder={t('name')}
          error={errors.fullname?.message} />

        <AppDate
          control={control}
          name="birthday"
          placeholder={t('birthday')}
          error={errors.birthday?.message}
        />
        <AppInputDropdown
          control={control}
          name={'gender'}
          data={gender}
          placeholder={t('selectGender')}
        />
        <AppInputDropdown
          control={control}
          name={'rel_status'}
          data={relStatus}
          placeholder={t('selectRelStatus')}
        />

        <AppInput
          control={control}
          name="about_me"
          placeholder={t('about_me')}
          error={errors.about_me?.message} />
        <AppInputSocial
          control={control}
          name="zalo"
          placeholder={t('dating.socialMediaUsername')}
          error={errors.zalo?.message}
          baseUrl="https://zalo.me/" // Add baseUrl prop
        />
        <AppInputSocial
          control={control}
          name="facebook"
          placeholder={t('dating.socialMediaUsername')}
          error={errors.facebook?.message}
          baseUrl="https://facebook.com/" // Add baseUrl prop
        />
        <AppInputSocial
          control={control}
          name="instagram"
          placeholder={t('dating.socialMediaUsername')}
          error={errors.instagram?.message}
          baseUrl="https://instagram.com/" // Add baseUrl prop
        />
        <AppInputDropdown
          control={control}
          name={'job'}
          data={jobs.map((item) => ({ label: item.name, value: item.id?.toString() }))}
          placeholder={t('selectJob')}
        />
        <Controller
          control={control}
          name="galleries"
          render={({ field: { onChange, value } }) => (
            <View
              onLayout={event => handleFieldLayout('galleries', event.nativeEvent.layout)}>
              <UploadListImage
                label={t('dating.libraryImage')}
                list={value || []}
                onUploadImage={onChange}
                error={errors?.galleries?.message}
              />
            </View>
          )} />

      </KeyboardAwareScrollView>
      <View style={styles.bottom}>
        <AppButton style={styles.btn} label={t('next')} onPress={() => {
          handleFormSubmit(); // Use handleFormSubmit here
        }} />
      </View>
    </View>
  );
};
