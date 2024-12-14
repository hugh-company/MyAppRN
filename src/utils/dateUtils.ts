import dayjs from 'dayjs';
import {t} from 'i18next';

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
