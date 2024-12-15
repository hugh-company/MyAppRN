import { AppButton, AppInput, AppText, ContainerAuth } from '@components';
import React from 'react';
import { useSetupInfoUser } from './SetupInfoUser.hook';
import { styles } from './styles';

const SetupInfoUser = () => {
  const { control, handleSubmit, errors, onSubmit, name } = useSetupInfoUser();
  return (
    <ContainerAuth style={styles.container}>
      <AppText style={styles.title}>Xin Ba/mẹ cho biết quý danh</AppText>
      <AppInput
        label="Tên *"
        placeholder="Ký tự latinh không emoji/ký hiệu"
        control={control}
        name="name"
        error={errors.name?.message}
      />
      {name && <AppInput
        label="Email *"
        placeholder="1234567@gmail.com"
        control={control}
        name="email"
        error={errors.email?.message}
      />}
      <AppButton title="Lưu" style={styles.button} onPress={handleSubmit(onSubmit)} />
    </ContainerAuth>
  );
};

export default SetupInfoUser;
