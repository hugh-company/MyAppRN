import { AppText, ContainerAuth } from '@components';
import React from 'react';

const SupportVerifyCode = () => {
  const data = [
    {
      title: 'Tôi không nhận được mã OTP',
      description: 'Mã OTP đã được gửi đến số điện thoại của bạn',
    },
    {
      title: 'Số điện thoại không tồn tại',
      description: 'Số điện thoại không tồn tại',
    },
  ];
  return (
    <ContainerAuth title="Nhập mã OTP được gửi qua SMS" >
      <AppText>Mã OTP đã được gửi đến số điện thoại của bạn</AppText>
    </ContainerAuth>
  );
};

export default SupportVerifyCode;
