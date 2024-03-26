import clsx from 'clsx';
import * as React from 'react';

import clsxm from '@/lib/clsxm';

import Skeleton from '@/components/Skeleton';

type LatestSetsSkeleton = {
  order: number;
};

export default function LatestSetsSkeleton({ order }: LatestSetsSkeleton) {
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
        <Skeleton className='bg-secondary-700 h-6 w-1/3 rounded-full' />
        <Skeleton className='bg-secondary-700 mt-1 h-3.5 w-1/2 rounded-full' />

        <Skeleton className='bg-secondary-700 mt-5 min-h-[2.25rem] w-1/3 rounded-full md:min-h-[2.5rem]' />
      </div>
      <div className='relative min-h-[8rem] w-full md:min-h-0 '>
        <div
          className={clsx([
            'absolute flex h-full',
            '-left-[3.25%] -right-[6.5%]',
            [
              [direction === 'left' && 'md:-right-[3.25%] md:left-[3.25%]'],
              [direction === 'right' && 'md:-left-[3.25%] md:right-[3.25%]'],
            ],
          ])}
        >
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={clsxm(['relative flex h-full w-full', '-mx-[3.25%]'])}
              style={{ clipPath: 'polygon(18% 0, 100% 0%, 82% 100%, 0 100%)' }}
            >
              <Skeleton className='bg-secondary-700/50 absolute inset-0 rounded-none' />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
