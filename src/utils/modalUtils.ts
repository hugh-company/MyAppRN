import {DeviceEventEmitter} from 'react-native';

// modal confirmation
// event listener\
export interface ModalConfirmationProps {
  visible: boolean;
  title: string;
  message: string;
  icon: 'close' | 'delete' | 'confirm';
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
