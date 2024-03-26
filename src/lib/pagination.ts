import queryString, { StringifyOptions } from 'query-string';

export type PaginationState = {
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  globalFilter: string;
  sorting: {
    id: string;
    desc: boolean;
  }[];
};

export type SetPaginationState = {
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
  setPagination: React.Dispatch<
    React.SetStateAction<{
      pageIndex: number;
      pageSize: number;
    }>
  >;
  setSorting: React.Dispatch<
    React.SetStateAction<
      {
        id: string;
        desc: boolean;
      }[]
    >
  >;
};

type BuildPaginationParam = {
  /** API Base URL, with / on the front */
  baseUrl: string;
  paginationState: PaginationState;
  /** Parameter addition
   * @example include: ['user', 'officer']
   */
  additionalParam?: Record<string, unknown>;
  options?: StringifyOptions;
};
type BuildPaginationURL = (props: BuildPaginationParam) => string;

export const buildPaginationURL: BuildPaginationURL = ({
  baseUrl,
  paginationState,
  additionalParam,
  options,
}) =>
  queryString.stringifyUrl(
    {
      url: baseUrl,
      query: {
        page_size: paginationState.pagination.pageSize,
        page: paginationState.pagination.pageIndex + 1,
        sort:
          paginationState.sorting.length > 0
            ? `${paginationState.sorting[0].id}`
            : '',
        sort_order:
          paginationState.sorting.length > 0
            ? `${paginationState.sorting[0].desc ? 'desc' : 'asc'}`
            : '',
        search: paginationState.globalFilter,
        ...additionalParam,
      },
    },
    {
      arrayFormat: 'comma',
      skipEmptyString: true,
      ...options,
    }
  );

export function buildPaginationControl(
  currentPage: number,
  pageCount: number,
  delta = 1
) {
  const rangeWithDots: (number | string)[] = [];

  const range = [...Array(pageCount)]
    .map((_, i) => i + 1)
    .map((page) => {
      if (
        Math.abs(page - 1) <= delta ||
        Math.abs(pageCount - page) <= delta ||
        Math.abs(currentPage - page) <= delta
      )
        return page;

      return -1;
    })
    .filter((page) => page !== -1);

  range.forEach((page, i) => {
    const previousPage = range[i - 1];
    if (page - previousPage > 1) rangeWithDots.push('...');
    rangeWithDots.push(page);
  });

  return rangeWithDots;
}
