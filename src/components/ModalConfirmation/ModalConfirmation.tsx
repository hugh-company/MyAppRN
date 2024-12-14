import { CloseIcon, DeleteIcon } from '@assets';
import { Colors, FontSize, FontWithFamily, Spacing, WidthScreen } from '@theme';
import { ModalConfirmationProps } from '@utils';
import React, { useEffect, useState } from 'react';
import { DeviceEventEmitter, StyleSheet, View } from 'react-native';
import { Modal, ModalContent } from 'react-native-modals';
import { AppButton } from '../AppButton';
import { AppText } from '../AppText';


export const ModalConfirmation = () => {
  const [infoConfirmation, setInfoConfirmation] = useState<ModalConfirmationProps | null>(null);

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
      <ModalContent style={styles.container}>
        {getIcon()}
        <AppText style={styles.title}>{infoConfirmation?.title}</AppText>
        {infoConfirmation?.message && <AppText style={styles.description}>{infoConfirmation?.message}</AppText>}
        <View style={styles.viewAction}>
          <AppButton title={'Cancel'} onPress={onCancel} style={styles.btnCancel} />
          <AppButton title={'Confirm'} onPress={onConfirm} style={styles.btnConfirm} />
        </View>
      </ModalContent>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: WidthScreen / 1.2,

  },
  title: {
    fontSize: FontSize.FontSize16,

    color: Colors.black,
    ...FontWithFamily.FontWithFamily_600,
    width: '70%',
    textAlign: 'center',
    marginTop: Spacing.width16,
  },
  description: {
    fontSize: FontSize.FontSize14,
    color: Colors.black,
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
    backgroundColor: Colors.buttonCancel,
    flex: 1,
    borderRadius: Spacing.width8,
  },
  btnConfirm: {
    backgroundColor: Colors.buttonConfirm,
    flex: 1,
    borderRadius: Spacing.width8,
  },
});
export default ModalConfirmation;
