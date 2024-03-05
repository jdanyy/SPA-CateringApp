import { AxiosError } from 'axios';
import { userUri } from '../constants/apiConstants';
import { UserLanguageUpdate, UserThemeUpdate } from '../types/commonTypes';
import { errorMessageTransformer } from '../util/errorMessageTransformer';
import { axiosInstance } from './config/axiosConfig';

export async function updateUserTheme(theme: UserThemeUpdate, userId: number) {
  const composedUrl = userUri.replace(':userId', String(userId)).concat('/', 'theme');
  try {
    await axiosInstance.put<void>(composedUrl, theme);
  } catch (error) {
    const message = errorMessageTransformer(error as AxiosError);
    throw new Error(message);
  }
}

export async function updateUserLng(lng: UserLanguageUpdate, userId: number) {
  const composedUrl = userUri.replace(':userId', String(userId)).concat('/', 'lang');
  try {
    await axiosInstance.put<void>(composedUrl, lng);
  } catch (error) {
    const message = errorMessageTransformer(error as AxiosError);
    throw new Error(message);
  }
}
