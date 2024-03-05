import { Button } from '@mui/material';
import { useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../context/LanguageProvider';

const buttonStyle = {
  border: '0.5px solid #ccc',
  color: 'black',
  marginLeft: '0.5rem',
  marginBottom: '0.1rem',
};

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const { currentLng, setCurrentLng } = useContext(LanguageContext);

  const handleLanguageChange = useCallback(
    (newLanguage: string) => () => {
      i18n.changeLanguage(newLanguage);
      setCurrentLng(newLanguage);
    },
    [i18n, currentLng],
  );

  return (
    <>
      <Button onClick={handleLanguageChange('en')} disabled={currentLng === 'en'} color="primary" sx={buttonStyle}>
        {t('languageSwitcher.englishButton')}
      </Button>
      <Button onClick={handleLanguageChange('de')} disabled={currentLng === 'de'} color="primary" sx={buttonStyle}>
        {t('languageSwitcher.deutchButton')}
      </Button>
      <Button onClick={handleLanguageChange('hu')} disabled={currentLng === 'hu'} color="primary" sx={buttonStyle}>
        {t('languageSwitcher.hungarianButton')}
      </Button>
    </>
  );
}
