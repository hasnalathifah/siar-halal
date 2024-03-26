import * as React from 'react';

import clsxm from '@/lib/clsxm';

const TypographyVariant = [
  'j1',
  'j2',
  'j3',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  's1',
  's2',
  's3',
  'b1',
  'b2',
  'b3',
  'c1',
  'c2',
  'l1',
  'l2',
] as const;

const TypographyColor = [
  'primary',
  'secondary',
  'tertiary',
  'danger',
  'black',
  'purple-gradient',
] as const;
const TypographyFont = ['heading', 'body'] as const;

type TypographyProps<T extends React.ElementType> = {
  /** @default <p> tag */
  as?: T;
  className?: string;
  color?: (typeof TypographyColor)[number];
  /**
   * | Variant | Size Class | Font Size | Font Weight |
   * | :------ | :--------- | :-------- | :---------- |
   * | j1      | text-5xl   | 48px      | semibold    |
   * | j2      | text-4xl   | 36px      | semibold    |
   * | j3      | text-3xl   | 30px      | semibold    |
   * | h1      | text-2xl   | 24px      | semibold    |
   * | h2      | text-xl    | 20px      | semibold    |
   * | h3      | text-lg    | 18px      | semibold    |
   * | h4      | text-lg    | 18px      | bold        |
   * | h5      | text-base  | 16px      | semibold    |
   * | h6      | text-sm    | 14px      | semibold    |
   * | s1      | text-lg    | 18px      | medium      |
   * | s2      | text-base  | 16px      | medium      |
   * | s3      | text-sm    | 14px      | medium      |
   * | b1      | text-lg    | 18px      | normal      |
   * | b2      | text-base  | 16px      | normal      |
   * | b3      | text-sm    | 14px      | normal      |
   * | c1      | text-xs    | 12px      | normal      |
   * | c2      | -          | 11px      | normal      |
   */
  variant?: (typeof TypographyVariant)[number];
  font?: (typeof TypographyFont)[number];
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<T>;

/** @see https://www.benmvp.com/blog/forwarding-refs-polymorphic-react-component-typescript/ */
type TypographyComponent = <T extends React.ElementType = 'p'>(
  props: TypographyProps<T>
) => React.ReactElement | null;

const Typography: TypographyComponent = React.forwardRef(
  <T extends React.ElementType = 'p'>(
    {
      as,
      children,
      className,
      color = 'primary',
      variant = 'b2',
      font,
      ...rest
    }: TypographyProps<T>,
    ref?: React.ComponentPropsWithRef<T>['ref']
  ) => {
    const Component = as || 'p';
    return (
      <Component
        ref={ref}
        className={clsxm(
          //#region  //*=========== Variants ===========
          [
            variant === 'j1' && ['font-heading text-5xl font-semibold'],
            variant === 'j2' && ['font-heading text-4xl font-semibold'],
            variant === 'j3' && ['font-heading text-3xl font-semibold'],

            variant === 'h1' && ['font-heading text-2xl font-semibold'],
            variant === 'h2' && ['font-heading text-xl font-semibold'],
            variant === 'h3' && ['font-heading text-lg font-semibold'],
            variant === 'h4' && ['font-body text-lg font-bold'],
            variant === 'h5' && ['font-heading text-base font-semibold'],
            variant === 'h6' && ['font-heading text-sm font-semibold'],

            variant === 's1' && ['font-body text-lg font-medium'],
            variant === 's2' && ['font-body text-base font-medium'],
            variant === 's3' && ['font-body text-sm font-medium'],

            variant === 'b1' && ['font-body text-lg font-normal'],
            variant === 'b2' && ['font-body text-base font-normal'],
            variant === 'b3' && ['font-body text-sm font-normal'],

            variant === 'c1' && ['font-body text-xs font-normal'],
            variant === 'c2' && [
              'font-body text-[11px] font-normal leading-[14px]',
            ],
          ],
          //#endregion  //*======== Variants ===========
          //#region  //*=========== Color ===========
          [
            color === 'primary' && ['text-typo'],
            color === 'secondary' && ['text-typo-secondary'],
            color === 'tertiary' && ['text-typo-tertiary'],
            color === 'danger' && ['text-error'],
            color === 'black' && ['text-black'],
            color === 'purple-gradient' && [
              'bg-gradient-to-r bg-clip-text text-transparent',
              ' from-[#69EACB] via-[#EACCF8] to-[#6654F1]',
            ],
          ],
          //#endregion  //*======== Color ===========
          //#region  //*=========== Font ===========
          [
            font === 'heading' && ['font-heading'],
            font === 'body' && ['font-primary'],
          ],
          //#endregion  //*======== Font ===========
          className
        )}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

export default Typography;
