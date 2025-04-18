'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { themes } from '@/lib/theme';
import React from 'react';

type ThemeStore = {
  theme: string;
  setTheme: (theme: string) => void;
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
};

// Create a store for theme persistence with default values
export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'light', // Default to light theme
      setTheme: (theme) => set({ theme }),
      primaryColor: '221 83% 53%', // Explicitly initialize with default blue color
      setPrimaryColor: (color) => set({ primaryColor: color }), // Ensure full property is set
    }),
    {
      name: 'theme-storage',
    }
  )
);

// Hook to manage theme state and functionality
export const useTheme = () => {
  const {
    theme: activeTheme,
    setTheme,
    primaryColor,
    setPrimaryColor,
  } = useThemeStore();

  // Get the current theme object, ensuring we always have a valid theme
  const currentTheme = themes.find((t) => t.name === activeTheme) || themes[0];

  // Get all available themes
  const availableThemes = themes;

  // Apply theme to document root when activeTheme changes
  React.useEffect(() => {
    const theme = themes.find((t) => t.name === activeTheme) || themes[0];
    const root = document.documentElement;

    // Apply all color variables to CSS
    Object.entries(theme).forEach(([key, value]) => {
      if (key !== 'name' && key !== 'label') {
        // If it's the primary color, use the stored primary color instead
        if (key === 'primary' || key === 'ring') {
          root.style.setProperty(`--${key}`, primaryColor);
        } else {
          root.style.setProperty(`--${key}`, value);
        }
      }
    });

    // Set the theme attribute for potential CSS selectors
    root.setAttribute('data-theme', activeTheme);
  }, [activeTheme, primaryColor]);

  // Function to change the theme
  const applyTheme = (themeName: string) => {
    setTheme(themeName);
  };

  // Update just the primary color
  const updatePrimaryColor = (color: string) => {
    setPrimaryColor(color);
  };

  return {
    currentTheme,
    availableThemes,
    setTheme: applyTheme,
    activeThemeName: activeTheme,
    primaryColor,
    updatePrimaryColor,
  };
};
