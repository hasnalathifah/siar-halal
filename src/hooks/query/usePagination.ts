import { useRouter } from 'next/router';
import * as React from 'react';

import { PaginationState } from '@/lib/pagination';

type usePaginationProps<T extends object> = {
  pageSize?: number;
  sort?: {
    key: Extract<keyof T, string>;
    type: 'asc' | 'desc';
  };
};

export default function usePagination<T extends object>({
  pageSize = 10,
  sort,
}: usePaginationProps<T> = {}) {
  const router = useRouter();
  const query = router.query;

  const defaultState = {
    globalFilter: '',
    pageIndex: 0,
    pageSize: pageSize,
    sorting: sort
      ? [
          {
            id: sort.key,
            desc: sort.type === 'desc',
          },
        ]
      : [],
  };

  const [globalFilter, setGlobalFilter] = React.useState<
    PaginationState['globalFilter']
  >(query.filter ? String(query.filter) : defaultState.globalFilter);

  const [sorting, setSorting] = React.useState<PaginationState['sorting']>(
    query.sort ? JSON.parse(query.sort as string) : defaultState.sorting
  );
  const [pagination, setPagination] = React.useState<
    PaginationState['pagination']
  >({
    pageIndex: query.page ? Number(query.page) - 1 : defaultState.pageIndex,
    pageSize: query.size ? Number(query.size) : defaultState.pageSize,
  });

  /** Sync URL based on pagination states */
  React.useEffect(() => {
    router.replace(
      {
        pathname: router.pathname,
        query: {
          ...query,
          page: pagination.pageIndex + 1,
          size: pagination.pageSize,
          filter: globalFilter === '' ? undefined : globalFilter,
          sort: JSON.stringify(sorting),
        },
      },
      undefined,
      { shallow: true }
    );
    // Ignore query and router to avoid infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination, globalFilter, sorting]);

  return {
    paginationState: {
      globalFilter,
      pagination,
      sorting,
    },
    setPaginationState: {
      setGlobalFilter,
      setPagination,
      setSorting,
    },
  };
}
