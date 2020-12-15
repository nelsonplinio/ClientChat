import darkColor from './dark.color';
import lightColor from './light.color';

export interface AppThemeColor {
  background: string;
  secondaryBackground: string;
  primary: string;
  secondary: string;
  primaryTextColor: string;
  secondaryTextColor: string;
  titleTextColor: string;
}

export interface AppTheme {
  colors: AppThemeColor;
}

const defaultThemeConfig: Partial<AppTheme> = {
  // Add other configs
}

const darkTheme: AppTheme = {
  ...defaultThemeConfig,
  colors: darkColor,
};

const lightTheme: AppTheme = {
  ...defaultThemeConfig,
  colors: lightColor,
}

const themes = {
  dark: darkTheme,
  light: lightTheme,
}

export default function getTheme(): AppTheme {
  const theme = 'light'
  return themes[theme];
}