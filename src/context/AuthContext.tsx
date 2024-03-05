import { Theme } from '@mui/material';
import { ReactElement, createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { fetchUserData, sendLogout } from '../api/authApi';
import { lightTheme } from '../components/theme/theme';
import { UserData } from '../types/commonTypes';
import { getThemeByName } from '../util/themeConverter';

type AuthContextType = {
  userData: UserData | undefined;
  userTheme: Theme;
  login: (_: UserData) => void;
  logout: () => void;
};

type AuthProviderProp = {
  children: ReactElement;
};

export const AuthContext = createContext<AuthContextType>({
  userData: undefined,
  login(): void {},
  logout(): void {},
  userTheme: lightTheme,
});

export function AuthProvider({ children }: AuthProviderProp) {
  const [userData, setUserData] = useState<UserData | undefined>(undefined);
  const [theme, setTheme] = useState<Theme>(lightTheme);

  const fetchIntrospect = useCallback(async () => {
    let data: UserData | undefined;
    try {
      data = await fetchUserData();
    } catch (error) {
      console.error('Error while fetch introspect');
    }

    if (data) {
      setUserData(data);
      const userTheme = getThemeByName(data.theme);
      setTheme(userTheme);
    }
  }, []);

  useEffect(() => {
    fetchIntrospect();

    return () => {
      setUserData(undefined);
    };
  }, []);

  const login = useCallback(
    (data: UserData) => {
      setUserData(data);
      const userTheme = getThemeByName(data.theme);
      setTheme(userTheme);
    },
    [userData, theme],
  );

  const logout = useCallback(async () => {
    try {
      await sendLogout();
    } catch (error) {
      console.log('Error while fetch logout');
    }
    setUserData(undefined);
  }, [userData]);

  const providerProp = useMemo(() => {
    return {
      login,
      logout,
      userData,
      userTheme: theme,
    };
  }, [userData, login, logout, theme]);

  return <AuthContext.Provider value={providerProp}>{children}</AuthContext.Provider>;
}
