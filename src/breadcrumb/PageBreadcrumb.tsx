import * as React from 'react';

import clsxm from '@/lib/clsxm';

import Breadcrumb from '@/breadcrumb/Breadcrumb';

import { ExtractProps } from '@/types/helper';

type PageBreadcrumbProps = {
  childClassName?: string;
  containerClassName?: string;
} & ExtractProps<typeof Breadcrumb>;

export default function PageBreadcrumb({
  childClassName,
  containerClassName,
  ...rest
}: PageBreadcrumbProps) {
  return (
    <header
      className={clsxm([
        'bg-secondary-900 border-secondary-800 sticky top-[calc(4.5rem)] z-10 flex h-fit items-start border-b',
        containerClassName,
      ])}
    >
      <div className={clsxm(['layout z-10 py-4', childClassName])}>
        <Breadcrumb {...rest} />
      </div>

      <div className='bg-secondary-800/50 absolute inset-0 w-full' />
    </header>
  );
}
