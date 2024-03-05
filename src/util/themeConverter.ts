import { Theme } from '@mui/material';
import { ThemeNaming, lightTheme, themeList } from '../components/theme/theme';

export function getThemeName(theme: Theme): string {
  const themeNamings = Object.keys(themeList) as ThemeNaming[];

  const themeKey = themeNamings.find((key) => themeList[key] === theme);

  return themeKey || 'CONTRAST';
}

export function getThemeByName(themeName: string): Theme {
  const themeNamings = Object.keys(themeList) as ThemeNaming[];

  const naming = themeNamings.find((theme) => theme === themeName);

  return naming ? themeList[naming] : lightTheme;
}
