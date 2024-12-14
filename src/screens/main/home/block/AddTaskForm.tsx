import { CloseIcon, DeleteIcon } from '@assets';
import { AppButton, AppInput, AppInputDate, AppInputDropdown, AppText, ImagePicker } from '@components';
import { zodResolver } from '@hookform/resolvers/zod';
import { Colors, FontSize, FontWithFamily, Spacing } from '@theme';
import { ItemTaskInterface, TaskColor } from '@types';
import { showModalConfirmation, statusTask } from '@utils';
import { TaskFormData, taskSchema } from '@validations';
import { t } from 'i18next';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BottomModal, ModalContent } from 'react-native-modals';
import { BackgroundTask } from './BackgroundTask';
import { PriorityPicker } from './PriorityPicker';


interface AddTaskFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (task: TaskFormData) => void;
  onUpdate?: (task: TaskFormData) => void;
  task?: ItemTaskInterface | null
  onDelete?: (id: string) => void;
}

const defaultTask = {
  title: '',
  description: '',
  status: 'todo',
  priority: 'low',
  color: 'white' as TaskColor,
  deadline: new Date().toISOString(),
  images: [],
  background: '',
};
export const AddTaskForm = ({ visible, onClose, onSubmit, task, onDelete, onUpdate }: AddTaskFormProps) => {


  const { control, handleSubmit, formState: { errors }, reset } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: defaultTask,
  });



  useEffect(() => {

    if (task) {

      reset(
        {
          title: task.title,
          description: task.description,
          deadline: task.deadline,
          priority: task.priority,
          color: task.color,
          images: task.images,
          background: task.background,

        }
      );
    } else {
      reset(
        defaultTask
      );
    }
  }, [task]);


  const onSubmitForm = (data: TaskFormData) => {
    onClose();
    if (task) {
      onUpdate?.({
        ...data,
        id: task.id,
      });
    } else {
      onSubmit(data);
    }
    reset();
  };


  return (
    <BottomModal
      visible={visible}
      onTouchOutside={onClose}
      onSwipeOut={onClose}
      height={0.9}
      width={1}
    >
      <ModalContent style={styles.modal}>

        <View style={styles.header}>
          <AppText style={styles.title}>{t('home.add_task_title')}</AppText>
          <TouchableOpacity style={styles.iconClose} onPress={onClose}>
            <CloseIcon size={24} />
          </TouchableOpacity>
        </View>



        <KeyboardAwareScrollView style={styles.form} showsVerticalScrollIndicator={false}>

          <Controller
            control={control}
            name="background"
            render={({ field: { onChange, value } }) => (
              <BackgroundTask
                uri={value}
                onChange={onChange}
              />
            )}
          />
          <AppInput
            label={t('form.name')}
            name="title"
            placeholder={t('form.name')}
            control={control}
            error={errors.title?.message}
          />
          <AppInputDropdown
            data={statusTask}
            name="status"
            control={control}
            label={t('home.status')}
            error={errors.status?.message}
            placeholder={t('home.status')}

          />
          <AppInput
            style={styles.descriptionInput}
            placeholder={t('form.description')}
            control={control}
            label={t('home.description')}
            error={errors.title?.message}
            multiline
          />
          <Controller
            control={control}
            name="deadline"
            render={({ field: { onChange, value } }) => (
              <AppInputDate
                label={t('form.deadline')}
                value={value}
                onChange={onChange}
                error={errors.deadline?.message}
              />
            )}
          />



          <Controller
            control={control}
            name="priority"
            render={({ field: { onChange, value } }) => (
              <PriorityPicker
                value={value}
                onChange={onChange}
                error={errors.priority?.message}
              />
            )}
          />



          <Controller
            control={control}
            name="images"
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputContainer}>
                <AppText style={styles.label}>{t('form.images')}</AppText>
                <ImagePicker
                  images={value}
                  onChange={onChange}
                  error={errors.images?.message}
                />
              </View>
            )}
          />




        </KeyboardAwareScrollView>
        <View style={styles.buttons}>
          <AppButton
            title={task ? undefined : t('form.cancel')}
            onPress={task ? () => {
              showModalConfirmation({
                visible: true,
                title: t('form.titleDelete'),
                message: t('form.messageDelete'),
                icon: 'delete',
                onConfirm: () => {
                  onDelete?.(task?.id);
                  onClose();
                },
              });
            } : onClose}
            variant={task ? 'delete' : 'cancel'}
            leftIcon={task ? <DeleteIcon color={Colors.txtDelete} /> : undefined}
            style={task ? styles.btnDelete : styles.cancelButton}
          />
          <AppButton
            title={task ? t('form.edit') : t('form.add')}
            onPress={handleSubmit(onSubmitForm)}
            style={styles.submitButton}
          />
        </View>
      </ModalContent>


    </BottomModal >
  );
};

const styles = StyleSheet.create({

  modal: {
    flex: 1,

  },
  content: {
    // backgroundColor: Colors.white,

  },
  form: {
  },
  header: {
    flexDirection: 'row',
    paddingBottom: Spacing.height8,
  },
  iconClose: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  title: {
    flex: 1,
    fontSize: FontSize.FontSize18,
    ...FontWithFamily.FontWithFamily_600,
    textAlign: 'center',
  },

  descriptionInput: {
    height: Spacing.height100,
    paddingVertical: Spacing.height8,
    textAlignVertical: 'top',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: Spacing.width8,
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
    backgroundColor: Colors.buttonCancel,
    borderRadius: Spacing.width8,
  },
  btnDelete: {
    backgroundColor: Colors.buttonDelete,
    borderRadius: Spacing.width8,
  },
  txtButtonDelete: {
    color: Colors.txtDelete,
  },
  submitButton: {
    flex: 1,

    borderRadius: Spacing.width8,
  },
  errorText: {
    color: Colors.red,
    fontSize: 12,
    marginTop: -8,
    marginBottom: 8,
  },
  viewStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  itemStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: Colors.text,
  },
  backgroundTask: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: Spacing.height150,
  },
  backgroundImage: {
    flex: 1,
    height: '100%',
    backgroundColor: 'red',
    width: '100%',
  },
});

