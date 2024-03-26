import clsx from 'clsx';
import get from 'lodash.get';
import { useState } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { HiEye, HiEyeOff } from 'react-icons/hi';

import clsxm from '@/lib/clsxm';

import Typography from '@/components/typography/Typography';

export type PasswordInputProps = {
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
  containerClassName?: string;
} & React.ComponentPropsWithoutRef<'input'>;

export default function PasswordInput({
  label,
  placeholder = '',
  helperText,
  id,
  readOnly = false,
  hideError,
  validation,
  disabled,
  containerClassName,
  ...rest
}: PasswordInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = get(errors, id);
  const withLabel = label !== null;

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <div className={containerClassName}>
      {withLabel && (
        <Typography as='label' variant='s3' className='block' htmlFor={id}>
          {label}
        </Typography>
      )}
      <div className={clsx('relative', withLabel && 'mt-1')}>
        <input
          {...register(id, validation)}
          {...rest}
          type={showPassword ? 'text' : 'password'}
          name={id}
          id={id}
          readOnly={readOnly}
          disabled={disabled}
          className={clsxm(
            'flex w-full px-4 py-0',
            ' bg-secondary-900 text-typo rounded-full ',
            'border-typo-outline border-2',
            'min-h-[2.25rem] md:min-h-[2.5rem]',
            'placeholder:text-secondary-500',
            'focus:border-primary-600 focus:ring-primary-600',
            (readOnly || disabled) &&
              'bg-typo-disabled border-typo-disabled focus:border-typo-disabled text-typo/50 cursor-not-allowed focus:ring-0',
            error && 'border-error focus:border-error focus:ring-error'
          )}
          placeholder={placeholder}
          aria-describedby={id}
        />

        {!(readOnly || disabled) && (
          <button
            onClick={togglePassword}
            type='button'
            className='focus:ring-typo-outline absolute right-0 top-1/2 mr-3 flex -translate-y-1/2 items-center rounded-full p-1 focus:outline-none focus:ring'
          >
            {showPassword ? (
              <HiEyeOff className='text-typo-icons hover:text-typo-secondary cursor-pointer text-base' />
            ) : (
              <HiEye className='text-typo-icons hover:text-typo-secondary cursor-pointer text-base' />
            )}
          </button>
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
