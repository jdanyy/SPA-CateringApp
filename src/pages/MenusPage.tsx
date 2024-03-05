import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import QueryStateComponent from '../components/QueryStateComponent';
import MenuItem from '../components/menu/MenuItem';
import { useFetchAllMenus } from '../query/menuQuery';
import { Menu } from '../types/commonTypes';

export default function MenusPage() {
  const { t } = useTranslation();
  const [menus, setMenus] = useState<Menu[]>([]);
  const [page, setPage] = useState<number>(0);

  const {
    data: paginatedMenus,
    isLoading: isMenusLoading,
    isError: isMenusError,
    error: menusError,
    isSuccess: isFetchMenuSuccess,
  } = useFetchAllMenus(page);

  const nextPage = useCallback(() => {
    setPage((prevPage) => (paginatedMenus?.hasMore ? prevPage + 1 : prevPage));
  }, [paginatedMenus]);

  const previousPage = useCallback(() => {
    setPage((prevPage) => prevPage - 1);
  }, []);

  useEffect(() => {
    if (isFetchMenuSuccess) {
      setMenus(paginatedMenus.content);
    }
  }, [isFetchMenuSuccess, paginatedMenus]);

  return (
    <Box p={2} display="flex" flexDirection="column" alignItems="center">
      <Typography alignContent="center" fontSize={26} marginBottom={3}>
        {t('menusPage.menuPageTitle')}
      </Typography>
      <Box marginTop={1} marginBottom={1} gap={2} display="flex">
        <Button onClick={previousPage} disabled={page === 0} startIcon={<ArrowLeft />}>
          {t('commonMessages.prevButton')}
        </Button>
        <Button onClick={nextPage} disabled={!paginatedMenus?.hasMore} endIcon={<ArrowRight />}>
          {t('commonMessages.nextButton')}
        </Button>
      </Box>
      <QueryStateComponent isError={isMenusError} isLoading={isMenusLoading} error={menusError} />
      <Grid container spacing={3}>
        {menus.map((menu) => (
          <Grid item key={menu.id} xs={12} sm={6} md={4} lg={3}>
            <MenuItem menu={menu} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
