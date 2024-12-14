import { AppImage, AppText } from '@components';
import { Colors, FontSize, FontWithFamily, Shadow, Spacing } from '@theme';
import { ItemTaskInterface } from '@types';
import { getBackgroundTask, getDateToday, getPriorityTask, getStatusTask } from '@utils';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface ItemTaskProps {
  task: ItemTaskInterface;

  onDetail: () => void;
}
export const ItemTask = ({ task, onDetail }: ItemTaskProps) => {
  const status = getStatusTask(task.status);
  const priority = getPriorityTask(task.priority);

  return (
    <TouchableOpacity onPress={onDetail} activeOpacity={1} style={styles.container}>
      {task.background && <AppImage style={styles.background} defaultSource={getBackgroundTask(task.background)} />}
      <View style={[task.background ? styles.body : styles.bodyNoBackground]}>
        <View style={styles.header}>

          <View style={styles.viewTitle}>
            <AppText style={styles.title} numberOfLines={2}>{task.title}</AppText>
          </View>
          <View style={styles.viewStatus}>
            <AppText style={styles.txtStatus}>{status?.title}</AppText>
          </View>

        </View>

        <View style={styles.viewInfoTask}>
          {priority && (
            <View style={[styles.priority, {
              borderColor: priority?.color,

            }]}>
              <AppText style={[styles.priorityText, { color: priority?.color }]}>
                {priority?.title}
              </AppText>
            </View>
          )}

          {task.deadline && (
            <View style={styles.deadline}>
              <AppText style={[styles.deadlineText]}>{getDateToday(task.deadline)}</AppText>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>

  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,

    ...Shadow.normal,
    overflow: 'hidden',
    borderBottomLeftRadius: Spacing.width16,
    borderTopLeftRadius: Spacing.width16,

    width: '99%',
  },
  background: {
    height: Spacing.height150,
    width: '100%',
  },
  bodyNoBackground: {

    backgroundColor: Colors.white,
    position: 'relative',
    paddingHorizontal: Spacing.width16,
    paddingVertical: Spacing.height16,
  },
  body: {
    backgroundColor: Colors.backgroundShadowWhite,
    position: 'absolute',

    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: Spacing.width16,
    paddingVertical: Spacing.height16,
  },
  viewTitle: {
    flex: 1,
    justifyContent: 'center',

  },
  title: {

    fontSize: FontSize.FontSize16,
    ...FontWithFamily.FontWithFamily_600,

  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  status: {
    backgroundColor: Colors.info,
    padding: Spacing.width8,
    borderRadius: Spacing.width8,
    borderWidth: 1,
  },
  deadline: {

    padding: Spacing.width8,
    borderRadius: Spacing.width8,
  },
  priority: {

    borderRadius: Spacing.width8,
  },
  viewInfoTask: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.width8,
  },
  iconEdit: {
    position: 'absolute',
    top: -Spacing.width12,
    right: -Spacing.width12,
    backgroundColor: Colors.white,
    borderRadius: Spacing.width16,
    padding: Spacing.width8,
    ...Shadow.normal,
  },
  deadlineText: {
    fontSize: FontSize.FontSize10,
    ...FontWithFamily.FontWithFamily_400,
    color: Colors.black,
  },
  txtStatus: {
    fontSize: FontSize.FontSize12,
    ...FontWithFamily.FontWithFamily_600,
    color: Colors.white,
  },

  priorityText: {
    fontSize: FontSize.FontSize12,
    ...FontWithFamily.FontWithFamily_600,
  },
  viewStatus: {
    backgroundColor: Colors.info,
    padding: Spacing.width8,
    borderRadius: Spacing.width8,
    borderWidth: 1,
  },

  hiddenButtons: {
    position: 'absolute',
    right: 0,
    height: 60,
    width: 150,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  hiddenButton: {
    width: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hiddenButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
