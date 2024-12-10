import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { Colors, ThemeColors, lightColors, darkColors } from './Colors';
import { MMKV } from 'react-native-mmkv';

export type ThemeType = 'light' | 'dark' | 'system';

interface ThemeContextType {
  themeType: ThemeType;
  themeColors: ThemeColors;
  isDarkMode: boolean;
  setThemeType: (theme: ThemeType) => void;
}

const storage = new MMKV();
const THEME_KEY = '@theme_type';
import {
    ThemeProvider as ReStyleThemeProvider,
    createText,
    createBox,
    useTheme as useReTheme,
    createTheme,
  } from '@shopify/restyle';
import { Spacing } from './spacing';
import { FontSize } from './fontSize';
import { FontWithFamily } from './fontWithBold';
const defaultThemeType: ThemeType = 'system';

export const ThemeContext = createContext<ThemeContextType>({
  themeType: defaultThemeType,
  themeColors: lightColors,
  isDarkMode: false,
  setThemeType: () => null,
});
const theme = createTheme({
    dark: false,
    colors: {
      ...darkColors,
    },
    spacing: {
      ...Spacing,
    },
    text:{
      FontSize:FontSize.FontSize14,
      ...FontWithFamily.FontWithFamily_400
    }
  });

export type Theme = typeof theme;

export const Box = createBox<Theme>();
export const Text = createText<Theme>();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeType, setThemeType] = useState<ThemeType>(() => {
    const savedTheme = storage.getString(THEME_KEY);
    return (savedTheme as ThemeType) || defaultThemeType;
  });

  const isDarkMode = useCallback(() => {
    if (themeType === 'system') {
      return systemColorScheme === 'dark';
    }
    return themeType === 'dark';
  }, [themeType, systemColorScheme]);

  const themeColors = isDarkMode() ? darkColors : lightColors;

  const handleSetThemeType = useCallback((newTheme: ThemeType) => {
    setThemeType(newTheme);
    storage.set(THEME_KEY, newTheme);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        themeType,
        themeColors,
        isDarkMode: isDarkMode(),
        setThemeType: handleSetThemeType,
      }}>
      {children}
    </ThemeContext.Provider>
  );
}; 