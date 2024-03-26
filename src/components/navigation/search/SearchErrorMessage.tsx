import * as React from 'react';

import Typography from '@/components/typography/Typography';

import { DEFAULT_ERROR_MESSAGE } from '@/constant/common';

export default function SearchErrorMessage({ error }: { error?: string }) {
  return (
    <Typography
      variant='c1'
      className='px-4 py-2 text-center'
      color='secondary'
    >
      {error || DEFAULT_ERROR_MESSAGE}
    </Typography>
  );
}
