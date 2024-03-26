import * as React from 'react';
import { HiChevronRight } from 'react-icons/hi';

import clsxm from '@/lib/clsxm';

import PrimaryLink from '@/components/links/PrimaryLink';
import Typography from '@/components/typography/Typography';

type Crumb = {
  title: string;
  href: string;
};

type BreadcrumbProps = {
  crumbs: Crumb[];
  current: string;
} & React.ComponentPropsWithoutRef<'div'>;

export default function Breadcrumb({
  className,
  crumbs,
  current,
  ...rest
}: BreadcrumbProps) {
  return (
    <div
      className={clsxm('flex flex-wrap items-center gap-2', className)}
      {...rest}
    >
      {crumbs.map(({ title, href }, i) => (
        <React.Fragment key={i}>
          <PrimaryLink href={href} className='font-normal' variant='basic'>
            <Typography variant='b3' className='text-inherit'>
              {title}
            </Typography>
          </PrimaryLink>
          <HiChevronRight className='text-secondary-400 mt-1' />
        </React.Fragment>
      ))}
      <Typography variant='s3' className='text-primary-400'>
        {current}
      </Typography>
    </div>
  );
}
