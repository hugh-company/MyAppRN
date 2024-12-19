import {DeviceEventEmitter} from 'react-native';

// modal confirmation
// event listener\
export interface ModalConfirmationProps {
  visible: boolean;
  title: string;
  message: string;
  icon: 'close' | 'delete' | 'confirm' | 'logout';
  onConfirm?: () => void;
  onCancel?: () => void;
}
export const showModalConfirmation = ({
  visible,
  title,
  message,
  icon,
  onConfirm,
  onCancel,
}: ModalConfirmationProps) => {
  DeviceEventEmitter.emit('showModalConfirmation', {
    visible,
    title,
    message,
    icon,
    onConfirm,
    onCancel,
  });
};
// modal change language
export const showModalLanguage = (visible: boolean) => {
  DeviceEventEmitter.emit('showModalChangeLanguage', {
    visible,
  });
};
