import clsx from 'clsx';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { HiOutlineX } from 'react-icons/hi';

import { useLoginMutation } from '@/hooks/mutation/useLoginMutation';

import Button from '@/components/buttons/Button';
import IconButton from '@/components/buttons/IconButton';
import Input from '@/components/forms/Input';
import PasswordInput from '@/components/forms/PasswordInput';
import ArrowLink from '@/components/links/ArrowLink';
import Modal from '@/components/Modal';
import NextImage from '@/components/NextImage';
import Noise from '@/components/Noise';
import Typography from '@/components/typography/Typography';

type LoginModal = {
  children?: (props: ModalReturnType) => JSX.Element;
  defaultOpen?: boolean;
  showBackHref?: boolean;
};

//#region  //*=========== Type ===========
type ModalReturnType = {
  openModal: () => void;
};
type LoginForm = {
  email: string;
  password: string;
};

//#endregion  //*======== Type ===========

export default function LoginModal({
  children,
  defaultOpen = false,
  showBackHref = false,
}: LoginModal) {
  const [open, setOpen] = React.useState(defaultOpen);

  const modalReturn: ModalReturnType = {
    openModal: () => setOpen(true),
  };
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
      {children && children(modalReturn)}
      <Modal
        open={open}
        setOpen={setOpen}
        disableClickOutside={defaultOpen}
        containerClassName='relative md:max-w-[68.75rem] overflow-hidden'
      >
        <div className='relative grid  md:min-h-[80dvh] md:grid-cols-2'>
          {!defaultOpen && (
            <IconButton
              onClick={() => setOpen(false)}
              variant='ghost'
              size='sm'
              icon={HiOutlineX}
              iconClassName='text-2xl text-typo-icons'
              className='absolute right-4 top-4 z-10'
            />
          )}

          <div
            className={clsx(
              'relative select-none overflow-hidden',
              'flex flex-col items-center justify-center',
              'bg-secondary-950 w-full',
              'px-8 py-8 sm:px-16 lg:py-12'
            )}
          >
            <div className={clsx(['z-10 w-full', 'space-y-4', 'max-w-[50%]'])}>
              <NextImage
                src='/images/animated-logo.svg'
                width={278}
                height={152}
                alt='Hype & Play'
                className='w-full'
                imgClassName='w-full'
              />
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
          <div
            className={clsx(
              'flex flex-col md:justify-center',
              'p-8 py-16 md:p-16 xl:px-20'
            )}
          >
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className='space-y-12 '>
                <div className='space-y-3'>
                  {showBackHref && (
                    <ArrowLink href='/' direction='left'>
                      Back to home
                    </ArrowLink>
                  )}

                  <Typography as='h1' variant='j1' color='purple-gradient'>
                    Log In
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

                <Button
                  isLoading={isLoading}
                  className='w-full justify-center'
                  type='submit'
                >
                  Login
                </Button>
              </form>
            </FormProvider>
          </div>
        </div>
      </Modal>
    </>
  );
}
