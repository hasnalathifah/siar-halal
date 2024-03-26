import clsx from 'clsx';
import get from 'lodash.get';
import { RegisterOptions, useFormContext } from 'react-hook-form';

import clsxm from '@/lib/clsxm';

import Typography from '@/components/typography/Typography';

export type TextAreaProps = {
  label: string | null;
  id: string;
  placeholder?: string;
  helperText?: string;
  readOnly?: boolean;
  hideError?: boolean;
  validation?: RegisterOptions;
  containerClassName?: string;
} & React.ComponentPropsWithoutRef<'textarea'>;

export default function TextArea({
  label,
  placeholder = '',
  helperText,
  id,
  readOnly = false,
  hideError = false,
  validation,
  disabled,
  containerClassName,
  ...rest
}: TextAreaProps) {
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
        <textarea
          {...register(id, validation)}
          rows={3}
          {...rest}
          name={id}
          id={id}
          readOnly={readOnly}
          disabled={disabled}
          className={clsxm(
            'block w-full rounded-lg shadow-sm',
            'bg-secondary-900 text-typo rounded-[20px]',
            'border-typo-outline border-2',
            'focus:border-primary-600 focus:ring-primary-600',
            'placeholder:text-secondary-500',
            (readOnly || disabled) &&
              'bg-typo-disabled border-typo-disabled focus:border-typo-disabled text-typo-secondary cursor-not-allowed focus:ring-0',
            error && 'border-error focus:border-error focus:ring-error'
          )}
          placeholder={placeholder}
          aria-describedby={id}
        />
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
