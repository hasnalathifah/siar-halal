import * as React from 'react';

import UnstyledLink from '@/components/links/UnstyledLink';
import Typography from '@/components/typography/Typography';

import { ExtractProps } from '@/types/helper';

export default function SearchPanelButton({
  children,
  ...rest
}: ExtractProps<typeof UnstyledLink>) {
  return (
    <UnstyledLink className='group' {...rest}>
      <div className='bg-secondary-900 border-typo-divider group-hover:bg-secondary-950 w-full border-t-2 px-4 py-2 text-center'>
        <Typography variant='b2'>{children}</Typography>
      </div>
    </UnstyledLink>
  );
}
