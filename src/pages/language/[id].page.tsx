import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Filter } from 'lucide-react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import * as React from 'react';

import api, { setApiContext } from '@/lib/axios';
import { buildPaginationURL } from '@/lib/pagination';
import usePagination from '@/hooks/query/usePagination';

import IconButton from '@/components/buttons/IconButton';
import SimpleCard from '@/components/card/SimpleCard';
import withAuth from '@/components/hoc/withAuth';
import DescriptionList from '@/components/layout/DescriptionList';
import Graphic from '@/components/layout/Graphic';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

import PageBreadcrumb from '@/breadcrumb/PageBreadcrumb';
import { DEFAULT_ERROR_MESSAGE } from '@/constant/common';
import { DEFAULT_ICON } from '@/constant/icon';
import CardSetSkeleton from '@/pages/components/card-set/CardSetSkeleton';
import CardSetView from '@/pages/components/card-set/CardSetView';
import { FilterCardSetForm } from '@/pages/components/card-set/discover/DiscoverCardSet';
import FilterCardSetDesktop from '@/pages/components/card-set/discover/FilterCardSetDesktop';
import FilterCardSetMobile from '@/pages/components/card-set/discover/FilterCardSetMobile';
import SearchCardSet from '@/pages/components/card-set/discover/SearchCardSet';
import SortCardSet from '@/pages/components/card-set/discover/SortCardSet';
import Discover from '@/pages/components/discover/Discover';

import { ApiError, ApiResponse, PaginatedApiResponse } from '@/types/api';
import { CardGame } from '@/types/entities/card-game';
import { CardSet } from '@/types/entities/card-set';
import { Category } from '@/types/entities/category';
export default withAuth('optional')(LanguagePage);
function LanguagePage({
  category,
  id,
  cardGame,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cardGameId = searchParams.get('card-game');
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
      cardgame_id: cardGameId,
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
      enabled: !!cardGameId,
      retry: 0,
    }
  );

  const cardSetData = queryData?.response.data ?? [];
  //#endregion  //*======== Fetch Data ===========

  return (
    <Layout>
      <Seo templateTitle='Language' />
      <main className='relative flex flex-col '>
        <PageBreadcrumb
          current={category.response.name}
          crumbs={[
            {
              title: 'Home',
              href: '/',
            },
            {
              title: cardGame.response.name,
              href: `/card-game/${cardGame.response.id}`,
            },
          ]}
          containerClassName='z-20'
        />
        <Discover withGraphics={false} childrenClassName='py-12'>
          <div className='flex  flex-wrap justify-between gap-4'>
            <Typography as='h1' variant='j2'>
              Card Set with{' '}
              <span className='from-primary-400 to-primary-200 bg-gradient-to-tr bg-clip-text text-transparent'>
                {category.response.name}
              </span>{' '}
              Language
            </Typography>
            <DescriptionList
              icon={DEFAULT_ICON['card-game']}
              title='Card Game'
              description={cardGame.response.name}
            />
          </div>
          <Discover.Layout
            withBreadcrumb
            tab={<div className='border-secondary-800 w-full border-b-2' />}
            desktopFilter={
              <FilterCardSetDesktop
                categoryId={id}
                state={additionalParam}
                setState={setAdditionalParam}
              />
            }
            mobileFilter={
              <FilterCardSetMobile
                categoryId={id}
                state={additionalParam}
                setState={setAdditionalParam}
              >
                {({ openModal }) => (
                  <div className='relative'>
                    <IconButton
                      onClick={openModal}
                      variant='dark'
                      icon={Filter}
                    />
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
        </Discover>
        <Graphic withGridGraphic withIconGraphic={DEFAULT_ICON.language} />
      </main>
    </Layout>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.params?.id;
  const query = context.query;
  const cardGameId = query['card-game'];

  if (typeof id !== 'string' || !cardGameId) {
    return {
      notFound: true,
    };
  }
  setApiContext(context);

  try {
    const categoryResponse = await api.get<ApiResponse<Category>>(
      `/category/${id}`
    );

    const cardGameResponse = await api.get<ApiResponse<CardGame>>(
      `/cardgame/${cardGameId}`
    );

    return {
      props: {
        category: categoryResponse.data,
        cardGame: cardGameResponse.data,
        id: +id,
      },
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: '/500',
      },
    };
  }
};
