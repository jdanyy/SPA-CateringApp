import { AccountCircle } from '@mui/icons-material';
import { AppBar, Box, Button, Theme, Toolbar, Typography } from '@mui/material';
import { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { filterPagesByRoles } from '../util/pageFilter';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitch from './theme/ThemeSwitch';

export default function NavBar() {
  const { t } = useTranslation();
  const { userData } = useContext(AuthContext);
  const { currentTheme, setCurrentTheme } = useContext(ThemeContext);

  const pages = useMemo(() => {
    return filterPagesByRoles(userData).filter((page) => page.title);
  }, [userData]);

  const handleThemeSet = (newTheme: Theme) => () => {
    setCurrentTheme(newTheme);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {userData?.name && (
          <Box display="flex" alignItems="center" marginRight={2}>
            <AccountCircle />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginLeft: 1 }}>
              {userData.name}
            </Typography>
          </Box>
        )}
        <Box display="flex" alignItems="center" flexGrow={1}>
          <ThemeSwitch currentTheme={currentTheme} setTheme={handleThemeSet} />
        </Box>
        <Typography sx={{ flexGrow: 1 }}>{t('navBar.title')}</Typography>
        <Box display="flex" alignItems="flex-end" flexDirection="column">
          <Box flex={3} marginBottom={1} marginTop={1}>
            {pages.map((page) => (
              <Button
                key={page.page}
                component={Link}
                to={page.route}
                color="inherit"
                sx={{ fontSize: '1rem', border: '0.5px solid #ccc', marginRight: '0.5rem', marginBottom: '0.5rem' }}
              >
                {t(`${page.title}`)}
              </Button>
            ))}
          </Box>
          <Box flex={0.5} gap={1}>
            <LanguageSwitcher />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
