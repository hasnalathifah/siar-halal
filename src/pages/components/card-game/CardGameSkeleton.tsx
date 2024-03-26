import clsx from 'clsx';
import * as React from 'react';

import clsxm from '@/lib/clsxm';

import Skeleton from '@/components/Skeleton';
import Typography from '@/components/typography/Typography';

import RoundedEdge from '@/graphic/RoundedEdge';

export default function CardGameSkeleton({
  className,
  ...rest
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={clsxm([
        'relative h-fit select-none rounded-[1.25rem] bg-white p-2',
        'transition-all duration-200 ease-out',
        className,
      ])}
      {...rest}
    >
      <Skeleton className='bg-secondary-200 pointer-events-none aspect-[3/4] w-full overflow-hidden rounded-xl' />

      <Skeleton
        className={clsx([
          'pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
          'bg-secondary-200 aspect-video w-2/3 ',
        ])}
      />

      <div className='absolute right-2 top-2 flex'>
        <RoundedEdge direction='bottom-left' />
        <div className='z-10 -ml-[4px] h-12 bg-white pr-2'>
          <Typography variant='c1' color='secondary'>
            Card Game
          </Typography>
          <Skeleton className='bg-secondary-200 mt-1 h-5 w-2/3 rounded-full' />
        </div>
      </div>

      <div className='absolute inset-x-2 bottom-2 flex'>
        <div className='flex'>
          <div className='z-10 -mr-[4px] flex h-12 min-w-[5.5rem] flex-col justify-end bg-white pl-2'>
            <Typography
              variant='c1'
              color='secondary'
              className='whitespace-nowrap'
            >
              Card Count
            </Typography>
            <Skeleton className='bg-secondary-200 mt-1 h-5 w-2/3 rounded-full' />
          </div>
          <RoundedEdge direction='top-right' />
        </div>
        <CardGameButton />
      </div>
    </div>
  );
}
function CardGameButton() {
  return (
    <div className='-ml-6 mr-[5px] flex  w-full  pb-[5px] pt-0'>
      {' '}
      <div className='group relative flex  h-full w-full'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width={32}
          height={43}
          fill='none'
          className='fill-secondary-300 -mr-[0.5px] h-full'
        >
          <mask
            id='a'
            width={32}
            height={43}
            x={0}
            y={0}
            maskUnits='userSpaceOnUse'
            style={{
              maskType: 'alpha',
            }}
          >
            <path fill='#D9D9D9' d='M0 0h32v43H0z' />
          </mask>
          <g mask='url(#a)'>
            <path d='M1.881 8.5C.06 4.527 2.963 0 7.335 0h118.343c6.694 0 12.12 5.426 12.12 12.12v18.76c0 6.694-5.426 12.12-12.12 12.12H25.398a12 12 0 0 1-10.909-6.999L1.881 8.501Z' />
          </g>
        </svg>
        <div className='bg-secondary-300  -ml-[1px] h-full w-full rounded-r-lg' />
      </div>
    </div>
  );
}
