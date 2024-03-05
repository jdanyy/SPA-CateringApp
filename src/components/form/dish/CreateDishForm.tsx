import { Box } from '@mui/material';
import { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { TIMEOUT_MS_DURATION } from '../../../constants/commonConstants';
import { useCreateDish } from '../../../query/dishQuery';
import { CreateDish, FormLabelProp } from '../../../types/commonTypes';
import QueryStateComponent from '../../QueryStateComponent';
import DishForm from './DishFrom';

export default function CreateDishForm() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    mutate: createDish,
    error: createDishError,
    isError: isCreateDishError,
    isSuccess: isCreateSuccess,
    isPending: isCreateLoading,
  } = useCreateDish();

  const handleSubmitForm = useCallback((dish: CreateDish) => {
    createDish(dish);
  }, []);

  const formLabel = useMemo<FormLabelProp>(() => {
    return {
      title: t('createDishFormLabels.formTitle'),
      submitButton: t('createDishFormLabels.createFromSubmitButton'),
    };
  }, []);

  useEffect(() => {
    const timeoutHandler = setTimeout(() => {
      if (isCreateSuccess) {
        navigate('/dishes');
      }
    }, TIMEOUT_MS_DURATION);

    return () => {
      clearTimeout(timeoutHandler);
    };
  }, [isCreateSuccess]);

  return (
    <Box>
      <DishForm formLabel={formLabel} onSubmit={handleSubmitForm} />
      <QueryStateComponent isLoading={isCreateLoading} isError={isCreateDishError} error={createDishError} />
    </Box>
  );
}
