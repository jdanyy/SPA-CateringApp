import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { TIMEOUT_MS_DURATION } from '../../constants/commonConstants';
import { useDeleteDish } from '../../query/dishQuery';
import { Dish } from '../../types/commonTypes';
import DeleteButton from '../DeleteButton';
import QueryStateComponent from '../QueryStateComponent';

type Props = {
  dish: Dish;
  isReadOnly: boolean;
};

export default function DishItem({ dish, isReadOnly }: Props) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    mutate: deleteDish,
    isSuccess: isDeleteSuccess,
    error: deleteError,
    isError: isDeleteError,
    isPending: isDeleteLoading,
  } = useDeleteDish();

  const handleDeleteButton = useCallback(() => {
    deleteDish(dish.id);
  }, [dish.id]);

  useEffect(() => {
    const timeoutHandler = setTimeout(() => {
      if (isDeleteSuccess) {
        navigate('/dishes');
      }
    }, TIMEOUT_MS_DURATION);

    return () => {
      clearTimeout(timeoutHandler);
    };
  }, [isDeleteSuccess]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {t('commonDishFormLabels.name')}
        </Typography>
        <Typography>{dish.name}</Typography>
      </CardContent>
      {!isReadOnly && (
        <CardActions>
          <DeleteButton onConfirm={handleDeleteButton} popUpDescription={t('dishPage.deleteDialogQuestion')} />
          <Button component={Link} to={`/dishes/${dish.id}/update`} variant="contained" sx={{ mr: 2, mt: 2, ml: 2 }}>
            {t('dishPage.updateButtonLabel')}
          </Button>
        </CardActions>
      )}
      <QueryStateComponent isError={isDeleteError} error={deleteError} isLoading={isDeleteLoading} />
    </Card>
  );
}
