import { AxiosError } from 'axios';
import { introspectUri, loginUri, logoutUri, registerUri } from '../constants/apiConstants';
import { LoginData, RegistrationData, UserData } from '../types/commonTypes';
import { errorMessageTransformer } from '../util/errorMessageTransformer';
import { axiosInstance } from './config/axiosConfig';

export async function sendLoginRequest(loginData: LoginData) {
  let response;

  try {
    response = await axiosInstance.post<UserData>(loginUri, loginData);
  } catch (error) {
    const message = errorMessageTransformer(error as AxiosError, 'auth');
    throw new Error(message);
  }

  return response.data;
}

export async function fetchUserData() {
  let response;

  try {
    response = await axiosInstance.get<UserData>(introspectUri);
  } catch (error) {
    const message = errorMessageTransformer(error as AxiosError, 'auth');
    throw new Error(message);
  }

  return response.data;
}

export async function sendLogout() {
  try {
    await axiosInstance.post<void>(logoutUri);
  } catch (error) {
    const message = errorMessageTransformer(error as AxiosError);
    throw new Error(message);
  }
}

export async function sendRegistrationRequest(registrationData: RegistrationData) {
  let response;

  try {
    response = await axiosInstance.post<UserData>(registerUri, registrationData);
  } catch (error) {
    const message = errorMessageTransformer(error as AxiosError, 'auth');
    throw new Error(message);
  }

  return response.data;
}
