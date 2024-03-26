import clsx from 'clsx';
import * as React from 'react';

import clsxm from '@/lib/clsxm';

import PaginationControl from '@/components/pagination/PaginationControl';
import Typography from '@/components/typography/Typography';

import RoundedEdge from '@/graphic/RoundedEdge';

import { ExtractProps } from '@/types/helper';

export type DiscoverType = 'card' | 'set';

type DiscoverProps = {
  children?: React.ReactNode;
  withGraphics?: boolean;
  childrenClassName?: string;
} & Omit<React.ComponentPropsWithoutRef<'div'>, 'title'>;

function DiscoverRoot({
  children,
  withGraphics = true,
  className,
  childrenClassName,
  ...rest
}: DiscoverProps) {
  return (
    <section
      className={clsxm(['bg-secondary-900 relative flex flex-col', className])}
      {...rest}
    >
      {withGraphics && (
        <div className='z-10 flex w-1/2 origin-top -translate-y-[1px]'>
          <div className='bg-secondary-800 -mr-[1px] h-12 w-full'></div>
          <RoundedEdge
            direction='bottom-right'
            className='fill-secondary-800'
          />
        </div>
      )}

      <div
        className={clsxm([
          'layout min-h-main z-10',
          withGraphics && 'mt-20',
          childrenClassName,
        ])}
      >
        {children}
      </div>
    </section>
  );
}

type TitleProps = {
  type: DiscoverType;
} & ExtractProps<typeof Typography>;

function Title({ type, children }: TitleProps) {
  return (
    <Typography as='h1' variant='j1'>
      Discover{' '}
      <span className='from-primary-400 to-primary-200 bg-gradient-to-tr bg-clip-text text-transparent'>
        {children}
      </span>{' '}
      {type === 'card' && 'Cards'}
      {type === 'set' && 'Card Sets'}
    </Typography>
  );
}

type LayoutProps = {
  tab?: React.ReactNode;
  desktopFilter?: React.ReactNode;
  mobileFilter?: React.ReactNode;
  sort?: React.ReactNode;
  search?: React.ReactNode;
  withBreadcrumb?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;
function Layout({
  tab: Tab,
  desktopFilter: DesktopFilter,
  mobileFilter: MobileFilter,
  sort: Sort,
  search: Search,
  children,
  className,
  withBreadcrumb = false,
  ...rest
}: LayoutProps) {
  return (
    <div
      className={clsxm([
        'flex flex-col items-start gap-8 py-10 lg:flex-row',
        className,
      ])}
      {...rest}
    >
      <div
        className={clsx([
          'sticky pt-4',
          ' hidden w-full shrink-0 space-y-3 lg:block lg:w-1/4',

          withBreadcrumb
            ? 'top-[calc(4.5rem+3.25rem)]'
            : 'top-[calc(4.5rem-1px)]',
        ])}
      >
        <Typography variant='s2'>Filter by</Typography>
        {DesktopFilter}
      </div>
      <div className='flex w-full flex-col gap-0 md:gap-4'>
        <div
          className={clsx([
            'bg-secondary-900 sticky ',
            'z-10 flex w-full flex-col items-end gap-3 pb-3 md:flex-row ',
            'md:pb-1',
            withBreadcrumb
              ? 'top-[calc(4.5rem+3.25rem)]'
              : 'top-[calc(4.5rem-1px)]',
          ])}
        >
          {Tab && Tab}

          <div className='flex shrink-0 items-center gap-2'>
            <div className='w-full lg:w-fit'>{Search}</div>
            <div className='w-full lg:w-fit'>{Sort}</div>
            <div className='block lg:hidden'> {MobileFilter}</div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

type ContentProps = {
  type: DiscoverType;
  showPagination?: boolean;
  paginationProps: ExtractProps<typeof PaginationControl>;
} & React.ComponentPropsWithoutRef<'div'>;
function Content({
  id,
  type,
  className,
  showPagination,
  paginationProps,
  children,
}: ContentProps) {
  return (
    <div className='flex flex-col items-center gap-16'>
      <div
        id={id}
        className={clsxm([
          'grid w-full gap-4 md:-mx-2 ',
          [
            type === 'card' && 'md:grid-cols-2 lg:grid-cols-3',
            type === 'set' && 'md:grid-cols-2',
          ],
          className,
        ])}
      >
        {children}
      </div>
      {showPagination && (
        <PaginationControl scrollToId={id} {...paginationProps} />
      )}
    </div>
  );
}

const Discover = Object.assign(DiscoverRoot, {
  Title,
  Layout,
  Content,
});
export default Discover;
