import { AppButton, AppDate, AppHeader, AppInput, AppInputDropdown, AppInputPhone, AppText, UploadImage } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { t } from 'i18next';
import React from 'react';
import { Controller } from 'react-hook-form';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useCreateProfileScreen } from './CreateProfileScreen.hook';

const CreateProfileScreen = () => {
  const { data, themeColors, styles, control, errors, onSubmit } = useCreateProfileScreen();
  const gender = [
    {
      label: t('male'),
      value: 'male',
    },
    {
      label: t('girl'),
      value: 'girl',
    },
    {
      label: t('allGender'),
      value: 'all',
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
        <AppButton style={styles.btn} label={t('next')} onPress={() => {
          navigate(SCREEN_ROUTE.SETTING_FAVORITE);
          // onSubmit();
        }} />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default CreateProfileScreen;
