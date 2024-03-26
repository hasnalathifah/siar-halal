import * as React from 'react';

import clsxm from '@/lib/clsxm';

import Skeleton from '@/components/Skeleton';

export default function CardSkeleton({
  className,
  ...rest
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={clsxm(['flex flex-col gap-3 rounded-3xl p-3', className])}
      {...rest}
    >
      <Skeleton className='relative aspect-square w-full shrink-0 overflow-hidden rounded-xl ' />

      <div>
        <Skeleton className='min-h-[1.75rem] w-3/4 rounded-full' />
        <Skeleton className='mt-1 min-h-[1rem] w-1/3 rounded-full' />
      </div>
      <div className='mt-auto flex items-center justify-end gap-2'>
        <Skeleton className='mt-1 min-h-[1rem] w-1/3 rounded-full' />
        <Skeleton className='mt-1 h-4 w-4  rounded-full' />
      </div>
      <div className='border-secondary-800 flex items-center justify-between border-t pt-3'>
        <Skeleton className='mt-1 min-h-[1.25rem] w-1/3 rounded-full' />

        <Skeleton className='min-h-[1.75rem] w-1/3 rounded-full px-3 md:min-h-[2rem]' />
      </div>
    </div>
  );
}
