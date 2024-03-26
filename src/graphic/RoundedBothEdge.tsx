import * as React from 'react';

import clsxm from '@/lib/clsxm';

type RoundedBothEdgeProps = {
  position?: 'left' | 'right';
} & React.ComponentPropsWithoutRef<'svg'>;

export default function RoundedBothEdge({
  position = 'right',
  className,
  ...rest
}: RoundedBothEdgeProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={112}
      fill='none'
      className={clsxm([
        'fill-secondary-900',
        [position === 'left' && '-scale-100'],
        [position === 'right' && ''],
        className,
      ])}
      {...rest}
    >
      <path d='M24 112V0a8.782 8.782 0 0 1-5.34 8.06l-.605.256-.055.079L7.903 12.62c-2.433 1.02-3.65 1.529-4.602 2.289a8.785 8.785 0 0 0-2.969 4.478C0 20.564 0 21.891 0 24.543v62.914c0 2.652 0 3.979.332 5.155a8.785 8.785 0 0 0 2.969 4.478c.952.76 2.169 1.27 4.602 2.289L18 103.605l.055.079.605.256A8.782 8.782 0 0 1 24 112Z' />
    </svg>
  );
}
