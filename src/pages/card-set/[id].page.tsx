/* eslint-disable unused-imports/no-unused-vars */
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import * as React from 'react';

import api, { setApiContext } from '@/lib/axios';
import { useGetCardGroupByRarityQuery } from '@/hooks/query/card';

import SimpleCard from '@/components/card/SimpleCard';
import withAuth from '@/components/hoc/withAuth';
import DescriptionList from '@/components/layout/DescriptionList';
import Graphic from '@/components/layout/Graphic';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Skeleton from '@/components/Skeleton';
import Typography from '@/components/typography/Typography';

import PageBreadcrumb from '@/breadcrumb/PageBreadcrumb';
import { DEFAULT_ERROR_MESSAGE } from '@/constant/common';
import { DEFAULT_ICON } from '@/constant/icon';
import RaritySelectionInput from '@/pages/card-set/components/RaritySelectionInput';
import RaritySelectionSidebar from '@/pages/card-set/components/RaritySelectionSidebar';
import CardSkeleton from '@/pages/components/card/CardSkeleton';
import CardView from '@/pages/components/card/CardView';

import { ApiResponse } from '@/types/api';
import { CardByRarity } from '@/types/entities/card';
import { CardSet } from '@/types/entities/card-set';
export default withAuth('optional')(CardSetPage);
function CardSetPage({
  initialResponse,
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  //#region  //*=========== Card By Rarity ===========
  const {
    data: queryData,
    isLoading,
    isError,
    error,
  } = useGetCardGroupByRarityQuery({ cardset_id: id, options: { retry: 0 } });

  const cardGroupByRarityData = queryData?.response;
  //#endregion  //*======== Card By Rarity ===========

  const cardSetData = initialResponse.response;

  const rarityOptions =
    cardGroupByRarityData?.map((item) => ({
      value: item.rarity,
      label: item.rarity,
    })) ?? [];

  return (
    <Layout>
      <Seo templateTitle={`${cardSetData.name}`} />
      <main className='relative flex flex-col'>
        <PageBreadcrumb
          current={cardSetData.name}
          crumbs={[
            {
              title: 'Home',
              href: '/',
            },
            {
              title: cardSetData.cardgame,
              href: `/card-game/${cardSetData.cardgame_id}`,
            },
          ]}
          containerClassName='z-30 md:sticky top-auto relative md:top-[calc(4.5rem)]'
        />

        <RaritySelectionInput className='z-20' options={rarityOptions} />
        <section className='layout relative z-10 py-12'>
          <div className='flex  flex-wrap justify-between gap-4'>
            <Typography as='h1' variant='j2'>
              Card Set{' '}
              <span className='text-purple-gradient'>{cardSetData.name}</span>
            </Typography>
            <DescriptionList
              icon={DEFAULT_ICON.language}
              title='Language'
              description={cardSetData.language}
            />
          </div>
          <div className='mt-12 flex items-start justify-start'>
            <div className='flex w-full flex-col gap-20 md:gap-12'>
              {isLoading ? (
                <RaritySectionSkeleton />
              ) : isError ? (
                <SimpleCard className='w-full'>
                  {error.response?.data.message || DEFAULT_ERROR_MESSAGE}
                </SimpleCard>
              ) : (
                cardGroupByRarityData?.map((data) => (
                  <RaritySection key={data.rarity} data={data} />
                ))
              )}
            </div>
            <RaritySelectionSidebar options={rarityOptions} />
          </div>
        </section>
        <Graphic withGridGraphic withIconGraphic={DEFAULT_ICON['card-set']} />
      </main>
    </Layout>
  );
}

function RaritySection({ data }: { data: CardByRarity }) {
  return (
    <div id={data.rarity}>
      <div className='border-secondary-800 w-full border-b pb-2'>
        <Typography as='h1' variant='h1'>
          <span className='text-primary-400 font-medium'>{data.rarity}</span>{' '}
          Card List
        </Typography>
      </div>
      <div className='mt-4 grid w-full gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {data.products.map((card) => (
          <CardView key={card.id} data={card} />
        ))}
      </div>
    </div>
  );
}

function RaritySectionSkeleton() {
  return (
    <div>
      <div className='border-secondary-800 w-full border-b pb-4'>
        <Skeleton className='h-6 w-1/5 rounded-full' />
      </div>
      <div className='mt-4 grid w-full gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {[...Array(4)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.params?.id;
  if (typeof id !== 'string') {
    return {
      notFound: true,
    };
  }

  setApiContext(context);

  try {
    const cardSetResponse = await api.get<ApiResponse<CardSet>>(
      `/cardset/${id}`
    );

    return {
      props: {
        initialResponse: cardSetResponse.data,
        id: id,
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
