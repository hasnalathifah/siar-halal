import * as React from 'react';

import UnstyledLink from '@/components/links/UnstyledLink';
import Typography from '@/components/typography/Typography';

import { ExtractProps } from '@/types/helper';

type NavigationLinkProps = ExtractProps<typeof UnstyledLink>;

export default function NavigationLink({
  href,
  children,
  ...rest
}: NavigationLinkProps) {
  return (
    <li key={href}>
      <UnstyledLink
        href={href}
        className='text-typo hover:text-typo-secondary'
        {...rest}
      >
        <Typography variant='j2' className='hover:text-typo block md:hidden'>
          {children}
        </Typography>
        <Typography
          variant='b2'
          color='secondary'
          className='hover:text-typo hidden md:block'
        >
          {children}
        </Typography>
      </UnstyledLink>
    </li>
  );
}
