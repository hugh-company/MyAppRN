import {DeviceEventEmitter} from 'react-native';

export const showModalChapter = (visible: boolean, data: any[] | string) => {
  DeviceEventEmitter.emit('showModalChapter', {
    visible,
    data,
  });
};
