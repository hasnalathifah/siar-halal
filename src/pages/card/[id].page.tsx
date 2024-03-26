/* eslint-disable unused-imports/no-unused-vars */
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import * as React from 'react';

import api, { setApiContext } from '@/lib/axios';

import withAuth from '@/components/hoc/withAuth';
import DescriptionList from '@/components/layout/DescriptionList';
import Graphic from '@/components/layout/Graphic';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

import PageBreadcrumb from '@/breadcrumb/PageBreadcrumb';
import { LOCALE } from '@/constant/common';
import { DEFAULT_ICON } from '@/constant/icon';
import CardImages from '@/pages/card/components/CardImages';

import { ApiResponse } from '@/types/api';
import { Card } from '@/types/entities/card';

export default withAuth('optional')(CardSetPage);
function CardSetPage({
  initialResponse,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const cardData = initialResponse.response;

  const CardSetIcon = DEFAULT_ICON['card-set'];
  return (
    <Layout>
      <Seo templateTitle={`${cardData.name}`} />
      <main className='relative flex flex-col'>
        <PageBreadcrumb
          current={cardData.name}
          crumbs={[
            {
              title: 'Home',
              href: '/',
            },
            {
              title: cardData.cardgame,
              href: `/card-game/${cardData.cardgame_id}`,
            },
            {
              title: cardData.cardset,
              href: `/card-set/${cardData.cardset_id}`,
            },
          ]}
          className='z-20'
        />
        <section className='min-h-main layout z-10 flex items-center'>
          <div className='flex w-full flex-col items-start gap-12 py-12 md:flex-row'>
            <CardImages data={cardData} className='w-full shrink-0 md:w-1/3' />
            <div className='divide-typo-divider flex w-full flex-col gap-6 divide-y'>
              <div>
                <Typography as='h1' variant='j2'>
                  {cardData.name}
                </Typography>
                <div className='text-typo-secondary flex items-center gap-2'>
                  <CardSetIcon className='text-2xl' />
                  <Typography
                    as='h2'
                    variant='h1'
                    color='secondary'
                    className='mt-1.5'
                  >
                    {cardData.cardset}
                  </Typography>
                </div>

                <Typography
                  as='h2'
                  variant='j2'
                  color='purple-gradient'
                  className='mt-4 w-fit'
                >
                  Rp {cardData.price?.toLocaleString(LOCALE)}
                </Typography>
              </div>
              <div className='flex flex-col gap-4 pt-6'>
                <Typography variant='s1'>Details</Typography>
                <div className='grid gap-4  md:grid-cols-3'>
                  <DescriptionList
                    icon={DEFAULT_ICON['card-game']}
                    title='Card Game'
                    description={cardData.cardgame}
                  />
                  <DescriptionList
                    icon={DEFAULT_ICON.language}
                    title='Language'
                    description={cardData.language}
                  />

                  <DescriptionList
                    icon={DEFAULT_ICON.rarity}
                    title='Rarity'
                    description={
                      <span className='text-primary-400'>
                        {cardData.rarity}
                      </span>
                    }
                  />
                </div>
              </div>
              <div className='flex flex-col gap-4 pt-6'>
                <Typography variant='s1'>Description</Typography>
                <Typography
                  variant='b2'
                  className='whitespace-pre-wrap'
                  color='secondary'
                >
                  {cardData.description}
                </Typography>
              </div>
            </div>
          </div>
        </section>

        <Graphic withGridGraphic withIconGraphic={DEFAULT_ICON['card']} />
      </main>
    </Layout>
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
    const cardResponse = await api.get<ApiResponse<Card>>(`/product/${id}`);

    return {
      props: {
        initialResponse: cardResponse.data,
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
