import * as React from 'react';

import clsxm from '@/lib/clsxm';

import UnderlineLink from '@/components/links/UnderlineLink';
import { UnstyledLinkProps } from '@/components/links/UnstyledLink';

type ArrowLinkProps<C extends React.ElementType> = {
  as?: C;
  direction?: 'left' | 'right';
  isGradient?: boolean;
} & UnstyledLinkProps &
  React.ComponentProps<C>;

export default function ArrowLink<C extends React.ElementType>({
  children,
  className,
  direction = 'right',
  isGradient = false,
  as,
  ...rest
}: ArrowLinkProps<C>) {
  const Component = as || UnderlineLink;

  return (
    <Component
      {...rest}
      className={clsxm(
        'group gap-[0.25em]',
        direction === 'left' && 'flex-row-reverse',
        className
      )}
    >
      <span>{children}</span>

      <svg
        viewBox='0 0 16 16'
        height='1em'
        width='1em'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={clsxm(
          'relative',
          'transition-transform duration-200',
          direction === 'right' ? 'motion-safe:-translate-x-1' : 'rotate-180',
          'group-hover:translate-x-0'
        )}
      >
        <defs>
          <linearGradient
            id='primary-gradient'
            x1='0%'
            x2='0%'
            y1='100%'
            y2='0%'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#3F51B1' />
            <stop offset={0.13} stopColor='#5A55AE' />
            <stop offset={0.25} stopColor='#7B5FAC' />
            <stop offset={0.38} stopColor='#8F6AAE' />
            <stop offset={0.5} stopColor='#A86AA4' />
            <stop offset={0.62} stopColor='#CC6B8E' />
            <stop offset={0.75} stopColor='#F18271' />
            <stop offset={0.87} stopColor='#F3A469' />
            <stop offset={1} stopColor='#FFCB70' />
          </linearGradient>
        </defs>
        <path
          fill={isGradient ? 'url(#primary-gradient)' : 'currentColor'}
          d='M7.28033 3.21967C6.98744 2.92678 6.51256 2.92678 6.21967 3.21967C5.92678 3.51256 5.92678 3.98744 6.21967 4.28033L7.28033 3.21967ZM11 8L11.5303 8.53033C11.8232 8.23744 11.8232 7.76256 11.5303 7.46967L11 8ZM6.21967 11.7197C5.92678 12.0126 5.92678 12.4874 6.21967 12.7803C6.51256 13.0732 6.98744 13.0732 7.28033 12.7803L6.21967 11.7197ZM6.21967 4.28033L10.4697 8.53033L11.5303 7.46967L7.28033 3.21967L6.21967 4.28033ZM10.4697 7.46967L6.21967 11.7197L7.28033 12.7803L11.5303 8.53033L10.4697 7.46967Z'
        />
        <path
          stroke={isGradient ? 'url(#primary-gradient)' : 'currentColor'}
          d='M1.75 8H11'
          strokeWidth='1.5'
          strokeLinecap='round'
          className={clsxm(
            'origin-left transition-all duration-200',
            'opacity-0 motion-safe:-translate-x-1',
            'group-hover:translate-x-0 group-hover:opacity-100'
          )}
        />
      </svg>
    </Component>
  );
}
