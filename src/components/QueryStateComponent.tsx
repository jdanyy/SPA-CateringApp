import { Alert } from '@mui/material';
import { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

type Props = {
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
};

export default function QueryStateComponent({ isLoading, isError, error }: Props) {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { logout } = useContext(AuthContext);

  const content = useMemo(() => {
    if (isLoading) {
      return (
        <Alert severity="warning" title={t('commonMessages.loading')} sx={{ margin: 10 }}>
          {t('commonMessages.loading')}
        </Alert>
      );
    }

    if (isError && error && error.message === 'RELOGIN') {
      logout();
      navigate('/');
    }

    if (isError && error) {
      return (
        <Alert severity="error" title={t(`${error.message}`)} sx={{ margin: 10 }}>
          {t(`${error.message}`)}
        </Alert>
      );
    }

    return null;
  }, [isLoading, isError, error, navigate, logout, t]);

  return content;
}
