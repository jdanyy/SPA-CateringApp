import { Alert, Box } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { TIMEOUT_MS_DURATION } from '../../../constants/commonConstants';
import { useCreateMenu } from '../../../query/menuQuery';
import { CreateAndUpdateMenu } from '../../../types/commonTypes';
import QueryStateComponent from '../../QueryStateComponent';
import MenuForm from './MenuForm';

export default function CreateMenuForm() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    mutate: createMenu,
    data: createdMenuData,
    error: createError,
    isError: isCreateError,
    isSuccess: isCreateSuccess,
    isPending: isCreateLoading,
  } = useCreateMenu();

  const handleSubmitForm = useCallback(
    (menuData: CreateAndUpdateMenu) => {
      createMenu(menuData);
    },
    [createMenu],
  );

  useEffect(() => {
    const timeoutHandler = setTimeout(() => {
      if (isCreateSuccess) {
        navigate(`/menus/${createdMenuData.id}`);
      }
    }, TIMEOUT_MS_DURATION);

    return () => {
      clearTimeout(timeoutHandler);
    };
  }, [isCreateSuccess]);

  return (
    <Box maxWidth={600} mx="auto" mt={2}>
      <MenuForm onSubmit={handleSubmitForm} formLabel={t('createMenuFormConstants.formLabel')} />
      <QueryStateComponent isError={isCreateError} error={createError} isLoading={isCreateLoading} />
      {isCreateSuccess && <Alert severity="success">{t('createMenuFormConstants.successMessage')}</Alert>}
    </Box>
  );
}
