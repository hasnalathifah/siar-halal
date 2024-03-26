import * as React from 'react';

import Skeleton from '@/components/Skeleton';

export default function CardSkeleton() {
  return (
    <div className='flex items-center gap-4 px-4 py-2'>
      <Skeleton className='aspect-square w-12 shrink-0 rounded-sm' />
      <div className='w-full'>
        <Skeleton className='h-4 w-1/2 rounded-full' />
        <Skeleton className='mt-1 h-3 w-1/3 rounded-full' />
      </div>
    </div>
  );
}
