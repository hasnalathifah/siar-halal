import { useMutation } from '@tanstack/react-query';

import api from '@/lib/axios';
import useMutationToast from '@/hooks/toast/useMutationToast';

import { ApiResponse } from '@/types/api';

export type RegisterBody = {
  name: string;
  email: string;
  password: string;
  phone_number: number;
};

export function useRegisterUserMutation() {
  const result = useMutationToast<ApiResponse<string>, RegisterBody>(
    useMutation(async (data) => {
      const res = await api.post('/auth/register', {
        ...data,
        role: 'user',
      });
      return res.data;
    }),
    {
      loading: 'Registering User...',
      success: 'User Succesfully Registered',
    }
  );

  return result;
}
