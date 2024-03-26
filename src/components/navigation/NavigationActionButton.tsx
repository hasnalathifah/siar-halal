import clsx from 'clsx';
import { LogIn, LogOut, User } from 'lucide-react';
import * as React from 'react';

import clsxm from '@/lib/clsxm';

import Button from '@/components/buttons/Button';
import IconButton from '@/components/buttons/IconButton';
import ButtonLink from '@/components/links/ButtonLink';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/Popover';
import Typography from '@/components/typography/Typography';

import useAuthStore from '@/store/useAuthStore';

export default function NavigationActionButton() {
  const isAuthenticated = useAuthStore.useIsAuthenticated();
  const logout = useAuthStore.useLogout();
  return (
    <>
      <div className='hidden shrink-0 items-center gap-4 md:flex'>
        {isAuthenticated ? (
          <Popover>
            <PopoverTrigger asChild>
              <IconButton icon={User} />
            </PopoverTrigger>
            <PopoverContent
              side='left'
              className={clsxm(['p-1', 'w-full max-w-[8rem]'])}
            >
              <button
                className={clsxm([
                  'bg-secondary-800 hover:bg-secondary-900/30 flex w-full items-center gap-3 rounded-md  pr-8',
                ])}
                onClick={() => logout()}
              >
                <div
                  className={clsx([
                    'h-8 w-8 ',
                    'flex shrink-0 items-center justify-center rounded-md text-white',
                    'from-secondary-900/50 to-secondary-900 bg-gradient-to-tr ',
                  ])}
                >
                  <LogOut size={12} />
                </div>
                <Typography variant='b3' className='whitespace-nowrap'>
                  Log Out
                </Typography>
              </button>
            </PopoverContent>
          </Popover>
        ) : (
          <>
            <ButtonLink href='/auth/register' variant='light'>
              Get Started
            </ButtonLink>
            <ButtonLink variant='ghost' href='/auth/login'>
              Log In
            </ButtonLink>
          </>
        )}
      </div>
      <div className='mt-4 flex w-full justify-end md:hidden'>
        {isAuthenticated ? (
          <Button leftIcon={LogOut} variant='ghost' onClick={() => logout()}>
            Log Out
          </Button>
        ) : (
          <>
            <ButtonLink href='/auth/register' variant='light'>
              Get Started
            </ButtonLink>
            <ButtonLink rightIcon={LogIn} variant='ghost' href='/auth/login'>
              Log In
            </ButtonLink>
          </>
        )}
      </div>
    </>
  );
}
