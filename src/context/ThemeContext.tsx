import { ThemeProvider as DefaultThemeProvider, Theme } from '@mui/material';
import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { updateUserTheme } from '../api/userApi';
import { lightTheme } from '../components/theme/theme';
import { getThemeName } from '../util/themeConverter';
import { AuthContext } from './AuthContext';

type ThemeProviderProp = {
  children: ReactNode;
};

type ThemeContextType = {
  currentTheme: Theme;
  setCurrentTheme: (_: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  currentTheme: lightTheme,
  setCurrentTheme(): void {},
});

export function ThemeProvider({ children }: ThemeProviderProp) {
  const { userTheme, userData } = useContext(AuthContext);

  const [currentTheme, setCurrentTheme] = useState<Theme>(lightTheme);

  const handleThemeChange = useCallback(
    async (theme: Theme) => {
      if (theme !== currentTheme) {
        setCurrentTheme(theme);
        if (userData) {
          const themeName = getThemeName(theme);
          try {
            await updateUserTheme({ theme: themeName }, userData.id);
          } catch (error) {
            console.log(error);
          }
        }
      }
    },
    [userData, currentTheme],
  );

  const themeProviderProp = useMemo(() => {
    return {
      currentTheme,
      setCurrentTheme: handleThemeChange,
    };
  }, [currentTheme, handleThemeChange]);

  useEffect(() => {
    setCurrentTheme(userTheme);
  }, [userTheme, userData]);

  return (
    <ThemeContext.Provider value={themeProviderProp}>
      <DefaultThemeProvider theme={currentTheme}>{children}</DefaultThemeProvider>;
    </ThemeContext.Provider>
  );
}
