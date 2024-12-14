import { DeleteIcon, PenIcon } from '@assets';
import { Colors, Spacing } from '@theme';
import { showModalConfirmation } from '@utils';
import { t } from 'i18next';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface ItemOptionProps {

  onEdit: () => void;
  onDelete: () => void;
}
export const ItemOption = ({ onEdit, onDelete }: ItemOptionProps) => {
  const handleDelete = () => {
    showModalConfirmation({
      visible: true,
      title: t('form.titleDelete'),
      message: t('form.messageDelete'),
      icon: 'delete',
      onConfirm: () => {
        onDelete();
      },
    });

  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={onEdit}>
        <PenIcon color={Colors.white} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={handleDelete}>
        <DeleteIcon color={Colors.white} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {


    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'red',
    flexDirection: 'row',
    width: '50%',
    height: '100%',
    alignSelf: 'flex-end',
  },
  btn: {
    width: Spacing.width50,
    height: Spacing.height50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
