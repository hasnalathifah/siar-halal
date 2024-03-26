import * as React from 'react';
import { IconType } from 'react-icons';
import { ImSpinner2 } from 'react-icons/im';

import clsxm from '@/lib/clsxm';

const ButtonVariant = ['primary', 'outline', 'ghost', 'light', 'dark'] as const;
const ButtonSize = ['sm', 'base', 'lg'] as const;

type ButtonProps = {
  isLoading?: boolean;
  variant?: (typeof ButtonVariant)[number];
  size?: (typeof ButtonSize)[number];
  leftIcon?: IconType;
  rightIcon?: IconType;
  leftIconClassName?: string;
  rightIconClassName?: string;
} & React.ComponentPropsWithRef<'button'>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled: buttonDisabled,
      isLoading,
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
    const disabled = isLoading || buttonDisabled;

    return (
      <button
        ref={ref}
        type='button'
        disabled={disabled}
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
              'text-sm md:text-base',
              RightIcon && 'pr-2.5',
              LeftIcon && 'pl-2.5',
            ],
            size === 'sm' && [
              'min-h-[1.75rem] px-3 md:min-h-[2rem]',
              'text-xs md:text-sm',
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
              'disabled:bg-primary-400 disabled:text-secondary-300',
              'focus-visible:ring-primary-300',
            ],
            variant === 'outline' && [
              'text-secondary-100',
              'border-typo-divider border-2',
              'hover:bg-secondary-800',
              'active:bg-secondary-800',
              'disabled:bg-secondary-700 disabled:text-secondary-400',
              'focus-visible:ring-secondary-800',
            ],
            variant === 'ghost' && [
              'text-secondary-100',
              'hover:bg-secondary-800',
              'active:bg-secondary-800',
              'disabled:bg-secondary-700 disabled:text-secondary-400',
              'focus-visible:ring-secondary-800',
            ],
            variant === 'light' && [
              'text-typo-dark bg-secondary-50',
              'hover:bg-secondary-200',
              'active:bg-secondary-50',
              'disabled:bg-secondary-300 disabled:text-secondary-500',
              'focus-visible:ring-secondary-300',
            ],
            variant === 'dark' && [
              'bg-secondary-800 text-typo',
              'hover:bg-secondary-800',
              'active:bg-secondary-700',
              'disabled:bg-secondary-600 disabled:text-secondary-400',
              'focus-visible:ring-secondary-700',
            ],
          ],
          //#endregion  //*======== Variants ===========
          'disabled:cursor-not-allowed',
          isLoading &&
            'relative text-transparent transition-none hover:text-transparent disabled:cursor-wait disabled:text-transparent',
          className
        )}
        {...rest}
      >
        {isLoading && (
          <div
            className={clsxm(
              'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
              {
                'text-typo': ['primary', 'dark', 'outline', 'ghost'].includes(
                  variant
                ),
                'text-typo-dark': ['light'].includes(variant),
              }
            )}
          >
            <ImSpinner2 className='animate-spin' />
          </div>
        )}
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
      </button>
    );
  }
);

export default Button;
