import { CloseIcon, DeleteIcon, LogoutIcon } from '@assets';
import { FontSize, FontWithFamily, HeightScreen, Spacing, ThemeColors, useTheme, WidthScreen } from '@theme';
import { ModalConfirmationProps } from '@utils';
import { t } from 'i18next';
import React, { useEffect, useMemo, useState } from 'react';
import { DeviceEventEmitter, Modal, StyleSheet, View } from 'react-native'; // Updated import
import { AppButton } from '../AppButton';
import { AppText } from '../AppText';

export const ModalConfirmation = () => {
  const [infoConfirmation, setInfoConfirmation] = useState<ModalConfirmationProps | null>(null);
  const { themeColors } = useTheme();
  const getStyle = useMemo(() => createStyles(themeColors), [themeColors]);

  const onCancel = () => {
    console.log('onCancel');

    infoConfirmation?.onCancel?.();
    setInfoConfirmation(null);
  };

  useEffect(() => {
    DeviceEventEmitter.addListener('showModalConfirmation', (data) => {
      console.log({ data });

      setInfoConfirmation(data);
    });
    return () => {
      DeviceEventEmitter.removeAllListeners('showModalConfirmation');
    };
  }, [infoConfirmation]);

  const getIcon = () => {
    switch (infoConfirmation?.icon) {
      case 'close':
        return <CloseIcon size={Spacing.width100} />;
      case 'delete':
        return <DeleteIcon width={Spacing.width30} height={Spacing.width30} />;
      case 'confirm':
        return <DeleteIcon />;
      case 'logout':
        return <LogoutIcon size={Spacing.width72} color={themeColors.primary} />;
      default:
        return null;
    }
  };

  const onConfirm = () => {
    infoConfirmation?.onConfirm?.();
    setInfoConfirmation(null);
  };

  return (
    <Modal
      visible={infoConfirmation === null ? false : infoConfirmation?.visible}
      onRequestClose={onCancel}
      animationType="slide"
      transparent={true}
      backdropColor={
        'rgba(0, 0, 0, 0.5)' // Optional: to add a semi-transparent background
      }
    >
      <View style={getStyle.modalBackground}>
        <View style={getStyle.container}>
          {getIcon()}
          <AppText style={getStyle.title}>{infoConfirmation?.title}</AppText>
          {infoConfirmation?.message && <AppText style={getStyle.description}>{infoConfirmation?.message}</AppText>}
          <View style={getStyle.viewAction}>
            <AppButton label={t('cancel')} onPressIn={() => onCancel()} style={getStyle.btnCancel} />
            <AppButton label={t('confirm')} onPressIn={() => onConfirm()} style={getStyle.btnConfirm} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const createStyles = (themeColors: ThemeColors) => StyleSheet.create({
  modalBackground: {

    width: WidthScreen,
    height: HeightScreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeColors.background,
    width: WidthScreen / 1.2,
    padding: Spacing.width16,
    borderRadius: Spacing.width8,
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
    zIndex: 1000,
  },
  btnConfirm: {
    backgroundColor: themeColors.buttonConfirm,
    flex: 1,
    borderRadius: Spacing.width8,
  },
});
export default ModalConfirmation;
