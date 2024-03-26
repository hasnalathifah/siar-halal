import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import api from '@/lib/axios';
import { removeToken, setToken } from '@/lib/cookie';
import useMutationToast from '@/hooks/toast/useMutationToast';

import useAuthStore from '@/store/useAuthStore';

import { ApiResponse } from '@/types/api';
import { MeResponse } from '@/types/entities/user';

export type LoginBody = {
  email: string;
  password: string;
};

export function useLoginMutation() {
  const login = useAuthStore.useLogin();

  const result = useMutationToast<void, LoginBody>(
    useMutation((data) => {
      let tempToken: string;

      return api
        .post('/auth/login', data)
        .then((res) => {
          const { token } = res.data.response;
          tempToken = token;
          setToken(token);

          return api.get<ApiResponse<MeResponse>>('/auth/me');
        })
        .then((user) => {
          if (user.data.response.role !== 'user') {
            removeToken();
            toast.error("You don't have access to this site", {
              id: 'unauthorized',
            });
            return;
          }

          login({
            ...user.data.response,
            token: tempToken,
          });
        });
    }),
    {
      success: 'Success Login',
    }
  );

  return result;
}
