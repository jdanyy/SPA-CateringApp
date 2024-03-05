import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import QueryStateComponent from '../components/QueryStateComponent';
import DishItem from '../components/dish/DishItem';
import { AuthContext } from '../context/AuthContext';
import { useDishes } from '../query/dishQuery';
import { Dish } from '../types/commonTypes';
import { canModify } from '../util/modifyPermissionSolver';

export default function DishesPage() {
  const { t } = useTranslation();
  const { userData } = useContext(AuthContext);

  const [dishes, setDishes] = useState<Dish[]>([]);
  const [page, setPage] = useState<number>(0);

  const readOnly = useMemo(() => {
    if (userData) {
      return !canModify(userData, 'ADMIN');
    }
    return true;
  }, [userData]);

  const {
    data: dishesData,
    isSuccess: isDishFetchSuccess,
    isLoading: isDishesLoading,
    isError: isDishesError,
    error: dishesError,
  } = useDishes(page);

  const nextPage = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  const previousPage = useCallback(() => {
    setPage((prevPage) => prevPage - 1);
  }, []);

  useEffect(() => {
    if (isDishFetchSuccess) {
      setDishes(dishesData.content);
    }
  }, [isDishFetchSuccess, dishesData]);

  return (
    <Box>
      <QueryStateComponent error={dishesError} isLoading={isDishesLoading} isError={isDishesError} />
      <Box p={2} display="flex" flexDirection="column" alignItems="center">
        <Typography alignContent="center" fontSize={26} marginBottom={3}>
          {t('dishPage.dishPageTitle')}
        </Typography>
        <Box marginTop={1} marginBottom={1} display="flex" gap={2}>
          <Button onClick={previousPage} disabled={page === 0} startIcon={<ArrowLeft />}>
            {t('commonMessages.prevButton')}
          </Button>
          <Button onClick={nextPage} disabled={!dishesData?.hasMore} endIcon={<ArrowRight />}>
            {t('commonMessages.nextButton')}
          </Button>
        </Box>
        <Grid container spacing={3}>
          {dishes.map((dish) => (
            <Grid item key={dish.id} xs={8} sm={1} md={1} lg={2}>
              <DishItem dish={dish} isReadOnly={readOnly} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
