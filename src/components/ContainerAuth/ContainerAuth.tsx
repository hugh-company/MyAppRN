import { IconBack, LogoApp, QuestionMarkIcon } from '@assets';
import { goBack, navigate, SCREEN_ROUTE } from '@navigation';
import { Colors, FontSize, FontWithFamily, Spacing } from '@theme';
import React from 'react';
import { KeyboardAvoidingView, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppImage } from '../AppImage';
import { AppText } from '../AppText';

interface ContainerAuthProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  isKeyboardAvoidingView?: boolean;
  title?: string;
  description?: string;
}

const ContainerAuth = ({ children, style, isKeyboardAvoidingView, title, description }: ContainerAuthProps) => {
  const { top } = useSafeAreaInsets();
  const infoTitle = () => {
    return (
      <View>
        <AppText style={styles.title}>{title}</AppText>
        {description && <AppText style={styles.description}>{description}</AppText>}
      </View>
    );
  };
  const renderBodyKeyboardAvoidingView = () => {
    return (
      <KeyboardAvoidingView behavior={isKeyboardAvoidingView ? 'padding' : 'height'} style={style}>
        {infoTitle()}
        <View>{children}</View>
      </KeyboardAvoidingView>
    );
  };
  const renderBody = () => {
    return <View style={[style]}>
      {title && infoTitle()}
      {children}
    </View>;
  };
  return (
    <View style={[styles.container]}>
      <View style={[styles.header, { paddingTop: top }]}>
        <TouchableOpacity onPress={() => {
          goBack();
        }}>
          <IconBack size={Spacing.width24} color={Colors.black} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          navigate(SCREEN_ROUTE.SUPPORT_VERIFY_CODE);
        }}>
          <QuestionMarkIcon size={Spacing.width24} color={Colors.black} />
        </TouchableOpacity>
      </View>
      {isKeyboardAvoidingView ? renderBodyKeyboardAvoidingView() : renderBody()}
      <View style={styles.footer}>
        <AppText style={styles.footerText}>Designed by</AppText>
        <AppImage defaultSource={LogoApp} style={styles.logo} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,

  },
  logo: {
    width: Spacing.width80,
    height: Spacing.height80,
  },
  header: {
    paddingHorizontal: Spacing.width16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: Spacing.height8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  footer: {
    paddingHorizontal: Spacing.width16,
    marginTop: Spacing.height56,
    paddingBottom: Spacing.height16,
    alignItems: 'center',
  },
  footerText: {
    fontSize: FontSize.FontSize10,
    color: Colors.black,
    ...FontWithFamily.FontWithFamily_400,

  },
  title: {
    ...FontWithFamily.FontWithFamily_600,
    fontSize: FontSize.FontSize18,
    color: Colors.primary,
    marginTop: Spacing.height24,
  },
  description: {
    ...FontWithFamily.FontWithFamily_400,
    fontSize: FontSize.FontSize12,
    color: Colors.black,
    marginTop: Spacing.height8,
  },
});
export default ContainerAuth;
