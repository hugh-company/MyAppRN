import { CloseIcon } from '@assets';
import { AppImage, AppText } from '@components';
import { Colors, FontSize, FontWithFamily, Spacing } from '@theme';
import { ItemTaskInterface } from '@types';
import { getBackgroundTask, getDateToday, getPriorityTask, getStatusTask } from '@utils';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { BottomModal, ModalContent } from 'react-native-modals';

interface DetailTaskProps {
  visible: boolean;
  onClose?: () => void;
  task?: ItemTaskInterface | null
}
export const DetailTaskModal = ({ visible, onClose, task }: DetailTaskProps) => {

  console.log({ task });

  if (!task) { return null; }
  const status = getStatusTask(task.status);
  const priority = getPriorityTask(task.priority);
  const background = getBackgroundTask(task.background);
  return (
    <BottomModal
      visible={visible}
      height={0.9}
      onTouchOutside={onClose}
      onSwipeOut={onClose}
      width={1} >
      <ModalContent style={styles.modal} >
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconClose} onPress={onClose}>
            <CloseIcon size={24} />
          </TouchableOpacity>
        </View>
        {task.background && <AppImage style={styles.background} defaultSource={getBackgroundTask(task.background)} />}
        <View style={styles.list}>
          <AppText style={styles.nameTask} >{task.title}</AppText>

          <View style={styles.deadline}>
            <AppText style={[styles.deadlineText]}>{getDateToday(task.deadline)}</AppText>
          </View>

          {task.description && <AppText style={styles.description}>{task.description}</AppText>}
        </View>
      </ModalContent>

    </BottomModal>
  );
};
const styles = StyleSheet.create({
  container: {

  },
  modal: {
    flex: 1,
    paddingHorizontal: 0,
  },
  header: {
    flexDirection: 'row',
    paddingBottom: Spacing.height8,
    paddingHorizontal: Spacing.width16,

  },
  iconClose: {

  },
  title: {
    flex: 1,
    fontSize: FontSize.FontSize18,
    ...FontWithFamily.FontWithFamily_600,
    textAlign: 'center',
  },
  list: {
    paddingHorizontal: Spacing.width16,
    marginTop: Spacing.width16,
  },
  nameTask: {
    fontSize: FontSize.FontSize16,
    ...FontWithFamily.FontWithFamily_600,
  },
  background: {
    width: '100%',
    height: Spacing.height200,
  },
  description: {
    fontSize: FontSize.FontSize16,
    ...FontWithFamily.FontWithFamily_600,
  },
  deadline: {

    padding: Spacing.width8,
    borderRadius: Spacing.width8,
  },
  deadlineText: {
    fontSize: FontSize.FontSize10,
    ...FontWithFamily.FontWithFamily_400,
    color: Colors.black,
  },
});
