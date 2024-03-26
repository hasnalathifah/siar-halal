import clsx from 'clsx';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import clsxm from '@/lib/clsxm';
import { useLoginMutation } from '@/hooks/mutation/useLoginMutation';

import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import PasswordInput from '@/components/forms/PasswordInput';
import withAuth from '@/components/hoc/withAuth';
import ButtonLink from '@/components/links/ButtonLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import NavigationLogo from '@/components/navigation/NavigationLogo';
import NextImage from '@/components/NextImage';
import Noise from '@/components/Noise';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

type LoginForm = {
  email: string;
  password: string;
};

export default withAuth('auth')(LoginPage);
function LoginPage() {
  //#region  //*=========== Form ===========
  const methods = useForm<LoginForm>({
    mode: 'onTouched',
  });
  const { handleSubmit } = methods;
  //#endregion  //*======== Form ===========

  //#region  //*=========== Form Submit ===========
  const { mutateAsync: login, isLoading } = useLoginMutation();
  const onSubmit = (data: LoginForm) => {
    login(data);
  };
  //#endregion  //*======== Form Submit ===========
  return (
    <>
      <Seo templateTitle='Login' />

      <NavigationLogo
        href='/'
        className='fixed left-8 top-8 z-10 lg:left-16 lg:top-16'
      />

      <main
        className={clsxm([
          'bg-secondary-900 relative',
          'flex flex-col items-start',
          'lg:flex-row',
        ])}
      >
        {/* Illustration Section */}
        <div
          className={clsxm(
            'relative overflow-hidden ',
            'flex min-h-screen flex-col items-center justify-center',
            'w-full lg:w-7/12 xl:w-8/12',
            '-mb-12 pb-24 sm:-mb-16 sm:pb-32 lg:mb-0 lg:pb-0',
            'px-8 pt-8 sm:px-16 lg:py-12',
            'sticky top-0'
          )}
        >
          <div
            className={clsx([
              'z-10 w-full',
              'space-y-4',
              'max-w-lg lg:max-w-[50%]',
            ])}
          >
            <NextImage
              src='/images/animated-logo.svg'
              width={278}
              height={152}
              alt='Hype & Play'
              className='w-full'
              imgClassName='w-full'
            />
            <div className='space-y-3'>
              <Typography as='h2' variant='b3' className='block lg:hidden'>
                Not registered yet?{' '}
                <UnderlineLink
                  className='text-typo-secondary'
                  href='/auth/register#form'
                >
                  Register Now
                </UnderlineLink>
              </Typography>
              <ButtonLink
                variant='dark'
                href='#form'
                className='w-fit lg:hidden'
                size='lg'
              >
                Login
              </ButtonLink>
            </div>
          </div>

          <div
            className='absolute inset-0 bg-cover bg-right lg:bg-center'
            style={{
              backgroundImage: 'url("/images/graphic/hexagonal-web.svg")',
            }}
          >
            <NextImage
              src='/images/graphic/gradient-blob.png'
              width={720}
              height={900}
              className='absolute left-0 top-0 w-1/2 max-w-lg -translate-x-1/4 -translate-y-1/3 rotate-45 blur-2xl'
              imgClassName='w-full'
              alt='Gradient'
            />
            <NextImage
              src='/images/graphic/gradient-blob.png'
              width={720}
              height={900}
              className='absolute bottom-0 right-0 w-1/2 translate-x-1/2 translate-y-1/3 rotate-45 blur-2xl'
              imgClassName='w-full'
              alt='Gradient'
            />
            <Noise className='opacity-10' />
          </div>
        </div>

        {/* Form Section */}
        <div className='z-10 w-full lg:w-6/12 xl:w-4/12'>
          {/* Rounded Tabs */}
          <UnstyledLink
            href='#form'
            className='bg-secondary-800 relative -mb-1 block h-12 w-full rounded-t-full sm:h-16 lg:hidden'
          >
            <div className='bg-secondary-600 absolute left-1/2 top-2 h-2 w-16 -translate-x-1/2 rounded-full'>
              &nbsp;
            </div>
          </UnstyledLink>

          <div id='form' className='bg-secondary-800 w-full'>
            <div
              className={clsxm(
                'flex min-h-screen flex-col lg:justify-center',
                'px-8 pb-16 pt-8 sm:px-16 lg:py-12 xl:px-20'
              )}
            >
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-12'>
                  <div className='space-y-1'>
                    <Typography as='h1' variant='j1'>
                      Login
                    </Typography>

                    <Typography
                      as='h1'
                      variant='b1'
                      color='purple-gradient'
                      className='w-fit'
                    >
                      Hype and Play
                    </Typography>
                  </div>

                  <div className='space-y-6'>
                    <Input
                      id='email'
                      label='Email address'
                      validation={{ required: 'Email address is required' }}
                    />
                    <PasswordInput
                      id='password'
                      label='Password'
                      validation={{ required: 'Password is required' }}
                    />
                  </div>

                  <div className='flex flex-col items-center gap-3'>
                    <Button
                      isLoading={isLoading}
                      className='w-full justify-center'
                      type='submit'
                    >
                      Login
                    </Button>
                    <Typography as='h2' variant='b3'>
                      Not registered yet?{' '}
                      <UnderlineLink
                        className='text-typo-secondary'
                        href='/auth/register#form'
                      >
                        Register Now
                      </UnderlineLink>
                    </Typography>
                  </div>
                </form>
              </FormProvider>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
