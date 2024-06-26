import clsx from 'clsx';
import idLocale from 'date-fns/locale/id';
import get from 'lodash.get';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import { HiOutlineCalendar } from 'react-icons/hi';

import 'react-datepicker/dist/react-datepicker.css';

import clsxm from '@/lib/clsxm';

import Typography from '@/components/typography/Typography';

type DatePickerProps = {
  validation?: RegisterOptions;
  label: string | null;
  id: string;
  placeholder?: string;
  defaultYear?: number;
  defaultMonth?: number;
  defaultValue?: string;
  helperText?: string;
  readOnly?: boolean;
  /** Disable error style (not disabling error validation) */
  hideError?: boolean;
  containerClassName?: string;
} & Omit<ReactDatePickerProps, 'onChange'>;

export default function DatePicker({
  validation,
  label,
  id,
  placeholder,
  defaultYear,
  defaultMonth,
  defaultValue,
  helperText,
  readOnly = false,
  hideError = false,
  disabled,
  containerClassName,
  ...rest
}: DatePickerProps) {
  const {
    formState: { errors },
    control,
  } = useFormContext();
  const error = get(errors, id);
  const withLabel = label !== null;

  // If there is a year default, then change the year to the props
  const defaultDate = new Date();
  if (defaultYear) defaultDate.setFullYear(defaultYear);
  if (defaultMonth) defaultDate.setMonth(defaultMonth);

  return (
    <div className={clsxm('relative', containerClassName)}>
      {withLabel && (
        <Typography as='label' variant='s3' className='block' htmlFor={id}>
          {label}
        </Typography>
      )}

      <Controller
        control={control}
        rules={validation}
        defaultValue={defaultValue}
        name={id}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <div className={clsx('relative', withLabel && 'mt-1')}>
              <ReactDatePicker
                name={id}
                onChange={onChange}
                onBlur={onBlur}
                selected={value ? new Date(value) : undefined}
                className={clsxm(
                  'flex w-full px-4 py-0',
                  ' bg-secondary-900 text-typo rounded-full ',
                  'border-typo-outline border-2',
                  'min-h-[2.25rem] md:min-h-[2.5rem]',
                  'placeholder:text-secondary-500',
                  'focus:border-primary-600 focus:ring-primary-600',
                  (readOnly || disabled) &&
                    'bg-typo-disabled border-typo-disabled focus:border-typo-disabled text-typo-secondary cursor-not-allowed focus:ring-0',
                  error && 'border-error focus:border-error focus:ring-error'
                )}
                placeholderText={placeholder}
                aria-describedby={id}
                showMonthDropdown
                showYearDropdown
                dropdownMode='select'
                openToDate={value ? new Date(value) : defaultDate}
                dateFormat='dd/MM/yyyy'
                readOnly={readOnly}
                disabled={disabled}
                locale={idLocale}
                // This is a workaround to fix the z-index issue
                portalId='datepicker-portal'
                {...rest}
              />
              <HiOutlineCalendar className='text-typo-icons pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 transform text-lg' />
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
          </>
        )}
      />
    </div>
  );
}
