import clsx from 'clsx';
import * as React from 'react';

import clsxm from '@/lib/clsxm';

import ProductImage from '@/components/images/ProductImage';
import UnstyledLink from '@/components/links/UnstyledLink';
import Typography from '@/components/typography/Typography';

import { LOCALE } from '@/constant/common';
import { imagePrefixUrl } from '@/constant/env';
import { DEFAULT_ICON } from '@/constant/icon';

import { Card } from '@/types/entities/card';

type CardView = { data: Card };

export default function CardView({ data }: CardView) {
  return (
    <UnstyledLink
      href={`/card/${data.id}`}
      className={clsxm([
        'flex flex-col gap-3 rounded-3xl p-3',
        'hover:bg-secondary-800/50 hover:backdrop-blur-sm',
        'transition-all duration-200 ease-out',
      ])}
    >
      <div
        className={clsx([
          'relative aspect-square w-full overflow-hidden rounded-xl',
          'border-secondary-700 shrink-0 border',
        ])}
      >
        <ProductImage
          src={imagePrefixUrl + data.images[0]}
          fill
          sizes='(max-width: 768px) 100vw,(max-width: 1200px) 50vw'
          alt={data.name}
          className='absolute inset-0'
          imgClassName='w-full absolute inset-0 object-contain'
          blurClassName='bg-secondary-800/30'
          useSkeleton
          unoptimized
        />
      </div>

      <div>
        <Typography variant='s1'>{data.name}</Typography>
        <Typography variant='b3' color='secondary' className='mt-1'>
          {data.cardset}
        </Typography>
      </div>
      <div className='mt-auto flex items-center justify-end gap-2'>
        <Typography variant='b3' color='secondary'>
          {data.language}
        </Typography>
        <DEFAULT_ICON.language size='1.25em' />
      </div>
      <div className='border-secondary-800 flex items-center justify-between border-t pt-3'>
        <Typography variant='s2'>
          Rarity <span className='text-purple-gradient'>{data.rarity}</span>
        </Typography>

        <div
          className={clsx([
            'min-h-[2.25rem] px-4 md:min-h-[2.5rem]',
            'text-base',
            'text-secondary-100',
            'border-typo-divider border-2',
            'inline-flex items-center rounded-full',
          ])}
        >
          {data.price?.toLocaleString(LOCALE)}
        </div>
      </div>
    </UnstyledLink>
  );
}
