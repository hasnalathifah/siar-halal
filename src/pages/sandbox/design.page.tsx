import clsx from 'clsx';
import * as React from 'react';

import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';
import PrimaryLink from '@/components/links/PrimaryLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';
import Skeleton from '@/components/Skeleton';
import Typography from '@/components/typography/Typography';

export default function DesignPage() {
  return (
    <Layout>
      <Seo templateTitle='Design' />

      <main>
        {/* base */}
        <section>
          <div className='layout min-h-main flex flex-col gap-8 py-20'>
            <Typography as='h1' variant='j1'>
              Base
            </Typography>
            <div className='space-y-2'>
              <h2 className='text-lg md:text-xl'>Colors</h2>

              <div className='flex flex-wrap gap-2 text-xs font-medium'>
                <div className='bg-primary-50 flex h-10 w-10 items-center justify-center rounded text-black'>
                  50
                </div>
                <div className='bg-primary-100 flex h-10 w-10 items-center justify-center rounded text-black'>
                  100
                </div>
                <div className='bg-primary-200 flex h-10 w-10 items-center justify-center rounded text-black'>
                  200
                </div>
                <div className='bg-primary-300 flex h-10 w-10 items-center justify-center rounded text-black'>
                  300
                </div>
                <div className='bg-primary-400 flex h-10 w-10 items-center justify-center rounded text-black'>
                  400
                </div>
                <div className='bg-primary-500 flex h-10 w-10 items-center justify-center rounded text-black'>
                  500
                </div>
                <div className='bg-primary-600 flex h-10 w-10 items-center justify-center rounded text-white'>
                  600
                </div>
                <div className='bg-primary-700 flex h-10 w-10 items-center justify-center rounded text-white'>
                  700
                </div>
                <div className='bg-primary-800 flex h-10 w-10 items-center justify-center rounded text-white'>
                  800
                </div>
                <div className='bg-primary-900 flex h-10 w-10 items-center justify-center rounded text-white'>
                  900
                </div>
                <div className='bg-primary-950 flex h-10 w-10 items-center justify-center rounded text-white'>
                  950
                </div>
              </div>
              <div className='flex flex-wrap gap-2 text-xs font-medium'>
                <div className='bg-secondary-50 flex h-10 w-10 items-center justify-center rounded text-black'>
                  50
                </div>
                <div className='bg-secondary-100 flex h-10 w-10 items-center justify-center rounded text-black'>
                  100
                </div>
                <div className='bg-secondary-200 flex h-10 w-10 items-center justify-center rounded text-black'>
                  200
                </div>
                <div className='bg-secondary-300 flex h-10 w-10 items-center justify-center rounded text-black'>
                  300
                </div>
                <div className='bg-secondary-400 flex h-10 w-10 items-center justify-center rounded text-black'>
                  400
                </div>
                <div className='bg-secondary-500 flex h-10 w-10 items-center justify-center rounded text-black'>
                  500
                </div>
                <div className='bg-secondary-600 flex h-10 w-10 items-center justify-center rounded text-white'>
                  600
                </div>
                <div className='bg-secondary-700 flex h-10 w-10 items-center justify-center rounded text-white'>
                  700
                </div>
                <div className='bg-secondary-800 flex h-10 w-10 items-center justify-center rounded text-white'>
                  800
                </div>
                <div className='bg-secondary-900 flex h-10 w-10 items-center justify-center rounded text-white'>
                  900
                </div>
                <div className='bg-secondary-950 flex h-10 w-10 items-center justify-center rounded text-white'>
                  950
                </div>
              </div>
            </div>

            <div className='space-y-2'>
              <h2 className='text-lg md:text-xl'>Typography</h2>
              <div className='mt-8'>
                <Typography as='h1' variant='j1'>
                  Jumbo 1 <span className='italic'>Jumbo 1</span>
                </Typography>
                <Typography as='h1' variant='j2'>
                  Jumbo 2 <span className='italic'>Jumbo 2</span>
                </Typography>
                <Typography as='h1' variant='j3'>
                  Jumbo 2 <span className='italic'>Jumbo 2</span>
                </Typography>
                <Typography variant='h1' as='h1'>
                  Heading 1 <span className='italic'>Heading 1</span>
                </Typography>
                <Typography variant='h2' as='h2'>
                  Heading 2 <span className='italic'>Heading 2</span>
                </Typography>
                <Typography variant='h3' as='h3'>
                  Heading 3 <span className='italic'>Heading 3</span>
                </Typography>
                <Typography variant='h4' as='h4'>
                  Heading 4 <span className='italic'>Heading 4</span>
                </Typography>
                <Typography variant='h5' as='h5'>
                  Heading 5 <span className='italic'>Heading 5</span>
                </Typography>
                <Typography variant='h6' as='h6'>
                  Heading 6 <span className='italic'>Heading 6</span>
                </Typography>
                <Typography variant='s1'>
                  Subtitle 1 <span className='italic'>Subtitle 1</span>
                </Typography>
                <Typography variant='s2'>
                  Subtitle 2 <span className='italic'>Subtitle 2</span>
                </Typography>
                <Typography variant='s3'>
                  Subtitle 3 <span className='italic'>Subtitle 3</span>
                </Typography>
                <Typography variant='b1'>
                  Body 1 <span className='italic'>Body 1</span>
                </Typography>
                <Typography variant='b2'>
                  Body 2 <span className='italic'>Body 2</span>
                </Typography>
                <Typography variant='b3'>
                  Body 3 <span className='italic'>Body 3</span>
                </Typography>
                <Typography variant='c1'>
                  Caption 1 <span className='italic'>Caption 1</span>
                </Typography>
                <Typography variant='c2'>
                  Caption 2 <span className='italic'>Caption 2</span>
                </Typography>
              </div>
              <div className='mt-8'>
                <Typography variant='h1' as='h1' color='primary'>
                  Primary
                </Typography>
                <Typography variant='h1' as='h1' color='secondary'>
                  Secondary
                </Typography>
                <Typography variant='h1' as='h1' color='tertiary'>
                  Tertiary
                </Typography>
              </div>
              <div className='mt-8'>
                <Typography
                  // No need to assign variant, use the class
                  className='h3 sm:h2 md:h1 lg:j1'
                >
                  Responsive
                </Typography>
              </div>
            </div>

            <div className='space-y-2'>
              <h2 className='text-lg md:text-xl'>Skeleton</h2>
              <p className={clsx('!mt-1 text-sm')}>
                Skeleton with shimmer effect
              </p>

              <div className='bg-secondary-800 mx-auto w-full max-w-sm rounded-md p-4'>
                <div className='flex space-x-4'>
                  <Skeleton className='h-10 w-10 rounded-full' />
                  <div className='flex-1 space-y-6 py-1'>
                    <Skeleton className='h-2 rounded' />

                    <div className='space-y-3'>
                      <div className='grid grid-cols-3 gap-4'>
                        <Skeleton className='col-span-2 h-2 rounded' />

                        <Skeleton className='col-span-1 h-2 rounded' />
                      </div>
                      <Skeleton className='h-2 rounded' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* links */}
        <section>
          <div className='layout min-h-main flex flex-col gap-8 py-20'>
            <Typography as='h1' variant='j1'>
              Links
            </Typography>

            <div className='space-y-2'>
              <h2 className='text-lg md:text-xl'>UnstyledLink</h2>
              <p className={clsx('!mt-1 text-sm')}>
                No style applied, differentiate internal and outside links, give
                custom cursor for outside links.
              </p>
              <div className='space-x-2'>
                <UnstyledLink href='/'>Internal Links</UnstyledLink>
                <UnstyledLink href='https://theodorusclarence.com'>
                  Outside Links
                </UnstyledLink>
              </div>
            </div>
            <div className='space-y-2'>
              <h2 className='text-lg md:text-xl'>PrimaryLink</h2>
              <p className={clsx('!mt-1 text-sm')}>
                Add styling on top of UnstyledLink, giving a primary color to
                the link.
              </p>
              <div className='space-x-2'>
                <PrimaryLink href='/'>Internal Links</PrimaryLink>
                <PrimaryLink href='https://theodorusclarence.com'>
                  Outside Links
                </PrimaryLink>
              </div>
            </div>
            <div className='space-y-2'>
              <h2 className='text-lg md:text-xl'>UnderlineLink</h2>
              <p className={clsx('!mt-1 text-sm')}>
                Add styling on top of UnstyledLink, giving a dotted and animated
                underline.
              </p>
              <div className='space-x-2'>
                <UnderlineLink href='/'>Internal Links</UnderlineLink>
                <UnderlineLink href='https://theodorusclarence.com'>
                  Outside Links
                </UnderlineLink>
              </div>
            </div>
            <div className='space-y-2'>
              <h2 className='text-lg md:text-xl'>ArrowLink</h2>
              <p className={clsx('!mt-1 text-sm')}>
                Useful for indicating navigation, I use this quite a lot, so why
                not build a component with some whimsy touch?
              </p>
              <div className='flex flex-wrap items-center gap-4'>
                <ArrowLink href='/' direction='left'>
                  Direction Left
                </ArrowLink>
                <ArrowLink href='/'>Direction Right</ArrowLink>
                <ArrowLink
                  as={UnstyledLink}
                  className='inline-flex items-center'
                  href='/'
                >
                  Polymorphic
                </ArrowLink>
                <ArrowLink
                  as={ButtonLink}
                  size='sm'
                  variant='light'
                  className='inline-flex items-center'
                  href='/'
                >
                  Polymorphic
                </ArrowLink>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
