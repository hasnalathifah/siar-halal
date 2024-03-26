import * as React from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

import clsxm from '@/lib/clsxm';
import { scrollToComponent } from '@/lib/helper';
import {
  buildPaginationControl,
  PaginationState,
  SetPaginationState,
} from '@/lib/pagination';

import Button from '@/components/buttons/Button';

import { LOCALE } from '@/constant/common';

type PaginationControlProps = {
  meta?: {
    last_page: number;
    total: number;
  };
  state: PaginationState;
  setState: SetPaginationState;
  scrollToId?: string;
} & React.ComponentPropsWithoutRef<'div'>;

/**
 *
 * @see https://javascript.plainenglish.io/create-a-pagination-in-a-react-way-df5c6fe1e0c7
 */
export default function PaginationControl({
  meta,
  state,
  setState,
  scrollToId,
  className,
  ...rest
}: PaginationControlProps) {
  const currentPage = state.pagination.pageIndex + 1;
  const pageCount = meta?.last_page ?? 1;
  const paginationControl = buildPaginationControl(currentPage, pageCount);

  const handlePageControlClick = (page: string | number) => {
    if (page !== '...') {
      setState.setPagination((prevState) => ({
        ...prevState,
        pageIndex: (page as number) - 1,
      }));
      if (scrollToId) scrollToComponent(scrollToId);
    }
  };

  return (
    <div
      className={clsxm(
        'flex items-center justify-between gap-x-2  md:justify-end',
        className
      )}
      {...rest}
    >
      <div className='flex gap-1'>
        <Button
          variant='ghost'
          size='sm'
          leftIcon={HiChevronLeft}
          disabled={currentPage === 1}
          onClick={() => handlePageControlClick(currentPage - 1)}
        >
          Prev
        </Button>
        {paginationControl.map((page, index) => (
          <Button
            key={index}
            variant={currentPage === page ? 'primary' : 'ghost'}
            size='sm'
            className={clsxm(
              currentPage === page && 'pointer-events-none',
              'min-w-[2rem]'
            )}
            onClick={() => handlePageControlClick(page)}
          >
            {page.toLocaleString(LOCALE)}
          </Button>
        ))}
        <Button
          variant='ghost'
          size='sm'
          rightIcon={HiChevronRight}
          disabled={currentPage === pageCount}
          onClick={() => handlePageControlClick(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
