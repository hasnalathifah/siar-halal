import * as React from 'react';

import clsxm from '@/lib/clsxm';

import UnstyledLink, {
  UnstyledLinkProps,
} from '@/components/links/UnstyledLink';

const PrimaryLinkVariant = ['primary', 'basic'] as const;
type PrimaryLinkProps = {
  variant?: (typeof PrimaryLinkVariant)[number];
} & UnstyledLinkProps;

const PrimaryLink = React.forwardRef<HTMLAnchorElement, PrimaryLinkProps>(
  ({ className, children, variant = 'primary', ...rest }, ref) => {
    return (
      <UnstyledLink
        ref={ref}
        {...rest}
        className={clsxm(
          'inline-flex items-center',
          'focus-visible:ring-primary-500 focus:outline-none focus-visible:rounded focus-visible:ring focus-visible:ring-offset-2',
          'font-medium',
          //#region  //*=========== Variant ===========
          variant === 'primary' && [
            'text-primary-500 hover:text-primary-600 active:text-primary-700',
            'disabled:text-primary-200',
          ],
          variant === 'basic' && [
            'text-secondary-400 hover:text-secondary-300 active:text-secondary-100-200',
            'disabled:text-secondary-600',
          ],
          //#endregion  //*======== Variant ===========
          className
        )}
      >
        {children}
      </UnstyledLink>
    );
  }
);

export default PrimaryLink;
