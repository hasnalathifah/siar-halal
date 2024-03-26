import * as React from 'react';
import { get, useFormState } from 'react-hook-form';

import Typography from '@/components/typography/Typography';

import { ExtractProps } from '@/types/helper';

type ErrorMessageProps = {
  id: string;
} & Omit<ExtractProps<typeof Typography>, 'children'>;

export default function ErrorMessage({
  id,
  className,
  ...rest
}: ErrorMessageProps) {
  const { errors } = useFormState();
  const error = get(errors, id);

  return (
    <Typography variant='c1' color='danger' className={className} {...rest}>
      {error?.message?.toString()}
    </Typography>
  );
}
