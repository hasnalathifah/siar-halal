import * as React from 'react';
import { IconType } from 'react-icons';

import clsxm from '@/lib/clsxm';

const TAG_SIZE = ['sm', 'base'] as const;
type TagSize = (typeof TAG_SIZE)[number];

const TAG_COLOR = [
  'DEFAULT',
  'primary',
  'secondary',
  'success',
  'danger',
  'green',
  'warning',
  'purple',
] as const;
type TagColor = (typeof TAG_COLOR)[number];

type TagProps = {
  children: React.ReactNode;
  size?: TagSize;
  color?: TagColor;
  leftIcon?: IconType;
  rightIcon?: IconType;
  leftIconClassName?: string;
  rightIconClassName?: string;
} & React.ComponentPropsWithoutRef<'div'>;

const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  (
    {
      children,
      className,
      color = 'DEFAULT',
      size = 'base',
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      leftIconClassName,
      rightIconClassName,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        className={clsxm(
          [
            size === 'sm' && ['py-0.5 text-xs'],
            size === 'base' && ['py-1 text-sm'],
          ],

          //#region  //*=========== Color ===========
          color === 'DEFAULT' && 'bg-secondary-800 text-typo-secondary',
          color === 'primary' && 'bg-primary-700 text-typo',
          color === 'secondary' && 'bg-secondary-900 text-typo',
          color === 'danger' && 'text-typo bg-red-700',
          color === 'green' && 'text-typo bg-teal-600',
          color === 'purple' && 'text-typo bg-violet-600',
          color === 'warning' && 'text-typo bg-yellow-600 ',
          color === 'success' && 'text-typo bg-green-600',
          //#endregion  //*======== Color ===========
          'inline-flex items-center gap-1 rounded-full px-3 font-medium',
          LeftIcon && 'pl-3',
          RightIcon && 'pr-3',
          className
        )}
        ref={ref}
        {...rest}
      >
        {LeftIcon && (
          <div>
            <LeftIcon size='1em' className={clsxm(leftIconClassName)} />
          </div>
        )}
        {children}
        {RightIcon && (
          <div>
            <RightIcon size='1em' className={clsxm(rightIconClassName)} />
          </div>
        )}
      </div>
    );
  }
);

export default Tag;
