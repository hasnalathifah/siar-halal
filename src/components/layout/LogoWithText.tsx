import * as React from 'react';

import clsxm from '@/lib/clsxm';

import NextImage from '@/components/NextImage';

import { ExtractProps } from '@/types/helper';

export default function LogoWithText({
  className,
  ...props
}: Omit<ExtractProps<typeof NextImage>, 'src' | 'alt' | 'width' | 'height'>) {
  return (
    <NextImage
      src='/images/logo-with-text.svg'
      width={800}
      height={128}
      alt='Hype & Play'
      className={clsxm(['w-40', className])}
      {...props}
    />
  );
}
