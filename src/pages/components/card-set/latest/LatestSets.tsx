import clsx from 'clsx';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import * as React from 'react';

import clsxm from '@/lib/clsxm';

import ProductImage from '@/components/images/ProductImage';
import ButtonLink from '@/components/links/ButtonLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Typography from '@/components/typography/Typography';

import { imagePrefixUrl } from '@/constant/env';

import { CardSet, CardSetByLanguage } from '@/types/entities/card-set';
import { ExtractProps } from '@/types/helper';

type LatestSets = {
  data: CardSetByLanguage;

  order: number;
};

export default function LatestSets({ data, order }: LatestSets) {
  const router = useRouter();
  const { id: cardGameId } = router.query;
  const direction = order % 2 === 0 ? 'left' : 'right';
  return (
    <div
      className={clsxm([
        'border-secondary-700 border',
        'flex flex-col',
        'min-h-[12rem] overflow-hidden rounded-3xl',
        'flex-col-reverse',
        [
          [direction === 'left' && ' md:flex-row'],
          [direction === 'right' && ' md:flex-row-reverse'],
        ],
      ])}
    >
      <div
        className={clsxm([
          'flex  shrink-0 flex-col justify-center p-8 pt-6 md:pt-8',
          'w-full items-start md:w-[35%] ',
          [
            [direction === 'left' && 'md:items-start'],
            [direction === 'right' && 'md:items-end'],
          ],
        ])}
      >
        <Typography as='h1' variant='h1'>
          {data.language}
        </Typography>
        <Typography variant='b3' className='mt-1'>
          View all card sets with {data.language} language
        </Typography>
        <ButtonLink
          href={queryString.stringifyUrl({
            url: `/language/${data.category_id}`,
            query: {
              'card-game': cardGameId,
            },
          })}
          variant='light'
          className='mt-5'
        >
          View More
        </ButtonLink>
      </div>
      <div className='relative min-h-[8rem] w-full md:min-h-0 '>
        <div
          className={clsx([
            'absolute flex h-full',
            // ' bg-white',
            '-left-[3.25%] -right-[6.5%]',
            [
              [direction === 'left' && 'md:-right-[3.25%] md:left-[3.25%]'],
              [direction === 'right' && 'md:-left-[3.25%] md:right-[3.25%]'],
            ],
          ])}
        >
          {data.cardsets.map((set, i) => (
            <LandingSet key={i} data={set} className='-mx-[3.25%] ' href='/' />
          ))}
        </div>
      </div>
    </div>
  );
}

type LandingSetProps = {
  data: CardSet;
} & Omit<ExtractProps<typeof UnstyledLink>, 'children'>;

function LandingSet({ className, data }: LandingSetProps) {
  return (
    <UnstyledLink
      href={`/card-set/${data.id}`}
      className={clsxm(['relative flex h-full w-full', className])}
      style={{ clipPath: 'polygon(18% 0, 100% 0%, 82% 100%, 0 100%)' }}
    >
      <div
        className={clsx([
          'group absolute inset-0 z-10',
          'from-secondary-800 bg-gradient-to-t to-transparent',
          'flex flex-col justify-end',
          'px-[18%] pb-8',
          'hover:bg-secondary-800/60',
          'transition-all duration-200 ease-out',
        ])}
      >
        <Typography
          as='h1'
          variant='j3'
          className={clsx([
            'truncate',
            'translate-y-full opacity-0',
            'group-hover:translate-y-0 group-hover:opacity-100',
            'transition-all duration-200 ease-out',
          ])}
        >
          {data.name}
        </Typography>
        <Typography
          variant='b2'
          className={clsx([
            'truncate',
            'translate-y-full opacity-0',
            'group-hover:translate-y-0 group-hover:opacity-100',
            'transition-all delay-75 duration-200 ease-out',
          ])}
        >
          {data.name}
        </Typography>
      </div>
      <ProductImage
        src={imagePrefixUrl + data.image}
        fill
        sizes='(max-width: 768px) 100vw,(max-width: 1200px) 50vw'
        alt={`${data.name} Photo`}
        className='absolute inset-0 w-full'
        imgClassName='object-cover w-full h-full'
        blurClassName='bg-secondary-800/30'
        useSkeleton
        unoptimized
      />
    </UnstyledLink>
  );
}
