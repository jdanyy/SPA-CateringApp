import { Button, TextField, Typography } from '@mui/material';
import { useCallback, useContext, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { ThemeContext } from '../../../context/ThemeContext';
import { useRegister } from '../../../query/authQuery';
import { RegistrationData } from '../../../types/commonTypes';
import { getThemeName } from '../../../util/themeConverter';
import QueryStateComponent from '../../QueryStateComponent';

export default function RegistrationForm() {
  const { login } = useContext(AuthContext);
  const { currentTheme } = useContext(ThemeContext);
  const { t } = useTranslation();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegistrationData>({ mode: 'onTouched' });

  const {
    mutate: sendRegister,
    data: userData,
    error: registrationError,
    isError: isRegistrationError,
    isPending: isRegistrationPending,
    isSuccess: isRegistrationSuccess,
  } = useRegister();

  const onSubmit: SubmitHandler<RegistrationData> = useCallback(
    (registraionData) => {
      registraionData.theme = getThemeName(currentTheme);
      sendRegister(registraionData);
    },
    [sendRegister],
  );

  useEffect(() => {
    if (isRegistrationSuccess) {
      login(userData);
      navigate('/');
    }
  }, [isRegistrationSuccess, userData]);

  return (
    <>
      <Typography>{t('registrationFromLables.formTitle')}</Typography>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
        <TextField
          label={t('registrationFromLables.email')}
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
          helperText={errors.email?.message ?? ''}
        />
        <TextField
          label={t('registrationFromLables.name')}
          variant="outlined"
          fullWidth
          {...register('name', {
            required: t('formValidationLabels.nameRequired'),
          })}
          error={!!errors.name}
          helperText={errors.name?.message ?? ''}
        />
        <TextField
          label={t('registrationFromLables.password')}
          variant="outlined"
          fullWidth
          {...register('password', {
            required: t('formValidationLabels.passwordRequired'),
            minLength: {
              value: 5,
              message: t('formValidationLabels.passwordLength'),
            },
            pattern: {
              value: /^(?=.*[A-Z])(?=.*\d)/,
              message: t('formValidationLabels.passwordStrength'),
            },
          })}
          error={!!errors.password}
          type="password"
          helperText={errors.password?.message ?? ''}
        />
        <TextField
          label={t('registrationFromLables.passwordConfirmation')}
          variant="outlined"
          fullWidth
          {...register('passwordConfirmation', {
            required: t('formValidationLabels.passwordConfirmationRequired'),
            validate: (value) => value === watch('password') || t('formValidationLabels.passwordDontMatch'),
          })}
          error={!!errors.passwordConfirmation}
          type="password"
          helperText={errors.passwordConfirmation?.message ?? ''}
        />
        <Button type="submit">{t('registrationFromLables.buttonTitle')}</Button>
      </form>
      <QueryStateComponent isError={isRegistrationError} isLoading={isRegistrationPending} error={registrationError} />
    </>
  );
}
