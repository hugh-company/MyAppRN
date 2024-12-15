import { CloseIcon, IconVietNam } from '@assets';
import { Colors, FontSize, FontWithFamily, Spacing } from '@theme';
import React, { forwardRef } from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { AppText } from '../AppText';

interface AppInputPhoneDefaultProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  value?: string;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;

}

const AppInputPhoneDefault = forwardRef<TextInput, AppInputPhoneDefaultProps>((props, ref) => {
  const {
    label,
    error,
    containerStyle,
    style,
    value,
    labelStyle,
    errorStyle,

    onChangeText,
    ...inputProps
  } = props;


  return (
    <View style={[styles.container, containerStyle]}>
      {label && <AppText style={[styles.label, labelStyle]}>{label}</AppText>}
      <View style={styles.inputContainer}>
        <View style={styles.inputCode}>
          <IconVietNam width={Spacing.height16} height={Spacing.height16} />
          <AppText style={styles.inputCodeText}>+84</AppText>
        </View>
        <TextInput
          ref={ref}
          style={[
            styles.input,
            value && { paddingRight: Spacing.width45 },
            style,
            error ? styles.inputError : null,
          ]}
          placeholderTextColor={Colors.placeholder}
          {...inputProps}
          onChangeText={onChangeText}
          value={value}
        />
        {value && <TouchableOpacity style={styles.btnClearValue} onPress={() => {

          onChangeText?.('');
        }}>
          <CloseIcon />
        </TouchableOpacity>}

      </View>
      {error && <AppText style={[styles.error, errorStyle]}>{error}</AppText>}
    </View>
  );
});

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
    flexDirection: 'row',
    alignItems: 'center',



  },
  input: {
    height: Spacing.height48,
    borderBottomWidth: 2,
    borderBottomColor: Colors.border,
    flex: 1,
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
  inputCode: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.width8,
    backgroundColor: Colors.border,
    paddingHorizontal: Spacing.width12,
    paddingVertical: Spacing.height8,
    borderRadius: Spacing.width18,
  },
  inputCodeText: {
    fontSize: FontSize.FontSize10,
    color: Colors.text,
  },
  btnClearValue: {
    position: 'absolute',
    right: Spacing.width12,
    height: '100%',
    justifyContent: 'center',
  },
});


export default AppInputPhoneDefault;


