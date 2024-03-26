import clsx from 'clsx';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import * as React from 'react';

import clsxm from '@/lib/clsxm';

import ProductImage from '@/components/images/ProductImage';
import UnstyledLink from '@/components/links/UnstyledLink';
import Typography from '@/components/typography/Typography';

import { imagePrefixUrl } from '@/constant/env';

import { CardSet } from '@/types/entities/card-set';

export default function CardSetView({ data }: { data: CardSet }) {
  return (
    <UnstyledLink
      href={`/card-set/${data.id}`}
      className={clsxm([
        'group',
        'flex flex-col gap-3 rounded-[1.25rem] p-3',
        'hover:bg-secondary-800/50 hover:backdrop-blur-sm',
        'transition-all duration-200 ease-out',
      ])}
    >
      <div
        className={clsx([
          'relative aspect-[5/3] w-full overflow-hidden rounded-xl',
          'border-secondary-700 shrink-0 border',
        ])}
      >
        <ProductImage
          src={imagePrefixUrl + data.image}
          fill
          sizes='(max-width: 768px) 100vw,(max-width: 1200px) 50vw'
          alt={data.name}
          className='absolute inset-0'
          imgClassName='w-full absolute inset-0 object-cover'
          useSkeleton
          unoptimized
        />
      </div>

      <div className='flex items-center justify-between gap-6'>
        <div>
          <Typography variant='s1'>{data.name}</Typography>
          <div className='mt-4 flex items-center gap-2'>
            <BookOpen size='1.25em' />
            <Typography variant='b3' color='secondary'>
              {data.language}
            </Typography>
          </div>
        </div>

        <div
          className={clsx([
            'h-12 w-12',
            'group-hover:h-14 group-hover:w-14',
            'transition-all duration-200 ease-out',
            'items-center justify-center',
            'border border-white',
            'inline-flex shrink-0 rounded-full',
          ])}
        >
          <ArrowUpRight
            size='1.5rem'
            className={clsx([
              'rotate-0 group-hover:rotate-45',
              'transition-all duration-200 ease-out',
              'text-white',
            ])}
          />
        </div>
      </div>
    </UnstyledLink>
  );
}
