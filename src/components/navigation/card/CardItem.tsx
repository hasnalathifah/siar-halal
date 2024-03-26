import * as React from 'react';

import ProductImage from '@/components/images/ProductImage';
import UnstyledLink from '@/components/links/UnstyledLink';
import Typography from '@/components/typography/Typography';

import { imagePrefixUrl } from '@/constant/env';

import { Card } from '@/types/entities/card';

export default function CardItem({ data }: { data: Card }) {
  return (
    <UnstyledLink
      href={`/card/${data.id}`}
      className='hover:bg-secondary-800 flex w-full items-center gap-4  px-4 py-2'
    >
      <ProductImage
        src={imagePrefixUrl + data.images[0]}
        fill
        sizes='10vw'
        alt={`${data.name} Thumbnail`}
        className='relative aspect-square w-12 shrink-0 overflow-hidden rounded-sm'
        imgClassName='absolute inset-0 object-cover w-full h-full'
        blurClassName='bg-secondary-800/30'
        useSkeleton
        unoptimized
        quality={10}
      />
      <div className='w-full overflow-hidden '>
        <Typography variant='s2' className='truncate'>
          {data.name}
        </Typography>
        <Typography variant='c1' className='truncate'>
          {data.cardset} <span className='text-secondary-600'>|</span>{' '}
          {data.language}
        </Typography>{' '}
      </div>
    </UnstyledLink>
  );
}
