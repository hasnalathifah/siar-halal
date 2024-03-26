import clsx from 'clsx';
import get from 'lodash.get';
import * as React from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { IconType } from 'react-icons';

import clsxm from '@/lib/clsxm';

import Typography from '@/components/typography/Typography';

export type InputProps = {
  /** Input label */
  label: string | null;
  /**
   * id to be initialized with React Hook Form,
   * must be the same with the pre-defined types.
   */
  id: string;
  /** Input placeholder */
  placeholder?: string;
  /** Small text below input, useful for additional information */
  helperText?: string;
  /**
   * Input type
   * @example text, email, password
   */
  type?: React.HTMLInputTypeAttribute;
  /** Disables the input and shows defaultValue (can be set from React Hook Form) */
  readOnly?: boolean;
  /** Disable error style (not disabling error validation) */
  hideError?: boolean;
  /** Manual validation using RHF, it is encouraged to use yup resolver instead */
  validation?: RegisterOptions;
  leftIcon?: IconType | string;
  rightNode?: React.ReactNode;
  containerClassName?: string;
} & React.ComponentPropsWithoutRef<'input'>;

export default function Input({
  label,
  placeholder = '',
  helperText,
  id,
  type = 'text',
  disabled,
  readOnly = false,
  hideError = false,
  validation,
  leftIcon: LeftIcon,
  rightNode,
  className,
  containerClassName,
  ...rest
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = get(errors, id);
  const withLabel = label !== null;

  return (
    <div className={containerClassName}>
      {withLabel && (
        <Typography as='label' variant='s3' className='block' htmlFor={id}>
          {label}
        </Typography>
      )}
      <div className={clsx('relative', withLabel && 'mt-1')}>
        {LeftIcon && (
          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
            {typeof LeftIcon === 'string' ? (
              <Typography
                variant='b3'
                className={clsx(
                  (disabled || readOnly) && 'text-typo-secondary'
                )}
              >
                {LeftIcon}
              </Typography>
            ) : (
              <LeftIcon size='1em' className='text-secondary-500 text-base' />
            )}
          </div>
        )}
        <input
          {...register(id, validation)}
          {...rest}
          type={type}
          name={id}
          id={id}
          readOnly={readOnly}
          disabled={disabled}
          className={clsxm(
            'flex w-full px-4 py-0',
            'bg-secondary-900 text-typo rounded-full ',
            'border-typo-outline border-2',
            'min-h-[2.25rem] md:min-h-[2.5rem]',
            'placeholder:text-secondary-500',
            'focus:border-primary-600 focus:ring-primary-600',
            (readOnly || disabled) &&
              'bg-typo-disabled border-typo-disabled focus:border-typo-disabled text-typo-secondary cursor-not-allowed focus:ring-0',
            error && 'border-error focus:border-error focus:ring-error',
            LeftIcon && 'pl-9',
            rightNode && 'pr-10',
            className
          )}
          placeholder={placeholder}
          aria-describedby={id}
        />

        {rightNode && !(disabled || readOnly) && (
          <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
            {rightNode}
          </div>
        )}
      </div>
      {!(!hideError && error) && helperText && (
        <Typography variant='c1' color='secondary' className='mt-1'>
          {helperText}
        </Typography>
      )}
      {!hideError && error && (
        <Typography variant='c1' color='danger' className='mt-1'>
          {error?.message?.toString()}
        </Typography>
      )}
    </div>
  );
}
