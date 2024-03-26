import * as React from 'react';

import clsxm from '@/lib/clsxm';

export default function Noise({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={clsxm(
        'bg-noise pointer-events-none absolute inset-0 mix-blend-overlay invert',
        className
      )}
      {...props}
    />
  );
}
