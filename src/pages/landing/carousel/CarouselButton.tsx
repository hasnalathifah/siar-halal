import clsx from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';

import clsxm from '@/lib/clsxm';

import IconButton from '@/components/buttons/IconButton';

import RoundedBothEdge from '@/graphic/RoundedBothEdge';

import { ExtractProps } from '@/types/helper';

type CarouselButtonProps = {
  position: ExtractProps<typeof RoundedBothEdge>['position'];
  containerClassName?: string;
} & ExtractProps<typeof IconButton>;

const positionClassName = 'absolute top-1/2 -translate-y-1/2';
const iconClassName =
  'text-2xl transition-all duration-200 group-hover:text-primary-400';

export default function CarouselButton({
  position,
  containerClassName,
  ...rest
}: CarouselButtonProps) {
  return (
    <button
      className={clsxm([
        positionClassName,
        'group',
        [
          position === 'left' && '-left-[0.5px]',
          position === 'right' && '-right-[0.5px]',
        ],
        containerClassName,
      ])}
      {...rest}
    >
      <RoundedBothEdge position={position} />
      {position === 'left' && (
        <ChevronLeft
          className={clsx([
            positionClassName,
            iconClassName,
            'left-0 -translate-x-[15%]',
            'group-hover:-translate-x-1/4',
          ])}
        />
      )}
      {position === 'right' && (
        <ChevronRight
          className={clsx([
            positionClassName,
            iconClassName,
            'right-0 translate-x-[15%]',
            'group-hover:translate-x-1/4',
          ])}
        />
      )}
    </button>
  );
}
