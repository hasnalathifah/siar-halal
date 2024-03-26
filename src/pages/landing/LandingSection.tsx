import * as React from 'react';

import { useGetCardGameQuery } from '@/hooks/query/card-game';

import Button from '@/components/buttons/Button';
import Counter from '@/components/Counter';
import ButtonLink from '@/components/links/ButtonLink';
import NextImage from '@/components/NextImage';
import Typography from '@/components/typography/Typography';

import CardGameCarousel from '@/pages/landing/carousel/CardGameCarousel';

export default function LandingSection() {
  //#region  //*=========== Card Game Data ===========
  const {
    data: cardGameQueryData,
    isLoading: isCardGameDataLoading,
    isError: isCardGameDataError,
  } = useGetCardGameQuery();

  const cardGameData = cardGameQueryData?.response ?? [];
  //#endregion  //*======== Card Game Data ===========

  return (
    <section className='layout min-h-main  flex  flex-col-reverse gap-12 py-12 md:flex-row md:gap-8'>
      <div className='z-10 flex w-full flex-col justify-center gap-10'>
        <div>
          <NextImage
            src='/images/animated-logo.svg'
            width={278}
            height={152}
            alt='Hype & Play'
            className='w-[70%]'
          />
          <Typography variant='b1' className='mt-6'>
            Discover card games based on category, track the latest drops, and
            purchased the card you actually love
          </Typography>
        </div>
        <div className='flex flex-wrap gap-10'>
          <div>
            <Typography as='h1' variant='j3'>
              <Counter range={[1, 10]} duration={1} />k
              <span className='text-primary-500'>+</span>
            </Typography>
            <Typography variant='b2' className='mt-1'>
              Card Games
            </Typography>
          </div>
          <div>
            <Typography as='h1' variant='j3'>
              <Counter range={[0, 100]} duration={2} />
              <span className='text-primary-500'>%</span>
            </Typography>
            <Typography variant='b2' className='mt-1'>
              Authentic
            </Typography>
          </div>
          <div>
            <Typography as='h1' variant='j3'>
              <Counter range={[0, 200]} duration={3} />
              <span className='text-primary-500'>+</span>
            </Typography>
            <Typography variant='b2' className='mt-1'>
              Happy Customer
            </Typography>
          </div>
        </div>
        <div className='flex flex-wrap gap-3'>
          <ButtonLink variant='primary' size='lg' href='/card-game-selection'>
            Select Your Game
          </ButtonLink>
          <Button variant='outline' size='lg'>
            Discover All
          </Button>
        </div>
      </div>
      <div className='relative flex w-full shrink-0 items-center justify-center md:w-2/5'>
        <CardGameCarousel
          data={cardGameData}
          showSkeleton={isCardGameDataLoading || isCardGameDataError}
        />
        <NextImage
          src='/images/graphic/sticker.png'
          width={560}
          height={640}
          alt='Hype and Play'
          className='absolute left-0 top-1/2 hidden w-16 -translate-x-[90%] -translate-y-[250%] md:block'
        />
      </div>
    </section>
  );
}
