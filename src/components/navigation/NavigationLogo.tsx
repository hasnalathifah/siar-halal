import * as React from 'react';

import LogoWithText from '@/components/layout/LogoWithText';
import UnstyledLink from '@/components/links/UnstyledLink';

import { ExtractProps } from '@/types/helper';

export default function NavigationLogo(
  props: Omit<ExtractProps<typeof UnstyledLink>, 'children'>
) {
  return (
    <UnstyledLink {...props}>
      <LogoWithText />
      {/* <Logo className='block md:hidden' /> */}
    </UnstyledLink>
  );
}
