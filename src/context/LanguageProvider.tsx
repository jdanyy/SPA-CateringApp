import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { updateUserLng } from '../api/userApi';
import i18n from '../components/i18next';
import { AuthContext } from './AuthContext';

type LanguageContextType = {
  currentLng: string;
  setCurrentLng: (_: string) => void;
};

type LanguageProviderProp = {
  children: ReactNode;
};

export const LanguageContext = createContext<LanguageContextType>({
  currentLng: 'en',
  setCurrentLng(): void {},
});

export function LanguageProvider({ children }: LanguageProviderProp) {
  const { userData } = useContext(AuthContext);

  const [currentLng, setCurrentLng] = useState<string>('en');

  const handleLanguageChange = useCallback(
    async (lang: string) => {
      setCurrentLng(lang);
      if (currentLng !== lang) {
        if (userData) {
          try {
            await updateUserLng({ lang }, userData.id);
          } catch (error) {
            console.log(error);
          }
        }
      }
    },
    [currentLng, userData],
  );

  const providerProp = useMemo(() => {
    return {
      currentLng,
      setCurrentLng: handleLanguageChange,
    };
  }, [currentLng, handleLanguageChange]);

  useEffect(() => {
    if (userData) {
      setCurrentLng(userData.lang);
      i18n.changeLanguage(userData.lang);
    }
  }, [userData, i18n]);

  return (
    <LanguageContext.Provider value={providerProp}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </LanguageContext.Provider>
  );
}
