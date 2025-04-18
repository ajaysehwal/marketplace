'use client';
import { useEffect } from 'react';
import { useTheme } from '@/hooks/use-theme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { activeThemeName, setTheme, primaryColor, updatePrimaryColor } =
    useTheme();

  // Apply theme only once on initial mount and when theme changes
  useEffect(() => {
    if (activeThemeName) {
      setTheme(activeThemeName);
      if (primaryColor) {
        updatePrimaryColor(primaryColor);
      }
    }
  }, [activeThemeName, setTheme, primaryColor, updatePrimaryColor]);

  // Simple return of children without additional wrapper
  return <>{children}</>;
};
