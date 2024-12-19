import { AppleIcon, FacebookIcon, GoogleIcon } from '@assets';
import appleAuth from '@invertase/react-native-apple-authentication';
import { Spacing, useTheme } from '@theme';
import { t } from 'i18next';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import { AppText } from '../AppText';
import { createStyles } from './styles';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
GoogleSignin.configure({
  webClientId: '215589107688-hn52i6mnr89rfo4ov57bsqlibljo5iut.apps.googleusercontent.com',
});

export interface LoginSocialProps {
  isTopOr?: boolean
}
const LoginSocial = ({ isTopOr }: LoginSocialProps) => {
  const { themeColors } = useTheme();
  const menuLogin = [
    {
      icon: <GoogleIcon />,
      title: 'Google',
      onPress: () => onLoginGoogle(),
    },
    {
      icon: <FacebookIcon />,
      title: 'Facebook',
      onPress: () => onLoginFacebook(),
    },
    {
      icon: <AppleIcon />,
      title: 'Apple',
      onPress: () => onLoginApple(),
    },
  ];
  const styles = createStyles(themeColors);

  const onLoginGoogle = async () => {
    try {

      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('Google Sign-In Success:', userInfo);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };
  const onLoginApple = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      const { identityToken, email } = appleAuthRequestResponse;

      if (identityToken) {
        console.log('Apple Sign-In Successful:', email);
      } else {
        console.error('Apple Sign-In Failed');
      }
    } catch (error) {

    }
  };
  const onLoginFacebook = async () => {
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      if (!result.isCancelled) {
        const data: any = await AccessToken.getCurrentAccessToken();
        console.log('Facebook Access Token:', data.accessToken.toString());
      }
    } catch (error) {
      console.log({ error });

    }
  };
  return (
    <View style={styles.container}>
      {isTopOr && <View style={styles.viewOr}>
        <View style={styles.viewLine} />
        <AppText>{t('login.or')}</AppText>
        <View style={styles.viewLine} />
      </View>}
      <View style={[styles.viewIcon, isTopOr ? { marginTop: Spacing.width16 } : { marginBottom: Spacing.width16 }]}>
        {menuLogin.map((item) => {
          return <TouchableOpacity onPress={item?.onPress} key={item.title} style={styles.btn} >
            {item.icon}
          </TouchableOpacity>;
        })}
      </View>
      {!isTopOr && <View style={styles.viewOr}>
        <View style={styles.viewLine} />
        <AppText>{t('login.or')}</AppText>
        <View style={styles.viewLine} />
      </View>}
    </View>
  );
};

export default LoginSocial;
