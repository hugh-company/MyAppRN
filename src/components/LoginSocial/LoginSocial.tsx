import { FacebookIcon, GoogleIcon } from '@assets';
import appleAuth from '@invertase/react-native-apple-authentication';
import { Spacing, useTheme } from '@theme';
import { t } from 'i18next';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import { AppText } from '../AppText';
import { createStyles } from './styles';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { setToken, setUserInfo } from '@redux';
import { loginGoogleApi, UserLoginGoogleInterface } from '@services';
import { showNotificationSuccess } from '@utils';
import { useDispatch } from 'react-redux';
import { GlobalService } from '../GlobalUI';
export interface LoginSocialProps {
  isTopOr?: boolean
}
const LoginSocial = ({ isTopOr }: LoginSocialProps) => {
  const { themeColors } = useTheme();
  const dispatch = useDispatch();

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
    // {
    //   icon: <AppleIcon />,
    //   title: 'Apple',
    //   onPress: () => onLoginApple(),
    // },
  ];
  const styles = createStyles(themeColors);


  const onLoginGoogle = async () => {
    try {

      GlobalService.showLoading();
      await GoogleSignin.hasPlayServices();
      const userInfo: any = await GoogleSignin.signIn();
      console.log('Google Sign-In Success:', userInfo);
      const params = {
        idToken: userInfo?.data?.idToken,
        user: userInfo?.data?.user,
      };
      GlobalService.hideLoading();
      // callApiLoginGoogle(params);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    } finally {
      GlobalService.hideLoading();
    }
  };

  const callApiLoginGoogle = async (params: UserLoginGoogleInterface) => {
    try {
      console.log({ params });

      const response = await loginGoogleApi(params);
      console.log({ response }, response.data.access_token);
      showNotificationSuccess(t('login.loginSuccess'), response?.message);
      dispatch(setToken(response?.data?.access_token));
      dispatch(setUserInfo(response?.data?.me));
    } catch (error) {
      console.log({ error });

    } finally {
      GlobalService.hideLoading();
    }
  };
  const logoutGoogle = async () => {
    await GoogleSignin.signOut();
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
