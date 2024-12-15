import { FontSize, FontWithFamily } from '@theme';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { AppText } from '../AppText';

interface RunTimeProps {
  time: number;  // Thời gian ban đầu tính bằng millisecond
  onFinish: () => void; // Callback khi hết thời gian
  onStart?: () => void; // Callback khi bắt đầu
  onReset?: () => void; // Callback khi reset
  style?: StyleProp<ViewStyle>;
}

export const RunTime = ({ time, onFinish, onStart, onReset, style }: RunTimeProps) => {
  const [remainingTime, setRemainingTime] = useState(time); // Giữ thời gian còn lại ở dạng milliseconds
  const [isStarted, setIsStarted] = useState(false); // Kiểm tra nếu timer đã bắt đầu hay chưa

  // Hàm chuyển milliseconds sang định dạng phút:giây
  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  // Hàm xử lý khi hết thời gian
  const handleFinish = useCallback(() => {
    if (remainingTime <= 0) {
      onFinish(); // Gọi hàm onFinish khi hết thời gian
    }
  }, [remainingTime, onFinish]);

  // Hàm xử lý khi timer bắt đầu
  const handleStart = useCallback(() => {
    if (onStart) { onStart(); } // Gọi hàm onStart nếu có
    setIsStarted(true); // Đánh dấu là timer đã bắt đầu
  }, [onStart]);

  // Hàm xử lý reset timer
  const handleReset = useCallback(() => {
    setRemainingTime(time); // Đặt lại thời gian ban đầu
    setIsStarted(false); // Đánh dấu là timer chưa bắt đầu
    if (onReset) { onReset(); } // Gọi hàm onReset nếu có
  }, [time, onReset]);

  useEffect(() => {
    // Nếu thời gian còn lại là 0, không cần bắt đầu timer nữa
    if (remainingTime <= 0) {
      handleFinish();
      return;
    }

    if (isStarted) {
      // Thiết lập một timer để giảm thời gian mỗi 100ms
      const timer = setTimeout(() => {
        setRemainingTime((prevTime) => prevTime - 100); // Giảm 100ms mỗi lần
      }, 100);

      // Dọn dẹp timer khi component bị unmount hoặc thời gian thay đổi
      return () => clearTimeout(timer);
    }
  }, [remainingTime, isStarted, handleFinish]);


  return (

    <TouchableOpacity style={style} onPress={() => {
      if (isStarted) {
        handleReset();
      } else {
        handleStart();
      }
    }}>
      <AppText style={styles.txtTime}>{isStarted ? formatTime(remainingTime) : 'Gửi lại OTP'}</AppText>
    </TouchableOpacity>


  );
};
const styles = StyleSheet.create({
  txtTime: {
    fontSize: FontSize.FontSize14,
    ...FontWithFamily.FontWithFamily_600,
    textAlign: 'right',

  },
});
