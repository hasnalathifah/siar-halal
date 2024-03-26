import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Filter } from 'lucide-react';
import { useRouter } from 'next/router';
import * as React from 'react';

import { buildPaginationURL } from '@/lib/pagination';
import usePagination from '@/hooks/query/usePagination';

import IconButton from '@/components/buttons/IconButton';
import SimpleCard from '@/components/card/SimpleCard';

import { DEFAULT_ERROR_MESSAGE } from '@/constant/common';
import CardSetSkeleton from '@/pages/components/card-set/CardSetSkeleton';
import CardSetView from '@/pages/components/card-set/CardSetView';
import FilterCardSetDesktop from '@/pages/components/card-set/discover/FilterCardSetDesktop';
import FilterCardSetMobile from '@/pages/components/card-set/discover/FilterCardSetMobile';
import SearchCardSet from '@/pages/components/card-set/discover/SearchCardSet';
import SortCardSet from '@/pages/components/card-set/discover/SortCardSet';
import Discover from '@/pages/components/discover/Discover';
import DiscoverTabs from '@/pages/components/discover/DiscoverTabs';

import { ApiError, PaginatedApiResponse } from '@/types/api';
import { CardGame } from '@/types/entities/card-game';
import { CardSet } from '@/types/entities/card-set';
import { ExtractProps } from '@/types/helper';

type DiscoverCardSet = {
  cardGame: CardGame;
} & ExtractProps<typeof DiscoverTabs>;

export type FilterCardSetForm = {
  category_id: string;
  category_name: string;
};

export default function DiscoverCardSet({
  cardGame,
  type,
  setType,
}: DiscoverCardSet) {
  const router = useRouter();
  const query = router.query;

  //#region  //*=========== State ===========
  const [additionalParam, setAdditionalParam] =
    React.useState<FilterCardSetForm>({
      category_id: '',
      category_name: '',
    });

  const [search, setSearch] = React.useState<string>(
    (query['search-set'] as string) ?? ''
  );

  const { paginationState, setPaginationState } = usePagination<CardSet>({
    pageSize: 15,
  });
  //#endregion  //*======== State ===========

  //#region  //*=========== Fetch Data ===========
  const cardUrl = buildPaginationURL({
    baseUrl: '/cardset',
    paginationState,
    additionalParam: {
      cardgame_id: cardGame.id,
      search: search,
      parent_category_id: additionalParam.category_id,
    },
  });

  const {
    data: queryData,
    error,
    isLoading,
    isError,
  } = useQuery<PaginatedApiResponse<CardSet[]>, AxiosError<ApiError>>(
    [cardUrl],
    {
      enabled: !!cardGame.id,
      retry: 0,
    }
  );

  const cardSetData = queryData?.response.data ?? [];
  //#endregion  //*======== Fetch Data ===========

  React.useEffect(() => {
    if (query['search-card']) {
      setSearch(query['search-set'] as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query['search-set']]);

  return (
    <Discover.Layout
      tab={<DiscoverTabs type={type} setType={setType} />}
      desktopFilter={
        <FilterCardSetDesktop
          categoryId={cardGame.category_id}
          state={additionalParam}
          setState={setAdditionalParam}
        />
      }
      mobileFilter={
        <FilterCardSetMobile
          categoryId={cardGame.category_id}
          state={additionalParam}
          setState={setAdditionalParam}
        >
          {({ openModal }) => (
            <div className='relative'>
              <IconButton onClick={openModal} variant='dark' icon={Filter} />
              {!Object.values(additionalParam).every(
                (value) => value === ''
              ) && (
                <span className='bg-primary-400 absolute bottom-0 right-0 h-2 w-2 rounded-full' />
              )}
            </div>
          )}
        </FilterCardSetMobile>
      }
      sort={<SortCardSet setState={setPaginationState} />}
      search={<SearchCardSet search={search} setSearch={setSearch} />}
    >
      <Discover.Content
        showPagination={!isError}
        paginationProps={{
          state: paginationState,
          setState: setPaginationState,
          meta: queryData?.response.meta,
        }}
        type='set'
        id='set'
      >
        {isLoading ? (
          [...Array(2)].map((_, i) => <CardSetSkeleton key={i} />)
        ) : isError ? (
          <SimpleCard className='col-span-full'>
            {error.response?.data.message || DEFAULT_ERROR_MESSAGE}
          </SimpleCard>
        ) : (
          cardSetData.map((cardSet) => (
            <CardSetView key={cardSet.id} data={cardSet} />
          ))
        )}
      </Discover.Content>
    </Discover.Layout>
  );
}
