import { AppButton, AppHeader, AppInput, AppText } from '@components';
import { t } from 'i18next';
import React from 'react';
import { View } from 'react-native';
import { useForgotScreen } from './ForgotScreen.hook';

const ForgotScreen = () => {
  const { data, themeColors, styles,
    onSubmit,
    control,
    errors,
    loading,
  } = useForgotScreen();

  return (
    <View style={styles.container}>
      <AppHeader title={t('forgot.title')} isBackground />
      <AppText style={styles.txtDescription}>
        {t('forgot.description')}
      </AppText>
      <View style={styles.body}>
        <AppInput
          name="email"
          placeholder={t('login.email')}
          error={errors.email?.message}
          control={control}
          keyboardType={'email-address'}
          autoCapitalize="none"

        />
        <AppButton loading={loading} onPress={() => onSubmit()} label={t('login.title')} />
      </View>
    </View>
  );
};

export default ForgotScreen;
