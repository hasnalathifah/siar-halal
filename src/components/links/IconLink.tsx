import * as React from 'react';
import { IconType } from 'react-icons';

import clsxm from '@/lib/clsxm';

import UnstyledLink, {
  UnstyledLinkProps,
} from '@/components/links/UnstyledLink';

const IconLinkVariant = [
  'primary',
  'outline',
  'ghost',
  'light',
  'dark',

  'danger',
  'warning',
] as const;
const IconLinkSize = ['xs', 'sm', 'base', 'lg'] as const;

type IconLinkProps = {
  variant?: (typeof IconLinkVariant)[number];
  size?: (typeof IconLinkSize)[number];
  icon?: IconType;
  iconClassName?: string;
} & Omit<UnstyledLinkProps, 'children'>;

const IconLink = React.forwardRef<HTMLAnchorElement, IconLinkProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'base',
      icon: Icon,
      iconClassName,
      ...rest
    },
    ref
  ) => {
    return (
      <UnstyledLink
        ref={ref}
        type='button'
        className={clsxm(
          'inline-flex shrink-0 items-center justify-center rounded-full font-medium',
          'focus:outline-none focus-visible:ring',
          'hover:shadow-secondary-100/10 hover:-translate-y-[1px] hover:shadow-2xl',
          'transition-all duration-200 ease-out',
          //#region  //*=========== Size ===========
          [
            size === 'lg' && [
              'min-h-[2.75rem] min-w-[2.75rem] md:min-h-[3rem] md:min-w-[3rem]',
              'text-base',
            ],
            size === 'base' && [
              'min-h-[2.25rem] min-w-[2.25rem] md:min-h-[2.5rem] md:min-w-[2.5rem]',
              'text-sm md:text-base',
            ],
            size === 'sm' && [
              'min-h-[1.75rem] min-w-[1.75rem] md:min-h-[2rem] md:min-w-[2rem]',
              'text-xs md:text-sm',
            ],
            size === 'xs' && ['p-1', 'text-xs md:text-sm'],
          ],
          //#region  //*=========== Variants ===========
          //#region  //*=========== Variants ===========
          [
            variant === 'primary' && [
              'bg-primary-600 text-typo',
              'hover:bg-primary-700',
              'active:bg-primary-800',
              'disabled:bg-primary-400 disabled:text-secondary-300',
              'focus-visible:ring-primary-300',
            ],
            variant === 'outline' && [
              'text-secondary-100',
              'border-typo-divider border-2',
              'hover:bg-secondary-800',
              'active:bg-secondary-800',
              'focus-visible:ring-secondary-800',
            ],
            variant === 'ghost' && [
              'text-secondary-100',
              'hover:bg-secondary-800',
              'active:bg-secondary-800',
              'focus-visible:ring-secondary-800',
            ],
            variant === 'light' && [
              'text-typo-dark bg-secondary-50',
              'hover:bg-secondary-200',
              'active:bg-secondary-50',
              'focus-visible:ring-secondary-300',
            ],
            variant === 'dark' && [
              'bg-secondary-800 text-typo',
              'hover:bg-secondary-800',
              'active:bg-secondary-700',
              'focus-visible:ring-secondary-700',
            ],
            variant === 'danger' && [
              'bg-red-500 text-white',
              'border border-red-600',
              'hover:bg-red-600 hover:text-white',
              'active:bg-red-700',
              'focus-visible:ring-red-400',
            ],
            variant === 'warning' && [
              'bg-amber-500 text-white',
              'border border-amber-500',
              'hover:bg-amber-600 hover:text-white',
              'active:bg-amber-700',
              'focus-visible:ring-amber-400',
            ],
          ],
          //#endregion  //*======== Variants ===========
          className
        )}
        {...rest}
      >
        {Icon && <Icon size='1em' className={clsxm(iconClassName)} />}
      </UnstyledLink>
    );
  }
);

export default IconLink;
