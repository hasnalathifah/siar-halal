import clsx from 'clsx';
import get from 'lodash.get';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import { FiChevronDown, FiX } from 'react-icons/fi';
import Select, { components, MultiValue, StylesConfig } from 'react-select';

import Typography from '@/components/typography/Typography';

import { ExtractProps } from '@/types/helper';

export type SelectOptions = { value: string; label: string };

export type SearchableSelectInputProps = {
  label: string | null;
  id: string;
  placeholder?: React.ReactNode;
  helperText?: string;
  type?: string;
  isMulti?: boolean;
  readOnly?: boolean;
  hideError?: boolean;
  validation?: RegisterOptions;
  options: SelectOptions[];
  containerClassName?: string;
} & React.ComponentPropsWithoutRef<'select'> &
  ExtractProps<Select>;

export default function SearchableSelectInput({
  disabled,
  readOnly,
  label,
  helperText,
  id,
  isMulti = false,
  placeholder,
  validation,
  options,
  hideError = false,
  containerClassName,
  ...rest
}: SearchableSelectInputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = get(errors, id);

  const withLabel = label !== null;
  disabled = disabled || readOnly;

  //#region  //*=========== Styles ===========
  const customStyles: StylesConfig = {
    control: (styles) => ({
      ...styles,
      // red-500 and gray-300
      border: `2px solid ${error ? '#F87171' : 'var(--color-secondary-800)'}`,
      '&:hover': {
        border: `2px solid ${error ? '#F87171' : 'var(--color-secondary-800)'}`,
      },
      boxShadow: 'none',
      transition: 'none',
      '&:focus-within': {
        border: `2px solid ${error ? '#F87171' : 'var(--color-primary-500)'}`,
        boxShadow: `0 0 0 1px ${
          error ? '#F87171' : 'var(--color-primary-500)'
        }`,
      },
      '*': {
        boxShadow: 'none !important',
      },

      borderRadius: '1.25rem',
      paddingLeft: '1rem',
      paddingRight: '0.5rem',
      background: disabled
        ? 'var(--color-secondary-800)'
        : 'var(--color-secondary-900)',
      cursor: 'pointer',
    }),
    valueContainer: (styles) => ({
      ...styles,
      padding: 0,
      gap: '0.5rem',
    }),
    singleValue: (styles) => ({
      ...styles,
      color: disabled ? '#A1A1AA' : '#FFFFFF',
    }),
    input: (styles) => ({
      ...styles,
      padding: 0,
      margin: 0,
      color: '#FFFFFF',
    }),
    placeholder: (styles) => ({
      ...styles,
      color: 'var(--color-secondary-500)',
    }),
    indicatorsContainer: (styles) => ({
      ...styles,
      '&>div': {
        padding: 0,
      },
    }),
    dropdownIndicator: (styles) => ({
      ...styles,
      color: 'var(--color-secondary-500)',
      '&:hover': {
        color: 'var(--color-secondary-500)',
      },
    }),
    menu: (styles) => ({
      ...styles,
      borderRadius: '1rem',
      overflow: 'hidden',
      backgroundColor: 'var(--color-secondary-800)',
    }),
    menuList: (styles) => ({
      ...styles,
      padding: '0',
    }),
    option: (styles, state) => ({
      ...styles,
      color: 'var(--color-secondary-100)',
      background: state.isSelected
        ? 'var(--color-primary-600)'
        : 'var(--color-secondary-800)',
      ':hover': {
        background: 'var(--color-secondary-700)',
      },
      cursor: 'pointer',
      paddingLeft: '1rem',
    }),
    multiValue: (styles) => ({
      ...styles,
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      background: 'var(--color-secondary-800)',
      borderRadius: '1rem',
      padding: '0 0.75rem',
      margin: 0,
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      color: disabled ? '#A1A1AA' : '#FFFFFF',
      padding: 0,
      paddingLeft: 0,
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      color: '#FFFFFF',
      padding: 0,
      paddingLeft: '0.5rem',
      '&:hover': {
        color: 'var(--color-secondary-300)',
        backgroundColor: 'transparent',
      },
    }),
  };

  //#endregion  //*======== Styles ===========

  return (
    <div className={containerClassName}>
      {withLabel && (
        <Typography as='label' variant='s3' className='block' htmlFor={id}>
          {label}
        </Typography>
      )}
      <div
        className={clsx(
          'relative',
          withLabel && 'mt-1',
          disabled && 'cursor-not-allowed'
        )}
      >
        <Controller
          name={id}
          control={control}
          rules={validation}
          render={({ field }) => {
            return (
              <Select
                {...field}
                value={
                  //? null is needed so if the selected value is not found in the options, it will clear the value
                  isMulti
                    ? field.value?.map(
                        (value: unknown) =>
                          options.find((option) => option.value === value) ??
                          null
                      )
                    : options.find((opt) => opt.value === field.value) ?? null
                }
                onChange={(selectedOptions) => {
                  isMulti
                    ? field.onChange(
                        (
                          selectedOptions as MultiValue<
                            (typeof options)[number]
                          >
                        ).map((option) => option?.value ?? '')
                      )
                    : field.onChange(
                        (selectedOptions as (typeof options)[number])?.value ??
                          ''
                      );
                }}
                isDisabled={disabled}
                isClearable
                isMulti={isMulti}
                closeMenuOnSelect={!isMulti}
                placeholder={placeholder}
                options={options}
                classNames={{
                  control: () => '!min-h-[2.25rem] md:!min-h-[2.5rem]',
                }}
                styles={customStyles}
                components={{
                  IndicatorSeparator: () => null,
                  DropdownIndicator: (props) => (
                    <components.DropdownIndicator {...props}>
                      <FiChevronDown
                        className={clsx([
                          'text-typo-icons text-xl',
                          disabled && 'hidden',
                        ])}
                      />
                    </components.DropdownIndicator>
                  ),
                  ClearIndicator: (props) => (
                    <components.ClearIndicator {...props}>
                      <FiX className='text-typo-icons hover:text-typo-secondary mr-0.5 text-lg' />
                    </components.ClearIndicator>
                  ),
                  MultiValueRemove: (props) => (
                    <components.MultiValueRemove {...props}>
                      <FiX size={16} className={clsx(disabled && 'hidden')} />
                    </components.MultiValueRemove>
                  ),
                }}
                {...rest}
              />
            );
          }}
        />
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
    </div>
  );
}
