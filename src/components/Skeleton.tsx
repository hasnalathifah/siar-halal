import * as React from 'react';

import clsxm from '@/lib/clsxm';

type SkeletonProps = React.ComponentPropsWithoutRef<'div'>;

export default function Skeleton({ className, ...rest }: SkeletonProps) {
  return (
    <div
      className={clsxm('bg-secondary-800 animate-pulse rounded-lg', className)}
      {...rest}
    />
  );
}
