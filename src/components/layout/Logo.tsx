import * as React from 'react';

import clsxm from '@/lib/clsxm';

import NextImage from '@/components/NextImage';

import { ExtractProps } from '@/types/helper';

export default function Logo({
  className,
  ...props
}: Omit<ExtractProps<typeof NextImage>, 'src' | 'alt' | 'width' | 'height'>) {
  return (
    <NextImage
      src='/images/logo.svg'
      width={48}
      height={48}
      alt='Hype & Play'
      className={clsxm(['w-8', className])}
      {...props}
    />
  );
}
