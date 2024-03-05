import { ArrowBack } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { TIMEOUT_MS_DURATION } from '../../../constants/commonConstants';
import { useDish, useUpdateDish } from '../../../query/dishQuery';
import { CreateDish, FormLabelProp } from '../../../types/commonTypes';
import QueryStateComponent from '../../QueryStateComponent';
import DishForm from './DishFrom';

export default function UpdateDishForm() {
  const { dishId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data: dishData } = useDish(Number(dishId));
  const {
    mutate: updateDish,
    isSuccess: isUpdateSuccess,
    isError: isUpdateError,
    error: updateError,
    isPending: isUpdateLoading,
  } = useUpdateDish();

  const formLabel = useMemo<FormLabelProp>(() => {
    return { title: t('updateDishFormLabels.formTitle'), submitButton: t('updateDishFormLabels.submitButton') };
  }, []);

  const handleUpdate = useCallback((dish: CreateDish) => {
    updateDish({ updateData: dish, dishId: Number(dishId) });
  }, []);

  const handleBackButtonClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    const timeoutHandler = setTimeout(() => {
      if (isUpdateSuccess) {
        navigate('/dishes');
      }
    }, TIMEOUT_MS_DURATION);

    return () => {
      clearTimeout(timeoutHandler);
    };
  }, [isUpdateSuccess]);

  return (
    <Box maxWidth={600} mx="auto" mt={2}>
      <IconButton onClick={handleBackButtonClick} color="primary">
        <ArrowBack />
        <Typography>{t('commonDishFormLabels.backButton')}</Typography>
      </IconButton>
      <DishForm formLabel={formLabel} initialValues={dishData as CreateDish} onSubmit={handleUpdate} />
      <QueryStateComponent isError={isUpdateError} isLoading={isUpdateLoading} error={updateError} />
    </Box>
  );
}
