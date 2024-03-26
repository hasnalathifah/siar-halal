import clsx from 'clsx';
import * as React from 'react';

import ArrowLink from '@/components/links/ArrowLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import NextImage from '@/components/NextImage';
import Typography from '@/components/typography/Typography';

import { imagePrefixUrl } from '@/constant/env';
import RoundedEdge from '@/graphic/RoundedEdge';

import { CardGame } from '@/types/entities/card-game';

export default function HeaderSection({ data }: { data: CardGame }) {
  return (
    <section
      className={clsx([
        'md:layout relative flex min-h-[18rem] w-full overflow-hidden md:rounded-3xl',
        'bg-cover bg-fixed bg-center bg-no-repeat ',
      ])}
      style={{ backgroundImage: `url(${imagePrefixUrl + data.landing_image})` }}
    >
      {data.logo_image ? (
        <NextImage
          src={imagePrefixUrl + data.logo_image}
          fill
          sizes='(max-width: 768px) 100vw,(max-width: 1200px) 50vw'
          alt={data.name}
          className={clsx([
            'pointer-events-none z-20',
            'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
            'aspect-video w-[16rem]',
          ])}
          imgClassName='w-full absolute object-contain'
        />
      ) : (
        <Typography
          variant='j1'
          className={clsx([
            'z-20',
            'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
            'w-[16rem] text-center',
          ])}
          color='purple-gradient'
        >
          {data.name}
        </Typography>
      )}

      <div className='absolute bottom-0 right-0 z-20 flex'>
        <RoundedEdge direction='top-left' className='fill-white/60' />
        <div className='z-10 flex h-12 flex-col items-end justify-center bg-white/60 pr-6'>
          <Typography variant='c1' className='text-secondary-700'>
            Card Game
          </Typography>
          <Typography variant='b2' color='black'>
            {data.name}
          </Typography>
        </div>
      </div>

      <div className='absolute left-0 top-0 z-20 flex '>
        <div className='z-10 flex h-12 items-center  bg-white/60 pl-4'>
          <ArrowLink
            as={UnstyledLink}
            className='from group inline-flex items-center'
            direction='left'
            href='/'
            isGradient
          >
            <Typography
              variant='b3'
              className='group-hover:text-secondary-700 text-black transition-colors duration-200'
            >
              Back to Home
            </Typography>
          </ArrowLink>
        </div>
        <RoundedEdge direction='bottom-right' className='fill-white/60' />
      </div>

      {data.landing_image ? (
        <div
          className={clsx([
            'bg-secondary-800/50 pointer-events-none absolute inset-0',
          ])}
        ></div>
      ) : (
        <div
          className='absolute inset-0 opacity-80'
          style={{
            backgroundImage: 'url("/images/background/grid.png")',
          }}
        >
          <div className='from-secondary-900 via-secondary-900/90  to-secondary-900 absolute inset-0 bg-gradient-to-b  bg-repeat' />
        </div>
      )}
    </section>
  );
}
