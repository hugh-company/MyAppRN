import { Colors, FontSize, FontWithFamily, Spacing } from '@theme';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { AppText } from '../AppText';
import { RunTime } from '../RunTime/RunTime';

interface AppInputVerifyCodeProps {
  label?: string;
  labelStyle?: StyleProp<ViewStyle>;
  handleOtpChange: (otp: string) => void;
  onSubmit?: () => void;
  inputCount?: number;
  time?: number;
  onFinish?: () => void;
  onStart?: () => void;
  style?: StyleProp<ViewStyle>;
  value?: string;
  onChangeText?: (text: string) => void;
  maxLength?: number;

}
export const AppInputVerifyCode = ({ handleOtpChange, labelStyle, label, inputCount = 6, time = 30000, onFinish, onStart, onReset, style, value, onChangeText, maxLength }: AppInputVerifyCodeProps) => {
  return (
    <View style={[styles.container, style]} >
      {label && <AppText style={[styles.label, labelStyle]}>{label}</AppText>}

      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Nhập mã OTP" keyboardType="number-pad" value={value} onChangeText={onChangeText} maxLength={maxLength} />
        <RunTime time={30000} style={styles.runTime} onFinish={() => { }} onStart={() => { }} onReset={() => { }} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({

  container: {
    marginBottom: Spacing.height16,
  },
  label: {
    fontSize: FontSize.FontSize14,
    ...FontWithFamily.FontWithFamily_400,

    marginBottom: Spacing.height4,
  },
  inputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: Colors.border,
  },
  input: {
    height: Spacing.height48,
    width: '70%',

    paddingHorizontal: Spacing.width12,
    fontSize: FontSize.FontSize14,
    color: Colors.text,

  },
  inputError: {
    borderColor: Colors.error,
  },
  error: {
    color: Colors.error,
    fontSize: FontSize.FontSize12,
    marginTop: Spacing.height8,
  },
  iconContainer: {
    position: 'absolute',
    right: Spacing.width12,
    height: '100%',
    justifyContent: 'center',

  },
  otpInput: {

    height: Spacing.width12,
    width: Spacing.width12,
    borderRadius: Spacing.width12,
    backgroundColor: Colors.black,

    textAlign: 'center',
  },
  runTime: {
    width: '30%',
  },
});


export default AppInputVerifyCode;


