import * as React from 'react';

import clsxm from '@/lib/clsxm';

import Skeleton from '@/components/Skeleton';

export default function CardSetSkeleton({
  className,
  ...rest
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={clsxm([
        'flex flex-col gap-3 rounded-[1.25rem] p-3',
        className,
      ])}
      {...rest}
    >
      <Skeleton className='relative aspect-[5/3] w-full shrink-0 overflow-hidden rounded-xl' />
      <div className='flex items-center justify-between gap-6'>
        <div className='w-full'>
          <Skeleton className='min-h-[1.75rem] w-3/4 rounded-full' />
          <div className='mt-4 flex items-center gap-2'>
            <Skeleton className='mt-1 h-4 w-4  rounded-full' />
            <Skeleton className='mt-1 min-h-[1rem] w-1/3 rounded-full' />
          </div>
        </div>
        <Skeleton className='inline-flex h-12 w-12 shrink-0 rounded-full' />
      </div>
    </div>
  );
}
