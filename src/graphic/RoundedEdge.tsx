import * as React from 'react';

import clsxm from '@/lib/clsxm';

type RoundedEdgeProps = {
  direction: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
} & React.ComponentPropsWithoutRef<'svg'>;

export default function RoundedEdge({
  direction,
  className,
  ...rest
}: RoundedEdgeProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={48}
      height={48}
      fill='none'
      className={clsxm([
        'fill-white',
        [direction === 'top-left' && '-scale-x-100'],
        [direction === 'top-right' && ''],
        [direction === 'bottom-left' && '-scale-100'],
        [direction === 'bottom-right' && '-scale-y-100'],
        className,
      ])}
      {...rest}
    >
      <g clipPath='url(#a)'>
        <path d='M10.068.664C7.771 0 5.18 0 0 0v48h48c-6.9 0-13.129-4.209-15.807-10.681l-.637-1.33-8.272-20.182c-1.99-4.868-2.985-7.302-4.47-9.205A17.136 17.136 0 0 0 10.068.664Z' />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h48v48H0z' />
        </clipPath>
      </defs>
    </svg>
  );
}
