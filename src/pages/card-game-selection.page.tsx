import clsx from 'clsx';
import { ChevronLeft } from 'lucide-react';
import * as React from 'react';

import { useGetCardGameQuery } from '@/hooks/query/card-game';

import withAuth from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import NextImage from '@/components/NextImage';
import Noise from '@/components/Noise';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

import CardGameSkeleton from '@/pages/components/card-game/CardGameSkeleton';
import CardGameView from '@/pages/components/card-game/CardGameView';
export default withAuth('optional')(CardGameSelectionPage);
function CardGameSelectionPage() {
  //#region  //*=========== Card Game Data ===========
  const {
    data: cardGameQueryData,
    isLoading: isCardGameDataLoading,
    isError: isCardGameDataError,
  } = useGetCardGameQuery();

  const cardGameData = cardGameQueryData?.response ?? [];

  const showSkeleton = isCardGameDataLoading || isCardGameDataError;
  //#endregion  //*======== Card Game Data ===========
  return (
    <Layout>
      <Seo templateTitle='Select Your Game!' />

      <main className='relative flex overflow-hidden'>
        <section className='layout min-h-main z-20 flex flex-col items-center justify-center py-12 md:py-16'>
          <ButtonLink
            href='/'
            variant='outline'
            className='mr-auto'
            leftIcon={ChevronLeft}
          >
            Back to home
          </ButtonLink>
          <Typography
            as='h1'
            variant='j1'
            color='purple-gradient'
            className='mt-12 select-none text-center sm:w-fit md:mt-0'
          >
            Select Your Game
          </Typography>
          <div className='mt-16 flex w-full flex-wrap justify-center gap-8 md:gap-12'>
            {showSkeleton
              ? [...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={clsx([
                      'relative flex p-6',
                      'w-full md:w-[20rem]',
                    ])}
                  >
                    <CardGameSkeleton
                      className={clsx([
                        'z-10 w-full',
                        'group-hover:shadow-neon',
                      ])}
                    />
                    <div
                      className={clsx([
                        'absolute inset-0',
                        'border-secondary-700 rounded-[40px] border',
                        'group-hover:border-primary-200  ',
                        'group-hover:animate-flicker ',
                        'transition-all duration-200 ease-out',
                      ])}
                    ></div>
                  </div>
                ))
              : cardGameData.map((card) => (
                  <UnstyledLink
                    key={card.id}
                    href={`/card-game/${card?.id}`}
                    className={clsx([
                      'group relative flex p-6',
                      'w-full md:w-[20rem]',
                    ])}
                  >
                    <CardGameView
                      data={card}
                      className={clsx([
                        'z-10 w-full',
                        'group-hover:shadow-neon',
                      ])}
                    />
                    <div
                      className={clsx([
                        'absolute inset-0',
                        'border-secondary-700 rounded-[40px] border',
                        'group-hover:border-primary-200  ',
                        'group-hover:animate-flicker ',
                        'transition-all duration-200 ease-out',
                      ])}
                    ></div>
                  </UnstyledLink>
                ))}
          </div>
        </section>
        <Noise className='z-10' />
        <NextImage
          src='/images/graphic/hexagonal-web.svg'
          width={1280}
          height={800}
          className='absolute inset-0 w-full'
          imgClassName='w-full'
          alt='Graphic'
        />
        <NextImage
          src='/images/graphic/gradient-blob.png'
          width={720}
          height={900}
          className='absolute left-0 top-0 w-1/2 max-w-lg -translate-x-1/4 -translate-y-1/3 rotate-45 blur-2xl'
          imgClassName='w-full'
          alt='Gradient'
        />
        <NextImage
          src='/images/graphic/gradient-blob.png'
          width={720}
          height={900}
          className='absolute bottom-0 right-0 w-1/2 translate-x-1/2 translate-y-1/3 rotate-45 blur-2xl'
          imgClassName='w-full'
          alt='Gradient'
        />
      </main>
    </Layout>
  );
}
