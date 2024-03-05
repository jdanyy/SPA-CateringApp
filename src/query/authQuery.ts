import { useMutation } from '@tanstack/react-query';
import { sendLoginRequest, sendRegistrationRequest } from '../api/authApi';
import { LoginData, RegistrationData } from '../types/commonTypes';

export function useLogin() {
  return useMutation({
    mutationFn: (formData: LoginData) => sendLoginRequest(formData),
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (formData: RegistrationData) => sendRegistrationRequest(formData),
  });
}
