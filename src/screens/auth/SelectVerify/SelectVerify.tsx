import { IconRight, ImageZalo, MessageIcon } from '@assets';
import { AppImage, AppText, ContainerAuth } from '@components';
import { VerifyCodeType } from '@constants';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { useRoute } from '@react-navigation/native';
import { Colors, Spacing } from '@theme';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

const SelectVerify = () => {
  const { phone } = useRoute().params;
  const btnSelectVerify = [
    {
      title: 'Nhập mã qua SMS',
      style: styles.btnVerify,
      icon: <MessageIcon size={Spacing.width24} color={Colors.link} />,
      onPress: () => navigate(SCREEN_ROUTE.VERIFY_CODE, { type: VerifyCodeType.SMS, phone }),
    },
    {
      title: 'Xác thực bằng email',
      style: styles.btnVerify,
      icon: <AppImage defaultSource={ImageZalo} style={styles.imgZalo} />,
      onPress: () => navigate(SCREEN_ROUTE.VERIFY_CODE, { type: VerifyCodeType.EMAIL, phone }),
    },
  ];

  return (
    <ContainerAuth style={styles.container} title="Chọn phương thức xác thực" >
      <View style={styles.containerBtn}>
        {btnSelectVerify.map((item, index) => (
          <TouchableOpacity key={index} style={item.style} onPress={item.onPress}>
            <View style={styles.infoVerify}>
              {item.icon}
              <AppText style={styles.txtVerify}>{item.title}</AppText>
            </View>
            <IconRight size={Spacing.width24} fill={Colors.border} />
          </TouchableOpacity>
        ))}
      </View>
    </ContainerAuth>
  );
};

export default SelectVerify;
