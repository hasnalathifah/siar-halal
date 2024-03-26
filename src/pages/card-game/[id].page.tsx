import { useQuery } from '@tanstack/react-query';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import * as React from 'react';

import api, { setApiContext } from '@/lib/axios';

import withAuth from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import DiscoverSection from '@/pages/card-game/components/DiscoverSection';
import HeaderSection from '@/pages/card-game/components/HeaderSection';
import SetsSection from '@/pages/card-game/components/SetsSection';

import { ApiResponse } from '@/types/api';
import { CardGame } from '@/types/entities/card-game';

export default withAuth('optional')(IndexPage);
function IndexPage({
  initialResponse,
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  //#region  //*=========== Card Game Data ===========
  const { data: queryData } = useQuery<ApiResponse<CardGame>>(
    [`/cardgame/${initialResponse.response.id}`],
    {
      initialData: initialResponse,
    }
  );
  const cardGameData = queryData.response;
  //#endregion  //*======== Card Game Data ===========

  return (
    <Layout>
      <Seo templateTitle={cardGameData.name} />
      <main className='relative flex flex-col  pt-0 md:pt-16'>
        <HeaderSection data={cardGameData} />
        <SetsSection data={cardGameData} />
        <DiscoverSection data={cardGameData} cardGameId={id} />
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
    const cardGameResponse = await api.get<ApiResponse<CardGame>>(
      `/cardgame/${id}`
    );

    return {
      props: {
        initialResponse: cardGameResponse.data,
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
