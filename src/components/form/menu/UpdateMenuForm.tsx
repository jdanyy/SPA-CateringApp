import { ArrowBack } from '@mui/icons-material';
import { Alert, Box, IconButton, Typography } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { TIMEOUT_MS_DURATION } from '../../../constants/commonConstants';
import { UpdateMutationFn, useFetchMenu, useUpdateMenu } from '../../../query/menuQuery';
import { CreateAndUpdateMenu } from '../../../types/commonTypes';
import QueryStateComponent from '../../QueryStateComponent';
import MenuForm from './MenuForm';

export default function UpdateMenuForm() {
  const { t } = useTranslation();
  const { menuId } = useParams();
  const navigate = useNavigate();
  const {
    data: initialValues,
    isError: isQueryError,
    error: queryError,
    isLoading: isQueryLoading,
  } = useFetchMenu(Number(menuId));

  const {
    data: updatedMenu,
    mutate: updateMenu,
    isError: isUpdateError,
    error: updateError,
    isPending: isUpdateLoading,
    isSuccess: updateIsSuccess,
  } = useUpdateMenu();

  const handleBackButtonOnClick = useCallback(() => {
    navigate(-1);
  }, []);

  const handleUpdate = useCallback((menu: CreateAndUpdateMenu) => {
    const numberMenuId = Number(menuId);
    const updateParams: UpdateMutationFn = { menu, menuId: numberMenuId };
    updateMenu(updateParams);
  }, []);

  useEffect(() => {
    const timeoutHandler = setTimeout(() => {
      if (updateIsSuccess) {
        navigate(`/menus/${updatedMenu.id}`);
      }
    }, TIMEOUT_MS_DURATION);

    return () => {
      clearTimeout(timeoutHandler);
    };
  }, [updateIsSuccess]);

  return (
    <Box maxWidth={600} mx="auto" mt={2}>
      <QueryStateComponent isError={isQueryError} error={queryError} isLoading={isQueryLoading} />
      <IconButton onClick={handleBackButtonOnClick} color="primary">
        <ArrowBack />
        <Typography sx={{ ml: 1 }}>{t('updateMenuFormConstants.backButtonLabel')}</Typography>
      </IconButton>
      <MenuForm
        onSubmit={handleUpdate}
        initialValues={initialValues as CreateAndUpdateMenu}
        formLabel={t('updateMenuFormConstants.formLabel')}
      />
      <QueryStateComponent isError={isUpdateError} isLoading={isUpdateLoading} error={updateError} />
      {updateIsSuccess && <Alert severity="success">{t('updateMenuFormConstants.successMessage')}</Alert>}
    </Box>
  );
}
