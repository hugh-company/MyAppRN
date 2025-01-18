import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {t} from 'i18next';
dayjs.extend(duration);
// Hàm để định dạng ngày tháng
export const formatDate = (
  date: Date | string,
  format: string = 'YYYY-MM-DD',
): string => {
  return dayjs(date).format(format);
};

// Hàm để so sánh hai ngày
export const isBefore = (
  date1: Date | string,
  date2: Date | string,
): boolean => {
  return dayjs(date1).isBefore(dayjs(date2));
};
export const getDateToday = (date: Date | string) => {
  const diff = dayjs(date).diff(dayjs(), 'day');
  if (diff > 0) {
    return `${diff} ${t('home.days')}`;
  }
  const diffHour = dayjs(date).diff(dayjs(), 'hour');
  if (diffHour > 0) {
    return `${diffHour} ${t('home.hour')}`;
  }
  const diffMinute = dayjs(date).diff(dayjs(), 'minute');
  if (diffMinute > 0) {
    return `${diffMinute} ${t('home.minute')}`;
  }
  const diffSecond = dayjs(date).diff(dayjs(), 'second');
  if (diffSecond > 0) {
    return `${diffSecond} ${t('home.second')}`;
  }
  return t('home.expired');
};
// Hàm để tính số ngày giữa hai ngày
export const daysBetween = (
  date1: Date | string,
  date2: Date | string,
): number => {
  return dayjs(date2).diff(dayjs(date1), 'day');
};

// Hàm để lấy ngày hiện tại
export const getCurrentDate = (): string => {
  return dayjs().format('YYYY-MM-DD');
};
// format HH:mm ==> 12:00
// format giây qua đạng HH:mm:ss

export const formatTimeSeconds = (seconds: number): string => {
  const formatted = dayjs.duration(seconds, 'seconds').format('HH:mm:ss');
  return formatted.startsWith('00:') ? formatted.slice(3) : formatted;
};
export const isValidateDate = (date: string): boolean => {
  return dayjs(date).isValid();
};
// get age
export const getAge = (date: string): number => {
  return dayjs().diff(date, 'year');
};

export const checkMessageTime = (date: Date | string): string => {
  const messageDate = dayjs(date);
  const today = dayjs();
  if (messageDate.isSame(today, 'day')) {
    return t('today');
  }
  return messageDate.format('DD/MM');
};
