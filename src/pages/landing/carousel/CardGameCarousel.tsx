/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import dynamic from 'next/dynamic';
import React from 'react';
import { config } from 'react-spring';
import { v4 as uuidv4 } from 'uuid';

import clsxm from '@/lib/clsxm';

import CardGameSkeleton from '@/pages/components/card-game/CardGameSkeleton';
import CardGameView from '@/pages/components/card-game/CardGameView';
import CarouselButton from '@/pages/landing/carousel/CarouselButton';
import CarouselGraphic from '@/pages/landing/carousel/CarouselGraphic';

import { CardGame } from '@/types/entities/card-game';

// @ts-ignore
const Carousel = dynamic(() => import('react-spring-3d-carousel'), {
  ssr: false,
});

type CardGameCarousel = {
  data: CardGame[];
  showSkeleton?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

export default function CardGameCarousel({
  data,
  showSkeleton,
  className,
}: CardGameCarousel) {
  const [activeSlide, setActiveSlide] = React.useState<number>(0);

  const slides = React.useMemo(() => {
    if (!showSkeleton) {
      return data.map((content, i) => ({
        key: uuidv4(),
        content: (
          <CardGameView
            data={content}
            key={i}
            className='w-[14rem] scale-75 hover:scale-105 sm:w-[16rem] sm:scale-100 lg:w-[14rem]'
          />
        ),
        onClick: () => setActiveSlide(i),
      }));
    } else {
      return [...Array(5)].map((_, i) => ({
        key: uuidv4(),
        content: (
          <CardGameSkeleton className='w-[14rem] scale-75 hover:scale-105 sm:w-[16rem] sm:scale-100 lg:w-[14rem]' />
        ),
        onClick: () => setActiveSlide(i),
      }));
    }
  }, [data, showSkeleton]);

  //#region  //*=========== Handle Touch Events ===========
  let xDown: number | null = null;
  let yDown: number | null = null;

  const getTouches = (evt: {
    touches: any;
    originalEvent: { touches: any };
  }) => {
    return (
      evt.touches || evt.originalEvent.touches // browser API
    ); // jQuery
  };

  const handleTouchStart = (evt: any) => {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  };

  const handleTouchMove = (evt: { touches: { clientY: any }[] }) => {
    if (!xDown || !yDown) {
      return;
    }
    // @ts-ignore
    const xUp = evt.touches[0].clientX;
    const yUp = evt.touches[0].clientY;

    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      /*most significant*/
      if (xDiff > 0) {
        setActiveSlide(activeSlide + 1);
      } else {
        setActiveSlide(activeSlide - 1);
      }
    }

    xDown = null;
    yDown = null;
  };
  //#endregion  //*======== Handle Touch Events ===========

  function handleNext() {
    const nextSlide = activeSlide === slides.length - 1 ? 0 : activeSlide + 1;
    setActiveSlide(nextSlide);
  }

  function handlePrevious() {
    const previousSlide =
      activeSlide === 0 ? slides.length - 1 : activeSlide - 1;
    setActiveSlide(previousSlide);
  }
  return (
    <div
      className={clsxm([
        'relative flex aspect-square w-full overflow-hidden rounded-3xl bg-slate-800/10',
        className,
      ])}
    >
      <CarouselButton
        position='left'
        onClick={handlePrevious}
        containerClassName='z-20'
      />
      <div
        onTouchStart={handleTouchStart}
        // @ts-ignore
        onTouchMove={handleTouchMove}
        className='@container z-10 mx-auto my-auto h-full w-[80%]'
      >
        <Carousel
          slides={slides}
          goToSlide={activeSlide}
          offsetRadius={2}
          showNavigation={false}
          animationConfig={config.gentle}
        />
      </div>
      <CarouselButton
        position='right'
        onClick={handleNext}
        containerClassName='z-20'
      />
      <CarouselGraphic />
    </div>
  );
}
