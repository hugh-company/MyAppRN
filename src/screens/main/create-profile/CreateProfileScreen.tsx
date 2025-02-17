import { AppButton, AppDate, AppHeader, AppInput, AppInputDropdown, AppInputPhone, AppText, UploadImage, UploadListImage } from '@components';
import { genderInterface } from '@types';
import { t } from 'i18next';
import React from 'react';
import { Controller } from 'react-hook-form';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useCreateProfileScreen } from './CreateProfileScreen.hook';
import { styles } from './styles';

export const CreateProfileScreen = () => {
  const { control, errors, onSubmit, jobs } = useCreateProfileScreen();
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

  return (
    <View style={styles.container}>
      <AppHeader />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={styles.body} >
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
        <AppInputDropdown
          control={control}
          name={'job'}
          data={jobs.map((item) => ({ label: item.name, value: item.id?.toString() }))}
          placeholder={t('selectJob')}
        />
        <AppInput
          control={control}
          name="about_me"
          placeholder={t('about_me')}
          error={errors.about_me?.message} />
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
        <Controller
          control={control}
          name="galleries"
          render={({ field: { onChange, value } }) => (
            <UploadListImage
              label={t('dating.libraryImage')}
              list={value || []}
              onUploadImage={onChange}
              error={errors?.galleries?.message}
            />
          )} />

      </KeyboardAwareScrollView>
      <View style={styles.bottom}>
        <AppButton style={styles.btn} label={t('next')} onPress={() => {
          onSubmit();
        }} />
      </View>
    </View>
  );
};
