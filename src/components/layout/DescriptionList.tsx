import * as React from 'react';
import { IconType } from 'react-icons';

import clsxm from '@/lib/clsxm';

import Typography from '@/components/typography/Typography';

type DescriptionListProps = {
  title: React.ReactNode;
  description: React.ReactNode;
  icon?: IconType;
} & React.ComponentPropsWithoutRef<'div'>;

export default function DescriptionList({
  className,
  title,
  description,
  icon: Icon,
  ...rest
}: DescriptionListProps) {
  if (Icon) {
    return (
      <div className={clsxm(['flex gap-3', className])} {...rest}>
        <Icon className='text-typo mt-1 shrink-0' size='24' />
        <div>
          <Typography as='dt' variant='s3' color='secondary'>
            {title}
          </Typography>
          <Typography as='dd' variant='b2'>
            {description}
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div className={clsxm('', className)} {...rest}>
      <Typography as='dt' variant='s3' color='secondary'>
        {title}
      </Typography>
      <Typography as='dd' variant='b2'>
        {description}
      </Typography>
    </div>
  );
}
