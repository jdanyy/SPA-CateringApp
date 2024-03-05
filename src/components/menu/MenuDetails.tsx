import { Alert, Button, Card, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { TIMEOUT_MS_DURATION } from '../../constants/commonConstants';
import { useDeleteMenu } from '../../query/menuQuery';
import { Menu } from '../../types/commonTypes';
import DeleteButton from '../DeleteButton';
import QueryStateComponent from '../QueryStateComponent';

type Props = {
  menu: Menu;
  isReadOnly: boolean;
};

export default function MenuDetails({ menu, isReadOnly }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    mutate,
    isError: isDeleteError,
    error: deleteError,
    isPending: isDeleteLoading,
    isSuccess: deleteIsSuccess,
  } = useDeleteMenu();

  const handleMenuDelete = useCallback(() => {
    mutate(menu.id);
  }, []);

  useEffect(() => {
    const timeoutHandler = setTimeout(() => {
      if (deleteIsSuccess) {
        navigate('/');
      }
    }, TIMEOUT_MS_DURATION);

    return () => {
      clearTimeout(timeoutHandler);
    };
  }, [deleteIsSuccess]);

  return (
    <Card sx={{ p: 2, maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Typography gutterBottom sx={{ fontWeight: 'bold', fontSize: 26 }} mb={1}>
        {menu.menuTitle}
      </Typography>
      <div>
        <Typography mb={1}>
          {t('menuItemMessages.priceLabel')} {menu.price}
        </Typography>
        <Typography mb={1}>
          {t('menuItemMessages.ratingLabel')} {menu.rating}
        </Typography>
        <Typography mb={1}>
          {t('menuItemMessages.caloriesLabel')} {menu.calories}
        </Typography>
        <Typography mb={1} sx={{ fontWeight: 'bold' }}>
          {t('menuItemMessages.dishsLabel')}
        </Typography>
        <List>
          {menu.dishes.map((dish) => (
            <ListItem key={dish.id}>
              <ListItemText primary={dish.name} />
            </ListItem>
          ))}
        </List>
      </div>
      {!isReadOnly && (
        <>
          <Button component={Link} to={`/menus/${menu.id}/update`} variant="contained" sx={{ mr: 2, mt: 2 }}>
            {t('menuItemMessages.updateButton')}
          </Button>
          <DeleteButton onConfirm={handleMenuDelete} popUpDescription={t('menuItemMessages.deleteDialogQuestion')} />
        </>
      )}
      {deleteIsSuccess && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {t('menuItemMessages.deleteSuccessMessage')}
        </Alert>
      )}
      <QueryStateComponent isError={isDeleteError} error={deleteError} isLoading={isDeleteLoading} />
    </Card>
  );
}
