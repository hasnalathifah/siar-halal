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
import CardSkeleton from '@/pages/components/card/CardSkeleton';
import CardView from '@/pages/components/card/CardView';
import FilterCardDesktop from '@/pages/components/card/discover/FilterCardDesktop';
import FilterCardMobile from '@/pages/components/card/discover/FilterCardMobile';
import SearchCard from '@/pages/components/card/discover/SearchCard';
import SortCard from '@/pages/components/card/discover/SortCard';
import Discover from '@/pages/components/discover/Discover';
import DiscoverTabs from '@/pages/components/discover/DiscoverTabs';

import { ApiError, PaginatedApiResponse } from '@/types/api';
import { Card } from '@/types/entities/card';
import { ExtractProps } from '@/types/helper';

export type FilterCardForm = {
  price_max: string;
  price_min: string;
  rarity_id: string;
};

type DiscoverCard = {
  cardGameId?: number;
} & ExtractProps<typeof DiscoverTabs>;

export default function DiscoverCard({
  cardGameId,

  type,
  setType,
}: DiscoverCard) {
  const router = useRouter();
  const query = router.query;

  //#region  //*=========== State ===========
  const [additionalParam, setAdditionalParam] = React.useState<FilterCardForm>({
    price_max: '',
    price_min: '',
    rarity_id: '',
  });
  const [search, setSearch] = React.useState<string>(
    (query['search-card'] as string) ?? ''
  );
  const { paginationState, setPaginationState } = usePagination<Card>({
    pageSize: 30,
  });
  //#endregion  //*======== State ===========

  //#region  //*=========== Fetch Data ===========
  const cardUrl = buildPaginationURL({
    baseUrl: '/product',
    paginationState,
    additionalParam: {
      cardgame_id: cardGameId,
      search: search,
      ...additionalParam,
    },
  });

  const {
    data: queryData,
    isLoading,
    isError,
    error,
  } = useQuery<PaginatedApiResponse<Card[]>, AxiosError<ApiError>>([cardUrl], {
    enabled: !!cardGameId,
    retry: 0,
  });

  const cardData = queryData?.response.data ?? [];
  //#endregion  //*======== Fetch Data ===========

  React.useEffect(() => {
    if (query['search-card']) {
      setSearch(query['search-card'] as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query['search-card']]);

  return (
    <Discover.Layout
      tab={<DiscoverTabs type={type} setType={setType} />}
      desktopFilter={
        <FilterCardDesktop
          cardGameId={cardGameId}
          state={additionalParam}
          setState={setAdditionalParam}
        />
      }
      mobileFilter={
        <FilterCardMobile
          cardGameId={cardGameId}
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
        </FilterCardMobile>
      }
      sort={<SortCard setState={setPaginationState} />}
      search={<SearchCard search={search} setSearch={setSearch} />}
    >
      <Discover.Content
        showPagination={!isError}
        paginationProps={{
          state: paginationState,
          setState: setPaginationState,
          meta: queryData?.response.meta,
        }}
        type='card'
        id='card'
      >
        {isLoading ? (
          [...Array(3)].map((_, i) => <CardSkeleton key={i} />)
        ) : isError ? (
          <SimpleCard className='col-span-full'>
            {error.response?.data.message || DEFAULT_ERROR_MESSAGE}
          </SimpleCard>
        ) : (
          cardData.map((card) => <CardView key={card.id} data={card} />)
        )}
      </Discover.Content>
    </Discover.Layout>
  );
}
