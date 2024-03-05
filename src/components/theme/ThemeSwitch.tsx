import { Brightness2, BrightnessHigh, WbSunny } from '@mui/icons-material';
import { Box, Button, Theme } from '@mui/material';
import { ReactElement, useMemo } from 'react';
import { getThemeName } from '../../util/themeConverter';
import { themeList } from './theme';

type Props = {
  currentTheme: Theme;
  setTheme: (_: Theme) => () => void;
};

type IconTheme = {
  [key: string]: ReactElement;
};

export default function ThemeSwitch({ currentTheme, setTheme }: Props) {
  const themeIcons: IconTheme = {
    CONTRAST: <BrightnessHigh />,
    DARK: <Brightness2 />,
    LIGHT: <WbSunny />,
  };

  const buttons = useMemo(() => {
    return Object.values(themeList).map((theme) => {
      const themeName = getThemeName(theme);
      const isActive = currentTheme === theme;
      return (
        <Button key={themeName} onClick={setTheme(theme)} disabled={isActive} color="inherit" sx={{ m1: 1 }}>
          {themeIcons[themeName]}
        </Button>
      );
    });
  }, [currentTheme, setTheme]);

  return <Box>{buttons}</Box>;
}
