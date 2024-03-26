import * as React from 'react';
import { IconType } from 'react-icons';

import clsxm from '@/lib/clsxm';

import UnstyledLink, {
  UnstyledLinkProps,
} from '@/components/links/UnstyledLink';

const ButtonLinkVariant = [
  'primary',
  'outline',
  'ghost',
  'light',
  'dark',
] as const;
const ButtonLinkSize = ['sm', 'base', 'lg'] as const;

type ButtonLinkProps = {
  variant?: (typeof ButtonLinkVariant)[number];
  size?: (typeof ButtonLinkSize)[number];
  leftIcon?: IconType;
  rightIcon?: IconType;
  leftIconClassName?: string;
  rightIconClassName?: string;
} & UnstyledLinkProps;

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    {
      children,
      className,
      variant = 'primary',
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
      <UnstyledLink
        ref={ref}
        {...rest}
        className={clsxm(
          'inline-flex items-center rounded-full font-medium',
          'focus:outline-none focus-visible:ring',
          'hover:shadow-secondary-100/10 hover:-translate-y-[1px] hover:shadow-2xl',
          'transition-all duration-200 ease-out',
          //#region  //*=========== Size ===========
          [
            size === 'lg' && [
              'min-h-[2.75rem] px-6 md:min-h-[3rem]',
              'text-base',
              RightIcon && 'pr-4',
              LeftIcon && 'pl-4',
            ],
            size === 'base' && [
              'min-h-[2.25rem] px-4 md:min-h-[2.5rem]',
              'text-base',
              RightIcon && 'pr-2.5',
              LeftIcon && 'pl-2.5',
            ],
            size === 'sm' && [
              'min-h-[1.75rem] px-3 md:min-h-[2rem]',
              'text-sm',
              RightIcon && 'pr-2',
              LeftIcon && 'pl-2',
            ],
          ],
          //#endregion  //*======== Size ===========
          //#region  //*=========== Variants ===========
          [
            variant === 'primary' && [
              'bg-primary-600 text-typo',
              'hover:bg-primary-700',
              'active:bg-primary-800',
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
          ],
          //#endregion  //*======== Variants ===========
          className
        )}
      >
        {LeftIcon && (
          <div
            className={clsxm([
              size === 'lg' && 'mr-2',
              size === 'base' && 'mr-1.5',
              size === 'sm' && 'mr-1',
            ])}
          >
            <LeftIcon
              className={clsxm(
                [
                  size === 'lg' && 'text-lg md:text-base',
                  size === 'base' && 'text-base md:text-base',
                  size === 'sm' && 'text-sm md:text-base',
                ],
                leftIconClassName
              )}
            />
          </div>
        )}
        {children}
        {RightIcon && (
          <div
            className={clsxm([
              size === 'lg' && 'ml-2',
              size === 'base' && 'ml-1',
              size === 'sm' && 'ml-1.5',
            ])}
          >
            <RightIcon
              className={clsxm(
                [
                  size === 'base' && 'text-md md:text-md',
                  size === 'sm' && 'md:text-md text-sm',
                ],
                rightIconClassName
              )}
            />
          </div>
        )}
      </UnstyledLink>
    );
  }
);

export default ButtonLink;
