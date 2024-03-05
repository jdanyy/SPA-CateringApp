import { AxiosError, isAxiosError } from 'axios';

export function errorMessageTransformer(error: AxiosError | Error, context: string = 'app') {
  if (!isAxiosError(error)) {
    return 'apiError.unexpected';
  }

  if (error.response?.status === 404 && context === 'auth') {
    return 'apiError.invalidCredentials';
  }

  if (error.response?.status === 404) {
    return 'apiError.entityNotFound';
  }

  if (error.response?.status === 409 && context === 'auth') {
    return 'apiError.emailExists';
  }

  if (error.response?.status === 401 && context === 'app') {
    return 'RELOGIN';
  }

  return 'apiError.unexpected';
}
