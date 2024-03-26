import { useRouter } from 'next/router';
import * as React from 'react';
import { toast } from 'react-hot-toast';

import api from '@/lib/axios';
import { getToken, removeToken } from '@/lib/cookie';

import LogoWithText from '@/components/layout/LogoWithText';

import useAuthStore from '@/store/useAuthStore';

import { ApiResponse } from '@/types/api';
import { MeResponse, User } from '@/types/entities/user';

const HOME_ROUTE = '/';
const LOGIN_ROUTE = '/login';

const isPermitted = (user: User | null) => {
  return user?.role === 'user';
};

/**
 * Add role-based access control to a component
 *
 * @see https://react-typescript-cheatsheet.netlify.app/docs/hoc/full_example/
 * @see https://github.com/mxthevs/nextjs-auth/blob/main/src/components/withAuth.tsx
 * @see https://www.bbss.dev/posts/effective-hocs/
 */
export default function withAuth(
  routePermission: 'auth' | 'protected' | 'optional'
) {
  return function <T extends Record<string, unknown>>(
    Component: React.ComponentType<T>
  ) {
    const ComponentWithAuth = (props: T) => {
      const router = useRouter();
      const { query } = router;

      //#region  //*=========== STORE ===========
      const isAuthenticated = useAuthStore.useIsAuthenticated();
      const isLoading = useAuthStore.useIsLoading();
      const login = useAuthStore.useLogin();
      const logout = useAuthStore.useLogout();
      const stopLoading = useAuthStore.useStopLoading();
      const user = useAuthStore.useUser();
      //#endregion  //*======== STORE ===========

      // Check if user is authenticated
      const checkAuth = React.useCallback(() => {
        const token = getToken();
        if (!token) {
          isAuthenticated && logout();
          stopLoading();
          return;
        }
        const loadUser = async () => {
          try {
            const res = await api.get<ApiResponse<MeResponse>>('/auth/me');

            login({
              ...res.data.response,
              token: token + '',
            });
          } catch (err) {
            removeToken();
          } finally {
            stopLoading();
          }
        };

        if (!isAuthenticated) {
          loadUser();
        }
      }, [isAuthenticated, login, logout, stopLoading]);

      React.useEffect(() => {
        // run checkAuth every page visit
        checkAuth();

        // run checkAuth every focus changes
        window.addEventListener('focus', checkAuth);
        return () => {
          window.removeEventListener('focus', checkAuth);
        };
      }, [checkAuth]);

      React.useEffect(() => {
        if (!isLoading) {
          if (isAuthenticated) {
            // Prevent authenticated user from accessing auth or other role pages
            if (routePermission === 'auth' || !isPermitted(user)) {
              if (query?.redirect) {
                router.replace(query.redirect as string);
              } else {
                if (routePermission === 'protected') {
                  toast.error('Anda tidak memiliki akses ke halaman ini', {
                    id: 'unauthorized',
                  });
                }
                router.replace(HOME_ROUTE);
              }
            }
          } else {
            // Prevent unauthenticated user from accessing protected pages
            if (routePermission === 'protected') {
              router.replace(
                `${LOGIN_ROUTE}?redirect=${router.asPath}`,
                `${LOGIN_ROUTE}`
              );
            }
          }
        }
      }, [isAuthenticated, isLoading, query, router, user]);

      if (
        // If unauthenticated user want to access protected pages
        (routePermission === 'protected' && !isAuthenticated) ||
        (routePermission === 'optional' && isLoading)
      ) {
        return (
          <div className='bg-secondary-900 flex min-h-screen flex-col items-center justify-center'>
            <LogoWithText />
          </div>
        );
      }

      return <Component {...(props as T)} />;
    };

    const displayName = Component.displayName || Component.name || 'Component';
    ComponentWithAuth.displayName = `withAuth(${displayName})`;

    return ComponentWithAuth;
  };
}
