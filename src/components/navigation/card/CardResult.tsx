import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import * as React from 'react';

import { buildPaginationURL } from '@/lib/pagination';
import usePagination from '@/hooks/query/usePagination';

import CardItem from '@/components/navigation/card/CardItem';
import CardSkeleton from '@/components/navigation/card/CardSkeleton';
import SearchErrorMessage from '@/components/navigation/search/SearchErrorMessage';
import SearchPanelButton from '@/components/navigation/search/SearchPanelButton';

import { ApiError, PaginatedApiResponse } from '@/types/api';
import { Card } from '@/types/entities/card';

export default function CardResult({
  cardgameId,
  search,
}: {
  cardgameId?: string;
  search: string;
}) {
  //#region  //*=========== Card Data ===========
  const { paginationState } = usePagination<Card>({
    pageSize: 5,
  });

  const cardUrl = buildPaginationURL({
    baseUrl: '/product',
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
  } = useQuery<PaginatedApiResponse<Card[]>, AxiosError<ApiError>>([cardUrl], {
    enabled: !!cardgameId,
    keepPreviousData: true,
    retry: 0,
  });

  const cardData = queryData?.response.data ?? [];
  //#endregion  //*======== Card Data ===========

  return (
    <>
      {isLoading ? (
        [...Array(2)].map((_, i) => <CardSkeleton key={i} />)
      ) : isError ? (
        <SearchErrorMessage error={error.response?.data.message} />
      ) : (
        <>
          <div className='max-h-[50vh] overflow-y-scroll'>
            {cardData.map((card) => (
              <CardItem key={card.id} data={card} />
            ))}
          </div>
          <SearchPanelButton href='/'>View All Result</SearchPanelButton>
        </>
      )}
    </>
  );
}
