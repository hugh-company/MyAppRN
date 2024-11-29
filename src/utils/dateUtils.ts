import dayjs from 'dayjs';

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
