import { useCallback } from 'react';
import { ThemeType, useTheme } from '@theme';

export const useAppTheme = () => {
  const { themeType, themeColors, isDarkMode, setThemeType } = useTheme();

  const toggleTheme = useCallback(() => {
    const newTheme: ThemeType = isDarkMode ? 'light' : 'dark';
    setThemeType(newTheme);
  }, [isDarkMode, setThemeType]);

  const setSystemTheme = useCallback(() => {
    setThemeType('system');
  }, [setThemeType]);

  return {
    themeType,
    themeColors,
    isDarkMode,
    toggleTheme,
    setSystemTheme,
    setThemeType,
  };
}; 