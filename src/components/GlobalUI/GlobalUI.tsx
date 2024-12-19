import { Spacing, WidthScreen } from '@theme';
import React, { useImperativeHandle, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Loading } from './Loading';


type optionsType = {
  isAlert?: boolean;
  title?: string;
  message?: string;
  onPress?: () => void;
};

type optionsAlert = {
  title?: string;
  message: string;
  onPress?: () => void;
};

export type TYPE_REF_LOADING_GLOBAL = {
  showLoading: () => void;
  hideLoading: () => void;
  showAlert: (options: optionsAlert) => void;
  hideAlert: () => void;
};

export const GlobalUI = React.forwardRef((props, ref) => {
  const [isLoading, setLoading] = useState(false);
  const [options, setOptions] = useState<optionsType>({ isAlert: false });


  useImperativeHandle(
    ref,
    () => ({
      showLoading,
      hideLoading,
      showAlert,
      hideAlert,
    }),
    [],
  );

  const showLoading = () => {
    console.log('asdasd');

    setLoading(true);
  };

  const hideLoading = () => {
    setLoading(false);
  };

  const showAlert = (values: optionsAlert) => {
    setOptions({
      isAlert: true,
      ...values,
    });
  };
  const hideAlert = () => {
    setOptions({
      isAlert: false,
    });
  };


  return (
    <>
      <Loading isLoading={isLoading} />
    </>
  );
});

const styles = StyleSheet.create({
  title: { textAlign: 'center', fontSize: 18, fontWeight: '500', color: '#000' },
  message: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 16,
    marginTop: Spacing.width20 / 2,
    marginBottom: Spacing.width20,
    color: '#000',
  },
  container: {
    padding: Spacing.width20,
    backgroundColor: 'white',
    width: WidthScreen - Spacing.width40,
    borderRadius: 12,
    borderColor: '#000',
    borderWidth: 0.5,
  },
  btn: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  btnCancel: { flex: 1, marginRight: Spacing.width20 },
  styleMargin: { margin: 0 },
  btn2: { flex: 1 },
});
export default GlobalUI;

