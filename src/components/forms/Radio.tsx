import clsx from 'clsx';
import get from 'lodash.get';
import * as React from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';

import clsxm from '@/lib/clsxm';

import Typography from '@/components/typography/Typography';

export type RadioProps = {
  /** Input label */
  label: string;
  name: string;
  value: string;
  /** Small text below input, useful for additional information */
  helperText?: string;
  /** Disables the input and shows defaultValue (can be set from React Hook Form) */
  readOnly?: boolean;
  /** Disable error style (not disabling error validation) */
  hideError?: boolean;
  /** Manual validation using RHF, it is encouraged to use yup resolver instead */
  validation?: RegisterOptions;
  containerClassName?: string;
} & React.ComponentPropsWithoutRef<'input'>;

export default function Radio({
  label,
  placeholder = '',
  helperText,
  name,
  value,
  readOnly = false,
  hideError = false,
  validation,
  disabled,
  containerClassName,
  ...rest
}: RadioProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = get(errors, name);
  disabled = disabled || readOnly;

  return (
    <div className={containerClassName}>
      <div className='flex items-center gap-2'>
        <input
          {...register(name, validation)}
          {...rest}
          type='radio'
          name={name}
          id={`${name}_${value}`}
          value={value}
          disabled={disabled}
          readOnly={readOnly}
          className={clsxm(
            'shrink-0 cursor-pointer',
            'rounded-full focus:ring-0 focus:ring-offset-0',
            'checked:bg-primary-500 checked:hover:bg-primary-600 checked:focus:bg-primary-500 checked:active:bg-primary-700',
            'bg-secondary-900',
            'border-typo-outline border-2',
            (readOnly || disabled) &&
              'disabled:checked:bg-primary-400 bg-secondary-700 cursor-not-allowed',
            error && 'border-error'
          )}
          placeholder={placeholder}
          aria-describedby={name}
        />
        <Typography
          className={clsx(
            (readOnly || disabled) && 'text-typo/50 cursor-not-allowed'
          )}
          as='label'
          htmlFor={`${name}_${value}`}
          variant='b2'
        >
          {label}
        </Typography>
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
