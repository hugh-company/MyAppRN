import { CloseIcon, DeleteIcon } from '@assets';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme, WidthScreen } from '@theme';
import { ModalConfirmationProps } from '@utils';
import React, { useEffect, useMemo, useState } from 'react';
import { DeviceEventEmitter, StyleSheet, View } from 'react-native';
import { Modal, ModalContent } from 'react-native-modals';
import { AppButton } from '../AppButton';
import { AppText } from '../AppText';


export const ModalConfirmation = () => {
  const [infoConfirmation, setInfoConfirmation] = useState<ModalConfirmationProps | null>(null);
  const { themeColors } = useTheme();
  const getStyle = useMemo(() => createStyles(themeColors), [themeColors]);
  useEffect(() => {
    DeviceEventEmitter.addListener('showModalConfirmation', (data) => {
      setInfoConfirmation(data);
    });
  }, []);
  const getIcon = () => {
    switch (infoConfirmation?.icon) {
      case 'close':
        return <CloseIcon size={Spacing.width100} />;
      case 'delete':
        return <DeleteIcon width={Spacing.width30} height={Spacing.width30} />;
      case 'confirm':
        return <DeleteIcon />;
    }
  };
  const onCancel = () => {
    infoConfirmation?.onCancel?.();
    setInfoConfirmation(null);
  };
  const onConfirm = () => {
    infoConfirmation?.onConfirm?.();
    setInfoConfirmation(null);
  };
  return (
    <Modal
      visible={infoConfirmation?.visible}
      onTouchOutside={onCancel}
      onSwipeOut={onCancel}

    >
      <ModalContent style={getStyle.container}>
        {getIcon()}
        <AppText style={getStyle.title}>{infoConfirmation?.title}</AppText>
        {infoConfirmation?.message && <AppText style={getStyle.description}>{infoConfirmation?.message}</AppText>}
        <View style={getStyle.viewAction}>
          <AppButton label={'Cancel'} onPress={onCancel} style={getStyle.btnCancel} />
          <AppButton label={'Confirm'} onPress={onConfirm} style={getStyle.btnConfirm} />
        </View>
      </ModalContent>
    </Modal>
  );
};
const createStyles = (themeColors: ThemeColors) => StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: WidthScreen / 1.2,

  },
  title: {
    fontSize: FontSize.FontSize16,

    color: themeColors.text,
    ...FontWithFamily.FontWithFamily_600,
    width: '70%',
    textAlign: 'center',
    marginTop: Spacing.width16,
  },
  description: {
    fontSize: FontSize.FontSize14,
    color: themeColors.text,
    ...FontWithFamily.FontWithFamily_400,
    width: '90%',
    textAlign: 'center',
    marginTop: Spacing.width12,
  },
  viewAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: Spacing.width16,
    gap: Spacing.width16,
  },
  btnCancel: {
    backgroundColor: themeColors.buttonCancel,
    flex: 1,
    borderRadius: Spacing.width8,
  },
  btnConfirm: {
    backgroundColor: themeColors.buttonConfirm,
    flex: 1,
    borderRadius: Spacing.width8,
  },
});
export default ModalConfirmation;
