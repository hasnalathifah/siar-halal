import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import * as React from 'react';

import { buildPaginationURL } from '@/lib/pagination';
import usePagination from '@/hooks/query/usePagination';

import CardSetItem from '@/components/navigation/card-set/CardSetItem';
import CardSetSkeleton from '@/components/navigation/card-set/CardSetSkeleton';
import SearchErrorMessage from '@/components/navigation/search/SearchErrorMessage';
import SearchPanelButton from '@/components/navigation/search/SearchPanelButton';

import { ApiError, PaginatedApiResponse } from '@/types/api';
import { CardSet } from '@/types/entities/card-set';

export default function CardSetResult({
  cardgameId,
  search,
}: {
  cardgameId?: string;
  search: string;
}) {
  //#region  //*=========== Card Data ===========
  const { paginationState } = usePagination<CardSet>({
    pageSize: 5,
  });

  const cardSetUrl = buildPaginationURL({
    baseUrl: '/cardset',
    paginationState,
    additionalParam: {
      cardgame_id: cardgameId,
      search: search,
    },
  });

  const {
    data: queryData,
    isLoading,
    isError,
    error,
  } = useQuery<PaginatedApiResponse<CardSet[]>, AxiosError<ApiError>>(
    [cardSetUrl],
    {
      enabled: !!cardgameId,
      keepPreviousData: true,
      retry: 0,
    }
  );

  const cardSetData = queryData?.response.data ?? [];
  //#endregion  //*======== Card Data ===========

  return (
    <>
      {isLoading ? (
        [...Array(2)].map((_, i) => <CardSetSkeleton key={i} />)
      ) : isError ? (
        <SearchErrorMessage error={error.response?.data.message} />
      ) : (
        <>
          <div className='max-h-[50vh] overflow-y-scroll'>
            {cardSetData.map((cardSet) => (
              <CardSetItem key={cardSet.id} data={cardSet} />
            ))}
          </div>
          <SearchPanelButton href='/'>View All Result</SearchPanelButton>
        </>
      )}
    </>
  );
}
