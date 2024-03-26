import * as React from 'react';

import NextImage from '@/components/NextImage';
import Noise from '@/components/Noise';

export default function CarouselGraphic() {
  return (
    <div className='absolute inset-0 '>
      <NextImage
        src='/images/background/bg.png'
        width={1080}
        height={1080}
        alt='Carousel Background'
        className='pointer-events-none absolute inset-0 w-full'
      />
      <Noise />
    </div>
  );
}
