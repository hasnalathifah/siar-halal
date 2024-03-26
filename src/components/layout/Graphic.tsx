import clsx from 'clsx';
import * as React from 'react';
import { IconType } from 'react-icons';

import clsxm from '@/lib/clsxm';

type GraphicProps = {
  className?: string;
  withGridGraphic?: boolean;
  withIconGraphic?: IconType;
};
export default function Graphic({
  className,
  withGridGraphic = false,
  withIconGraphic: IconGraphic,
}: GraphicProps) {
  return (
    <div
      className={clsxm([
        'pointer-events-none absolute inset-0 flex overflow-hidden',
        className,
      ])}
    >
      {withGridGraphic && (
        <div
          className='absolute inset-0 z-[1] opacity-30'
          style={{
            backgroundImage: 'url("/images/background/grid.png")',
          }}
        >
          <div className='from-secondary-900 via-secondary-900/90  to-secondary-900 absolute inset-0 bg-gradient-to-b  bg-repeat' />
        </div>
      )}
      {IconGraphic && (
        <div
          className={clsx([
            'absolute right-0 top-0 h-[calc(30vw)] w-[calc(30vw)]',
            'origin-bottom-left -translate-y-1/3 translate-x-1/3 rotate-12',
          ])}
        >
          <IconGraphic
            className={clsx([
              'text-primary-950 absolute right-0 top-0 h-full w-full ',
            ])}
          />
          <div
            className={clsx([
              'absolute inset-0 bg-gradient-to-bl',
              'to-secondary-900 from-secondary-900 via-transparent',
            ])}
          ></div>
        </div>
      )}
    </div>
  );
}
