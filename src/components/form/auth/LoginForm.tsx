import { Alert, Button, TextField, Typography } from '@mui/material';
import { useCallback, useContext, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { useLogin } from '../../../query/authQuery';
import { LoginData } from '../../../types/commonTypes';
import QueryStateComponent from '../../QueryStateComponent';

export default function LoginForm() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({ mode: 'onTouched' });

  const {
    mutate: sendLogin,
    data: userData,
    error: loginError,
    isError: isLoginError,
    isPending: isLoginLoading,
    isSuccess: isLoginSuccess,
  } = useLogin();

  const onSubmit: SubmitHandler<LoginData> = useCallback(
    (loginData) => {
      sendLogin(loginData);
    },
    [sendLogin],
  );

  useEffect(() => {
    if (isLoginSuccess) {
      login(userData);
      navigate('/');
    }
  }, [isLoginSuccess, userData]);

  return (
    <>
      <Typography>{t('loginFormLabels.formTitle')}</Typography>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
        <TextField
          label={t('loginFormLabels.email')}
          variant="outlined"
          fullWidth
          {...register('email', {
            required: t('formValidationLabels.emailRequired'),
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: t('formValidationLabels.invalidEmail'),
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label={t('loginFormLabels.password')}
          variant="outlined"
          fullWidth
          {...register('password', {
            required: t('formValidationLabels.passwordRequired'),
          })}
          error={!!errors.password}
          type="password"
          helperText={errors.password?.message}
        />
        <Button type="submit" color="secondary">
          {t('loginFormLabels.buttonTitle')}
        </Button>
      </form>
      {isLoginSuccess && <Alert severity="success">{t('loginFormLabels.successPopUpMessage')}</Alert>}
      <QueryStateComponent isError={isLoginError} error={loginError} isLoading={isLoginLoading} />
    </>
  );
}
