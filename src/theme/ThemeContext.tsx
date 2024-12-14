import {
  createBox,
  createText,
  createTheme,
} from '@shopify/restyle';
import React, { createContext, ReactNode, useContext } from 'react';
import { Colors, ColorScheme } from './Colors';
import { Spacing } from './spacing';
interface ThemeContextType {
  colors: ColorScheme;
}
const theme = createTheme({
  colors: Colors,
  spacing: Spacing,
});
export type Theme = typeof theme;

export const Box = createBox<Theme>();
export const Text = createText<Theme>();
const ThemeContext = createContext<ThemeContextType>({
  colors: Colors,
});

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ThemeContext.Provider value={{ colors: Colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
