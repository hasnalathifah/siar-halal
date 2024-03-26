import * as React from 'react';

import clsxm from '@/lib/clsxm';

const SIMPLE_CARD_SIZE = ['lg', 'base'] as const;
type SimpleCardSize = (typeof SIMPLE_CARD_SIZE)[number];

type SimpleCardProps = {
  size?: SimpleCardSize;
} & React.ComponentPropsWithoutRef<'div'>;

const SimpleCard = React.forwardRef<HTMLDivElement, SimpleCardProps>(
  ({ size = 'base', className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={clsxm(
          'border-typo-divider bg-secondary-800/30  border',
          'p-4 sm:p-6',
          [size === 'base' && ['rounded-xl'], size === 'lg' && ['rounded-3xl']],
          className
        )}
        {...rest}
      />
    );
  }
);

export default SimpleCard;
