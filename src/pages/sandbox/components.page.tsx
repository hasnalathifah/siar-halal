import * as React from 'react';
import { FiEdit2, FiEye, FiPlus } from 'react-icons/fi';
import { HiArrowRight, HiPlus } from 'react-icons/hi';

import Button from '@/components/buttons/Button';
import IconButton from '@/components/buttons/IconButton';
import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import IconLink from '@/components/links/IconLink';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

export default function ComponentsPage() {
  return (
    <Layout>
      <Seo templateTitle='Components' />

      <main>
        {/* button */}
        <section>
          <div className='layout min-h-main flex flex-col gap-8 py-20'>
            <Typography as='h1' variant='j1'>
              Button
            </Typography>
            <div className='grid gap-16 md:grid-cols-[repeat(auto-fit,minmax(480px,1fr))]'>
              <div>
                <Typography variant='b2'>Primary Variant</Typography>
                <div className='mt-4'>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <Button variant='primary' size='lg'>
                      Primary
                    </Button>
                    <Button variant='primary' size='base'>
                      Primary
                    </Button>
                    <Button variant='primary' size='sm'>
                      Primary
                    </Button>
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <Button variant='primary' leftIcon={HiPlus} size='lg'>
                      Primary
                    </Button>
                    <Button variant='primary' leftIcon={HiPlus} size='base'>
                      Primary
                    </Button>
                    <Button variant='primary' leftIcon={HiPlus} size='sm'>
                      Primary
                    </Button>
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <Button
                      variant='primary'
                      rightIcon={HiArrowRight}
                      size='lg'
                    >
                      Primary
                    </Button>
                    <Button
                      variant='primary'
                      rightIcon={HiArrowRight}
                      size='base'
                    >
                      Primary
                    </Button>
                    <Button
                      variant='primary'
                      rightIcon={HiArrowRight}
                      size='sm'
                    >
                      Primary
                    </Button>
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <Button
                      variant='primary'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='lg'
                    >
                      Primary
                    </Button>
                    <Button
                      variant='primary'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='base'
                    >
                      Primary
                    </Button>
                    <Button
                      variant='primary'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='sm'
                    >
                      Primary
                    </Button>
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <Button
                      variant='primary'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='lg'
                      disabled
                    >
                      Primary
                    </Button>
                    <Button
                      variant='primary'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='base'
                      disabled
                    >
                      Primary
                    </Button>
                    <Button
                      variant='primary'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='sm'
                      disabled
                    >
                      Primary
                    </Button>
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <Button
                      variant='primary'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='lg'
                      isLoading
                    >
                      Primary
                    </Button>
                    <Button
                      variant='primary'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='base'
                      isLoading
                    >
                      Primary
                    </Button>
                    <Button
                      variant='primary'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='sm'
                      isLoading
                    >
                      Primary
                    </Button>
                  </div>
                </div>
              </div>
              <div>
                <Typography variant='b2'>Outline Variant</Typography>
                <div className='mt-4'>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <Button variant='outline' size='lg'>
                      outline
                    </Button>
                    <Button variant='outline' size='base'>
                      outline
                    </Button>
                    <Button variant='outline' size='sm'>
                      outline
                    </Button>
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <Button variant='outline' leftIcon={HiPlus} size='lg'>
                      outline
                    </Button>
                    <Button variant='outline' leftIcon={HiPlus} size='base'>
                      outline
                    </Button>
                    <Button variant='outline' leftIcon={HiPlus} size='sm'>
                      outline
                    </Button>
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <Button
                      variant='outline'
                      rightIcon={HiArrowRight}
                      size='lg'
                    >
                      outline
                    </Button>
                    <Button
                      variant='outline'
                      rightIcon={HiArrowRight}
                      size='base'
                    >
                      outline
                    </Button>
                    <Button
                      variant='outline'
                      rightIcon={HiArrowRight}
                      size='sm'
                    >
                      outline
                    </Button>
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <Button
                      variant='outline'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='lg'
                    >
                      outline
                    </Button>
                    <Button
                      variant='outline'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='base'
                    >
                      outline
                    </Button>
                    <Button
                      variant='outline'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='sm'
                    >
                      outline
                    </Button>
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <Button
                      variant='outline'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='lg'
                      disabled
                    >
                      outline
                    </Button>
                    <Button
                      variant='outline'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='base'
                      disabled
                    >
                      outline
                    </Button>
                    <Button
                      variant='outline'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='sm'
                      disabled
                    >
                      outline
                    </Button>
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <Button
                      variant='outline'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='lg'
                      isLoading
                    >
                      outline
                    </Button>
                    <Button
                      variant='outline'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='base'
                      isLoading
                    >
                      outline
                    </Button>
                    <Button
                      variant='outline'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='sm'
                      isLoading
                    >
                      outline
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <Typography variant='b2'>Light Variant</Typography>
                <div className='mt-4'>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <Button variant='light' size='lg'>
                      light
                    </Button>
                    <Button variant='light' size='base'>
                      light
                    </Button>
                    <Button variant='light' size='sm'>
                      light
                    </Button>
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <Button variant='light' leftIcon={HiPlus} size='lg'>
                      light
                    </Button>
                    <Button variant='light' leftIcon={HiPlus} size='base'>
                      light
                    </Button>
                    <Button variant='light' leftIcon={HiPlus} size='sm'>
                      light
                    </Button>
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <Button variant='light' rightIcon={HiArrowRight} size='lg'>
                      light
                    </Button>
                    <Button
                      variant='light'
                      rightIcon={HiArrowRight}
                      size='base'
                    >
                      light
                    </Button>
                    <Button variant='light' rightIcon={HiArrowRight} size='sm'>
                      light
                    </Button>
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <Button
                      variant='light'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='lg'
                    >
                      light
                    </Button>
                    <Button
                      variant='light'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='base'
                    >
                      light
                    </Button>
                    <Button
                      variant='light'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='sm'
                    >
                      light
                    </Button>
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <Button
                      variant='light'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='lg'
                      disabled
                    >
                      light
                    </Button>
                    <Button
                      variant='light'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='base'
                      disabled
                    >
                      light
                    </Button>
                    <Button
                      variant='light'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='sm'
                      disabled
                    >
                      light
                    </Button>
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <Button
                      variant='light'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='lg'
                      isLoading
                    >
                      light
                    </Button>
                    <Button
                      variant='light'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='base'
                      isLoading
                    >
                      light
                    </Button>
                    <Button
                      variant='light'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='sm'
                      isLoading
                    >
                      light
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <Typography variant='b2'>Dark Variant</Typography>
                <div className='mt-4'>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <Button variant='dark' size='lg'>
                      dark
                    </Button>
                    <Button variant='dark' size='base'>
                      dark
                    </Button>
                    <Button variant='dark' size='sm'>
                      dark
                    </Button>
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <Button variant='dark' leftIcon={HiPlus} size='lg'>
                      dark
                    </Button>
                    <Button variant='dark' leftIcon={HiPlus} size='base'>
                      dark
                    </Button>
                    <Button variant='dark' leftIcon={HiPlus} size='sm'>
                      dark
                    </Button>
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <Button variant='dark' rightIcon={HiArrowRight} size='lg'>
                      dark
                    </Button>
                    <Button variant='dark' rightIcon={HiArrowRight} size='base'>
                      dark
                    </Button>
                    <Button variant='dark' rightIcon={HiArrowRight} size='sm'>
                      dark
                    </Button>
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <Button
                      variant='dark'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='lg'
                    >
                      dark
                    </Button>
                    <Button
                      variant='dark'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='base'
                    >
                      dark
                    </Button>
                    <Button
                      variant='dark'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='sm'
                    >
                      dark
                    </Button>
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <Button
                      variant='dark'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='lg'
                      disabled
                    >
                      dark
                    </Button>
                    <Button
                      variant='dark'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='base'
                      disabled
                    >
                      dark
                    </Button>
                    <Button
                      variant='dark'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='sm'
                      disabled
                    >
                      dark
                    </Button>
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <Button
                      variant='dark'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='lg'
                      isLoading
                    >
                      dark
                    </Button>
                    <Button
                      variant='dark'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='base'
                      isLoading
                    >
                      dark
                    </Button>
                    <Button
                      variant='dark'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='sm'
                      isLoading
                    >
                      dark
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <Typography variant='b2'>Ghost Variant</Typography>
                <div className='mt-4'>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <Button variant='ghost' size='lg'>
                      ghost
                    </Button>
                    <Button variant='ghost' size='base'>
                      ghost
                    </Button>
                    <Button variant='ghost' size='sm'>
                      ghost
                    </Button>
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <Button variant='ghost' leftIcon={HiPlus} size='lg'>
                      ghost
                    </Button>
                    <Button variant='ghost' leftIcon={HiPlus} size='base'>
                      ghost
                    </Button>
                    <Button variant='ghost' leftIcon={HiPlus} size='sm'>
                      ghost
                    </Button>
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <Button variant='ghost' rightIcon={HiArrowRight} size='lg'>
                      ghost
                    </Button>
                    <Button
                      variant='ghost'
                      rightIcon={HiArrowRight}
                      size='base'
                    >
                      ghost
                    </Button>
                    <Button variant='ghost' rightIcon={HiArrowRight} size='sm'>
                      ghost
                    </Button>
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <Button
                      variant='ghost'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='lg'
                    >
                      ghost
                    </Button>
                    <Button
                      variant='ghost'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='base'
                    >
                      ghost
                    </Button>
                    <Button
                      variant='ghost'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='sm'
                    >
                      ghost
                    </Button>
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <Button
                      variant='ghost'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='lg'
                      disabled
                    >
                      ghost
                    </Button>
                    <Button
                      variant='ghost'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='base'
                      disabled
                    >
                      ghost
                    </Button>
                    <Button
                      variant='ghost'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='sm'
                      disabled
                    >
                      ghost
                    </Button>
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <Button
                      variant='ghost'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='lg'
                      isLoading
                    >
                      ghost
                    </Button>
                    <Button
                      variant='ghost'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='base'
                      isLoading
                    >
                      ghost
                    </Button>
                    <Button
                      variant='ghost'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='sm'
                      isLoading
                    >
                      ghost
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* button link */}
        <section>
          <div className='layout min-h-main flex flex-col gap-8 py-20'>
            <Typography as='h1' variant='j1'>
              Button Link
            </Typography>
            <div className='grid gap-16 md:grid-cols-[repeat(auto-fit,minmax(480px,1fr))]'>
              <div>
                <Typography variant='b2'>Primary Variant</Typography>
                <div className='mt-4'>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <ButtonLink
                      href='/sandbox/button-link'
                      variant='primary'
                      size='lg'
                    >
                      Primary
                    </ButtonLink>
                    <ButtonLink
                      href='/sandbox/button-link'
                      variant='primary'
                      size='base'
                    >
                      Primary
                    </ButtonLink>
                    <ButtonLink
                      href='/sandbox/button-link'
                      variant='primary'
                      size='sm'
                    >
                      Primary
                    </ButtonLink>
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <ButtonLink
                      href='/sandbox/button-link'
                      variant='primary'
                      leftIcon={HiPlus}
                      size='lg'
                    >
                      Primary
                    </ButtonLink>
                    <ButtonLink
                      href='/sandbox/button-link'
                      variant='primary'
                      leftIcon={HiPlus}
                      size='base'
                    >
                      Primary
                    </ButtonLink>
                    <ButtonLink
                      href='/sandbox/button-link'
                      variant='primary'
                      leftIcon={HiPlus}
                      size='sm'
                    >
                      Primary
                    </ButtonLink>
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <ButtonLink
                      href='/sandbox/button-link'
                      variant='primary'
                      rightIcon={HiArrowRight}
                      size='lg'
                    >
                      Primary
                    </ButtonLink>
                    <ButtonLink
                      variant='primary'
                      rightIcon={HiArrowRight}
                      size='base'
                      href='/'
                    >
                      Primary
                    </ButtonLink>
                    <ButtonLink
                      href='/sandbox/button-link'
                      variant='primary'
                      rightIcon={HiArrowRight}
                      size='sm'
                    >
                      Primary
                    </ButtonLink>
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <ButtonLink
                      variant='primary'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='lg'
                      href='/'
                    >
                      Primary
                    </ButtonLink>
                    <ButtonLink
                      variant='primary'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='base'
                      href='/'
                    >
                      Primary
                    </ButtonLink>
                    <ButtonLink
                      variant='primary'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='sm'
                      href='/'
                    >
                      Primary
                    </ButtonLink>
                  </div>
                </div>
              </div>
              <div>
                <Typography variant='b2'>Outline Variant</Typography>
                <div className='mt-4'>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <ButtonLink
                      href='/sandbox/button-link'
                      variant='outline'
                      size='lg'
                    >
                      outline
                    </ButtonLink>
                    <ButtonLink
                      href='/sandbox/button-link'
                      variant='outline'
                      size='base'
                    >
                      outline
                    </ButtonLink>
                    <ButtonLink
                      href='/sandbox/button-link'
                      variant='outline'
                      size='sm'
                    >
                      outline
                    </ButtonLink>
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <ButtonLink
                      href='/sandbox/button-link'
                      variant='outline'
                      leftIcon={HiPlus}
                      size='lg'
                    >
                      outline
                    </ButtonLink>
                    <ButtonLink
                      href='/sandbox/button-link'
                      variant='outline'
                      leftIcon={HiPlus}
                      size='base'
                    >
                      outline
                    </ButtonLink>
                    <ButtonLink
                      href='/sandbox/button-link'
                      variant='outline'
                      leftIcon={HiPlus}
                      size='sm'
                    >
                      outline
                    </ButtonLink>
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <ButtonLink
                      href='/sandbox/button-link'
                      variant='outline'
                      rightIcon={HiArrowRight}
                      size='lg'
                    >
                      outline
                    </ButtonLink>
                    <ButtonLink
                      variant='outline'
                      rightIcon={HiArrowRight}
                      size='base'
                      href='/'
                    >
                      outline
                    </ButtonLink>
                    <ButtonLink
                      href='/sandbox/button-link'
                      variant='outline'
                      rightIcon={HiArrowRight}
                      size='sm'
                    >
                      outline
                    </ButtonLink>
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <ButtonLink
                      variant='outline'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='lg'
                      href='/'
                    >
                      outline
                    </ButtonLink>
                    <ButtonLink
                      variant='outline'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='base'
                      href='/'
                    >
                      outline
                    </ButtonLink>
                    <ButtonLink
                      variant='outline'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='sm'
                      href='/'
                    >
                      outline
                    </ButtonLink>
                  </div>
                </div>
              </div>

              <div>
                <Typography variant='b2'>Light Variant</Typography>
                <div className='mt-4'>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <ButtonLink
                      href='/sandbox/button-link'
                      variant='light'
                      size='lg'
                    >
                      light
                    </ButtonLink>
                    <ButtonLink
                      href='/sandbox/button-link'
                      variant='light'
                      size='base'
                    >
                      light
                    </ButtonLink>
                    <ButtonLink
                      href='/sandbox/button-link'
                      variant='light'
                      size='sm'
                    >
                      light
                    </ButtonLink>
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <ButtonLink
                      href='/sandbox/button-link'
                      variant='light'
                      leftIcon={HiPlus}
                      size='lg'
                    >
                      light
                    </ButtonLink>
                    <ButtonLink
                      href='/sandbox/button-link'
                      variant='light'
                      leftIcon={HiPlus}
                      size='base'
                    >
                      light
                    </ButtonLink>
                    <ButtonLink
                      href='/sandbox/button-link'
                      variant='light'
                      leftIcon={HiPlus}
                      size='sm'
                    >
                      light
                    </ButtonLink>
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <ButtonLink
                      href='/sandbox/button-link'
                      variant='light'
                      rightIcon={HiArrowRight}
                      size='lg'
                    >
                      light
                    </ButtonLink>
                    <ButtonLink
                      href='/sandbox/button-link'
                      variant='light'
                      rightIcon={HiArrowRight}
                      size='base'
                    >
                      light
                    </ButtonLink>
                    <ButtonLink
                      href='/sandbox/button-link'
                      variant='light'
                      rightIcon={HiArrowRight}
                      size='sm'
                    >
                      light
                    </ButtonLink>
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <ButtonLink
                      variant='light'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='lg'
                      href='/'
                    >
                      light
                    </ButtonLink>
                    <ButtonLink
                      variant='light'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='base'
                      href='/'
                    >
                      light
                    </ButtonLink>
                    <ButtonLink
                      variant='light'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='sm'
                      href='/'
                    >
                      light
                    </ButtonLink>
                  </div>
                </div>
              </div>

              <div>
                <Typography variant='b2'>Dark Variant</Typography>
                <div className='mt-4'>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <ButtonLink
                      href='/sandbox/button-link'
                      variant='dark'
                      size='lg'
                    >
                      dark
                    </ButtonLink>
                    <ButtonLink
                      href='/sandbox/button-link'
                      variant='dark'
                      size='base'
                    >
                      dark
                    </ButtonLink>
                    <ButtonLink
                      href='/sandbox/button-link'
                      variant='dark'
                      size='sm'
                    >
                      dark
                    </ButtonLink>
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <ButtonLink
                      href='/sandbox/button-link'
                      variant='dark'
                      leftIcon={HiPlus}
                      size='lg'
                    >
                      dark
                    </ButtonLink>
                    <ButtonLink
                      href='/sandbox/button-link'
                      variant='dark'
                      leftIcon={HiPlus}
                      size='base'
                    >
                      dark
                    </ButtonLink>
                    <ButtonLink
                      href='/sandbox/button-link'
                      variant='dark'
                      leftIcon={HiPlus}
                      size='sm'
                    >
                      dark
                    </ButtonLink>
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <ButtonLink
                      href='/sandbox/button-link'
                      variant='dark'
                      rightIcon={HiArrowRight}
                      size='lg'
                    >
                      dark
                    </ButtonLink>
                    <ButtonLink
                      href='/sandbox/button-link'
                      variant='dark'
                      rightIcon={HiArrowRight}
                      size='base'
                    >
                      dark
                    </ButtonLink>
                    <ButtonLink
                      href='/sandbox/button-link'
                      variant='dark'
                      rightIcon={HiArrowRight}
                      size='sm'
                    >
                      dark
                    </ButtonLink>
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <ButtonLink
                      variant='dark'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='lg'
                      href='/'
                    >
                      dark
                    </ButtonLink>
                    <ButtonLink
                      variant='dark'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='base'
                      href='/'
                    >
                      dark
                    </ButtonLink>
                    <ButtonLink
                      variant='dark'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='sm'
                      href='/'
                    >
                      dark
                    </ButtonLink>
                  </div>
                </div>
              </div>

              <div>
                <Typography variant='b2'>Ghost Variant</Typography>
                <div className='mt-4'>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <ButtonLink
                      href='/sandbox/button-link'
                      variant='ghost'
                      size='lg'
                    >
                      ghost
                    </ButtonLink>
                    <ButtonLink
                      href='/sandbox/button-link'
                      variant='ghost'
                      size='base'
                    >
                      ghost
                    </ButtonLink>
                    <ButtonLink
                      href='/sandbox/button-link'
                      variant='ghost'
                      size='sm'
                    >
                      ghost
                    </ButtonLink>
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <ButtonLink
                      href='/sandbox/button-link'
                      variant='ghost'
                      leftIcon={HiPlus}
                      size='lg'
                    >
                      ghost
                    </ButtonLink>
                    <ButtonLink
                      href='/sandbox/button-link'
                      variant='ghost'
                      leftIcon={HiPlus}
                      size='base'
                    >
                      ghost
                    </ButtonLink>
                    <ButtonLink
                      href='/sandbox/button-link'
                      variant='ghost'
                      leftIcon={HiPlus}
                      size='sm'
                    >
                      ghost
                    </ButtonLink>
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <ButtonLink
                      href='/sandbox/button-link'
                      variant='ghost'
                      rightIcon={HiArrowRight}
                      size='lg'
                    >
                      ghost
                    </ButtonLink>
                    <ButtonLink
                      href='/sandbox/button-link'
                      variant='ghost'
                      rightIcon={HiArrowRight}
                      size='base'
                    >
                      ghost
                    </ButtonLink>
                    <ButtonLink
                      href='/sandbox/button-link'
                      variant='ghost'
                      rightIcon={HiArrowRight}
                      size='sm'
                    >
                      ghost
                    </ButtonLink>
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <ButtonLink
                      variant='ghost'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='lg'
                      href='/'
                    >
                      ghost
                    </ButtonLink>
                    <ButtonLink
                      variant='ghost'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='base'
                      href='/'
                    >
                      ghost
                    </ButtonLink>
                    <ButtonLink
                      variant='ghost'
                      leftIcon={HiPlus}
                      rightIcon={HiArrowRight}
                      size='sm'
                      href='/'
                    >
                      ghost
                    </ButtonLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* icon button */}
        <section>
          <div className='layout min-h-main flex flex-col gap-8 py-20'>
            <Typography as='h1' variant='j1'>
              Icon Button
            </Typography>

            <div className='grid gap-16 md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]'>
              <div>
                <Typography variant='b2'>Primary Variant</Typography>
                <div className='mt-4'>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <IconButton variant='primary' size='lg' icon={FiPlus} />
                    <IconButton variant='primary' icon={FiEye} />
                    <IconButton variant='primary' size='sm' icon={FiEdit2} />
                    <IconButton variant='primary' size='xs' icon={FiPlus} />
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <IconButton
                      variant='primary'
                      disabled
                      size='lg'
                      icon={FiPlus}
                    />
                    <IconButton variant='primary' disabled icon={FiEye} />
                    <IconButton
                      variant='primary'
                      disabled
                      size='sm'
                      icon={FiEdit2}
                    />
                    <IconButton
                      variant='primary'
                      disabled
                      size='xs'
                      icon={FiPlus}
                    />
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <IconButton
                      variant='primary'
                      isLoading
                      size='lg'
                      icon={FiPlus}
                    />
                    <IconButton variant='primary' isLoading icon={FiEye} />
                    <IconButton
                      variant='primary'
                      isLoading
                      size='sm'
                      icon={FiEdit2}
                    />
                    <IconButton
                      variant='primary'
                      isLoading
                      size='xs'
                      icon={FiPlus}
                    />
                  </div>
                </div>
              </div>

              <div>
                <Typography variant='b2'>Outline Variant</Typography>
                <div className='mt-4'>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <IconButton variant='outline' size='lg' icon={FiPlus} />
                    <IconButton variant='outline' icon={FiEye} />
                    <IconButton variant='outline' size='sm' icon={FiEdit2} />
                    <IconButton variant='outline' size='xs' icon={FiPlus} />
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <IconButton
                      variant='outline'
                      disabled
                      size='lg'
                      icon={FiPlus}
                    />
                    <IconButton variant='outline' disabled icon={FiEye} />
                    <IconButton
                      variant='outline'
                      disabled
                      size='sm'
                      icon={FiEdit2}
                    />
                    <IconButton
                      variant='outline'
                      disabled
                      size='xs'
                      icon={FiPlus}
                    />
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <IconButton
                      variant='outline'
                      isLoading
                      size='lg'
                      icon={FiPlus}
                    />
                    <IconButton variant='outline' isLoading icon={FiEye} />
                    <IconButton
                      variant='outline'
                      isLoading
                      size='sm'
                      icon={FiEdit2}
                    />
                    <IconButton
                      variant='outline'
                      isLoading
                      size='xs'
                      icon={FiPlus}
                    />
                  </div>
                </div>
              </div>

              <div>
                <Typography variant='b2'>Ghost Variant</Typography>
                <div className='mt-4'>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <IconButton variant='ghost' size='lg' icon={FiPlus} />
                    <IconButton variant='ghost' icon={FiEye} />
                    <IconButton variant='ghost' size='sm' icon={FiEdit2} />
                    <IconButton variant='ghost' size='xs' icon={FiPlus} />
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <IconButton
                      variant='ghost'
                      disabled
                      size='lg'
                      icon={FiPlus}
                    />
                    <IconButton variant='ghost' disabled icon={FiEye} />
                    <IconButton
                      variant='ghost'
                      disabled
                      size='sm'
                      icon={FiEdit2}
                    />
                    <IconButton
                      variant='ghost'
                      disabled
                      size='xs'
                      icon={FiPlus}
                    />
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <IconButton
                      variant='ghost'
                      isLoading
                      size='lg'
                      icon={FiPlus}
                    />
                    <IconButton variant='ghost' isLoading icon={FiEye} />
                    <IconButton
                      variant='ghost'
                      isLoading
                      size='sm'
                      icon={FiEdit2}
                    />
                    <IconButton
                      variant='ghost'
                      isLoading
                      size='xs'
                      icon={FiPlus}
                    />
                  </div>
                </div>
              </div>

              <div>
                <Typography variant='b2'>Light Variant</Typography>
                <div className='mt-4'>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <IconButton variant='light' size='lg' icon={FiPlus} />
                    <IconButton variant='light' icon={FiEye} />
                    <IconButton variant='light' size='sm' icon={FiEdit2} />
                    <IconButton variant='light' size='xs' icon={FiPlus} />
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <IconButton
                      variant='light'
                      disabled
                      size='lg'
                      icon={FiPlus}
                    />
                    <IconButton variant='light' disabled icon={FiEye} />
                    <IconButton
                      variant='light'
                      disabled
                      size='sm'
                      icon={FiEdit2}
                    />
                    <IconButton
                      variant='light'
                      disabled
                      size='xs'
                      icon={FiPlus}
                    />
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <IconButton
                      variant='light'
                      isLoading
                      size='lg'
                      icon={FiPlus}
                    />
                    <IconButton variant='light' isLoading icon={FiEye} />
                    <IconButton
                      variant='light'
                      isLoading
                      size='sm'
                      icon={FiEdit2}
                    />
                    <IconButton
                      variant='light'
                      isLoading
                      size='xs'
                      icon={FiPlus}
                    />
                  </div>
                </div>
              </div>

              <div>
                <Typography variant='b2'>Dark Variant</Typography>
                <div className='mt-4'>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <IconButton variant='dark' size='lg' icon={FiPlus} />
                    <IconButton variant='dark' icon={FiEye} />
                    <IconButton variant='dark' size='sm' icon={FiEdit2} />
                    <IconButton variant='dark' size='xs' icon={FiPlus} />
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <IconButton
                      variant='dark'
                      disabled
                      size='lg'
                      icon={FiPlus}
                    />
                    <IconButton variant='dark' disabled icon={FiEye} />
                    <IconButton
                      variant='dark'
                      disabled
                      size='sm'
                      icon={FiEdit2}
                    />
                    <IconButton
                      variant='dark'
                      disabled
                      size='xs'
                      icon={FiPlus}
                    />
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <IconButton
                      variant='dark'
                      isLoading
                      size='lg'
                      icon={FiPlus}
                    />
                    <IconButton variant='dark' isLoading icon={FiEye} />
                    <IconButton
                      variant='dark'
                      isLoading
                      size='sm'
                      icon={FiEdit2}
                    />
                    <IconButton
                      variant='dark'
                      isLoading
                      size='xs'
                      icon={FiPlus}
                    />
                  </div>
                </div>
              </div>

              <div>
                <Typography variant='b2'>Warning Variant</Typography>
                <div className='mt-4'>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <IconButton variant='warning' size='lg' icon={FiPlus} />
                    <IconButton variant='warning' icon={FiEye} />
                    <IconButton variant='warning' size='sm' icon={FiEdit2} />
                    <IconButton variant='warning' size='xs' icon={FiPlus} />
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <IconButton
                      variant='warning'
                      disabled
                      size='lg'
                      icon={FiPlus}
                    />
                    <IconButton variant='warning' disabled icon={FiEye} />
                    <IconButton
                      variant='warning'
                      disabled
                      size='sm'
                      icon={FiEdit2}
                    />
                    <IconButton
                      variant='warning'
                      disabled
                      size='xs'
                      icon={FiPlus}
                    />
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <IconButton
                      variant='warning'
                      isLoading
                      size='lg'
                      icon={FiPlus}
                    />
                    <IconButton variant='warning' isLoading icon={FiEye} />
                    <IconButton
                      variant='warning'
                      isLoading
                      size='sm'
                      icon={FiEdit2}
                    />
                    <IconButton
                      variant='warning'
                      isLoading
                      size='xs'
                      icon={FiPlus}
                    />
                  </div>
                </div>
              </div>

              <div>
                <Typography variant='b2'>Danger Variant</Typography>
                <div className='mt-4'>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <IconButton variant='danger' size='lg' icon={FiPlus} />
                    <IconButton variant='danger' icon={FiEye} />
                    <IconButton variant='danger' size='sm' icon={FiEdit2} />
                    <IconButton variant='danger' size='xs' icon={FiPlus} />
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <IconButton
                      variant='danger'
                      disabled
                      size='lg'
                      icon={FiPlus}
                    />
                    <IconButton variant='danger' disabled icon={FiEye} />
                    <IconButton
                      variant='danger'
                      disabled
                      size='sm'
                      icon={FiEdit2}
                    />
                    <IconButton
                      variant='danger'
                      disabled
                      size='xs'
                      icon={FiPlus}
                    />
                  </div>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <IconButton
                      variant='danger'
                      isLoading
                      size='lg'
                      icon={FiPlus}
                    />
                    <IconButton variant='danger' isLoading icon={FiEye} />
                    <IconButton
                      variant='danger'
                      isLoading
                      size='sm'
                      icon={FiEdit2}
                    />
                    <IconButton
                      variant='danger'
                      isLoading
                      size='xs'
                      icon={FiPlus}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* icon link */}
        <section>
          <div className='layout min-h-main flex flex-col gap-8 py-20'>
            <Typography as='h1' variant='j1'>
              Icon Button
            </Typography>

            <div className='grid gap-16 md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]'>
              <div>
                <Typography variant='b2'>Primary Variant</Typography>
                <div className='mt-4'>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <IconLink
                      href='/'
                      variant='primary'
                      size='lg'
                      icon={FiPlus}
                    />
                    <IconLink href='/' variant='primary' icon={FiEye} />
                    <IconLink
                      href='/'
                      variant='primary'
                      size='sm'
                      icon={FiEdit2}
                    />
                    <IconLink
                      href='/'
                      variant='primary'
                      size='xs'
                      icon={FiPlus}
                    />
                  </div>
                </div>
              </div>

              <div>
                <Typography variant='b2'>Outline Variant</Typography>
                <div className='mt-4'>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <IconLink
                      href='/'
                      variant='outline'
                      size='lg'
                      icon={FiPlus}
                    />
                    <IconLink href='/' variant='outline' icon={FiEye} />
                    <IconLink
                      href='/'
                      variant='outline'
                      size='sm'
                      icon={FiEdit2}
                    />
                    <IconLink
                      href='/'
                      variant='outline'
                      size='xs'
                      icon={FiPlus}
                    />
                  </div>
                </div>
              </div>

              <div>
                <Typography variant='b2'>Ghost Variant</Typography>
                <div className='mt-4'>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <IconLink
                      href='/'
                      variant='ghost'
                      size='lg'
                      icon={FiPlus}
                    />
                    <IconLink href='/' variant='ghost' icon={FiEye} />
                    <IconLink
                      href='/'
                      variant='ghost'
                      size='sm'
                      icon={FiEdit2}
                    />
                    <IconLink
                      href='/'
                      variant='ghost'
                      size='xs'
                      icon={FiPlus}
                    />
                  </div>
                </div>
              </div>

              <div>
                <Typography variant='b2'>Light Variant</Typography>
                <div className='mt-4'>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <IconLink
                      href='/'
                      variant='light'
                      size='lg'
                      icon={FiPlus}
                    />
                    <IconLink href='/' variant='light' icon={FiEye} />
                    <IconLink
                      href='/'
                      variant='light'
                      size='sm'
                      icon={FiEdit2}
                    />
                    <IconLink
                      href='/'
                      variant='light'
                      size='xs'
                      icon={FiPlus}
                    />
                  </div>
                </div>
              </div>

              <div>
                <Typography variant='b2'>Dark Variant</Typography>
                <div className='mt-4'>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <IconLink href='/' variant='dark' size='lg' icon={FiPlus} />
                    <IconLink href='/' variant='dark' icon={FiEye} />
                    <IconLink
                      href='/'
                      variant='dark'
                      size='sm'
                      icon={FiEdit2}
                    />
                    <IconLink href='/' variant='dark' size='xs' icon={FiPlus} />
                  </div>
                </div>
              </div>

              <div>
                <Typography variant='b2'>Warning Variant</Typography>
                <div className='mt-4'>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <IconLink
                      href='/'
                      variant='warning'
                      size='lg'
                      icon={FiPlus}
                    />
                    <IconLink href='/' variant='warning' icon={FiEye} />
                    <IconLink
                      href='/'
                      variant='warning'
                      size='sm'
                      icon={FiEdit2}
                    />
                    <IconLink
                      href='/'
                      variant='warning'
                      size='xs'
                      icon={FiPlus}
                    />
                  </div>
                </div>
              </div>

              <div>
                <Typography variant='b2'>Danger Variant</Typography>
                <div className='mt-4'>
                  <div className='mt-3 flex flex-wrap items-end gap-3'>
                    <IconLink
                      href='/'
                      variant='danger'
                      size='lg'
                      icon={FiPlus}
                    />
                    <IconLink href='/' variant='danger' icon={FiEye} />
                    <IconLink
                      href='/'
                      variant='danger'
                      size='sm'
                      icon={FiEdit2}
                    />
                    <IconLink
                      href='/'
                      variant='danger'
                      size='xs'
                      icon={FiPlus}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
