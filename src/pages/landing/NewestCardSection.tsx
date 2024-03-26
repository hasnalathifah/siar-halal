import { useQuery } from '@tanstack/react-query';
import * as React from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { useDraggable } from 'react-use-draggable-scroll';

import { generateOptions } from '@/lib/generate-options';
import { buildPaginationURL } from '@/lib/pagination';
import { useGetCardGameQuery } from '@/hooks/query/card-game';
import usePagination from '@/hooks/query/usePagination';

import Button from '@/components/buttons/Button';
import { SelectOptions } from '@/components/forms/SearchableSelectInput';
import ButtonLink from '@/components/links/ButtonLink';
import NextImage from '@/components/NextImage';
import Skeleton from '@/components/Skeleton';
import Typography from '@/components/typography/Typography';

import { DEFAULT_CARD_GAME_ID, UNCATEGORIZED_ID } from '@/constant/common';
import CardSkeleton from '@/pages/components/card/CardSkeleton';
import CardView from '@/pages/components/card/CardView';

import { PaginatedApiResponse } from '@/types/api';
import { Card } from '@/types/entities/card';

export default function NewestCardSection() {
  return (
    <section className='relative -mt-40 flex overflow-hidden pb-32 pt-72'>
      <div className='layout z-20 flex flex-col gap-16 md:items-center'>
        <Typography
          as='h1'
          variant='j1'
          color='purple-gradient'
          className='max-w-[16rem] md:max-w-none'
        >
          Newest Cards
        </Typography>

        <NewestCard />
      </div>
      <NextImage
        src='/images/background/dotted.png'
        width={1080}
        height={1080}
        alt='background'
        className='pointer-events-none absolute inset-x-0 top-0 z-10 w-full'
        imgClassName='w-full'
      />
      <div className='via-primary-950/20 pointer-events-none  absolute inset-0 bg-gradient-to-b from-transparent to-transparent'></div>
    </section>
  );
}

type NewestCardForm = {
  cardgame_id: string;
};

function NewestCard() {
  //#region  //*=========== Form ===========
  const methods = useForm<NewestCardForm>({
    mode: 'onChange',
    defaultValues: {
      cardgame_id: DEFAULT_CARD_GAME_ID,
    },
  });
  const { watch } = methods;
  const cardgame_id = watch('cardgame_id');
  //#endregion  //*======== Form ===========

  //#region  //*=========== Card Game Data ===========
  const {
    data: cardGameQueryData,
    isLoading: isCardGameDataLoading,
    isError: isCardGameDataError,
  } = useGetCardGameQuery();

  const cardGameOptions = React.useMemo(
    () =>
      generateOptions({
        data: cardGameQueryData?.response?.filter(
          ({ id }) => id !== +UNCATEGORIZED_ID
        ),
        key: { value: 'id', label: 'name' },
      }),
    [cardGameQueryData?.response]
  );
  //#endregion  //*======== Card Game Data ===========

  //#region  //*=========== Newest Card Data ===========
  const { paginationState } = usePagination({
    pageSize: 8,
  });
  const url = buildPaginationURL({
    baseUrl: '/product',
    paginationState,
    additionalParam: {
      cardgame_id: cardgame_id,
      sort: 'created_at',
      sort_order: 'desc',
    },
  });

  const {
    data: queryData,
    isLoading: isNewestCardDataLoading,
    isFetching: isNewestCardDataFetching,

    isError: isNewestCardDataError,
  } = useQuery<PaginatedApiResponse<Card[]>, Error>([url], {
    enabled: !!cardgame_id,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const shouldShowSkeleton =
    isNewestCardDataError ||
    isNewestCardDataLoading ||
    isNewestCardDataFetching;

  const newestCardData = queryData?.response.data ?? [];
  //#endregion  //*======== Newest Card Data ===========

  //#region  //*=========== Drag ===========
  const element =
    React.useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events: scrollEvent } = useDraggable(element, {
    applyRubberBandEffect: true,
  });
  //#endregion  //*======== Drag ===========

  return (
    <div className='flex w-full flex-col gap-6'>
      <FormProvider {...methods}>
        <form className='w-full'>
          <div
            className='scrollbar-hide flex items-center  gap-4 overflow-y-visible overflow-x-scroll py-2'
            {...scrollEvent}
            ref={element}
          >
            {isCardGameDataLoading || isCardGameDataError
              ? [...Array(5)].map((_, i) => <ButtonSkeleton key={i} />)
              : cardGameOptions.map((option, i) => (
                  <ButtonOption
                    key={isCardGameDataLoading ? i : option.value}
                    option={option}
                    showSkeleton={isCardGameDataLoading || isCardGameDataError}
                  />
                ))}
          </div>
        </form>
      </FormProvider>

      <div className='grid gap-4 md:-mx-2 md:grid-cols-3 lg:grid-cols-4'>
        {shouldShowSkeleton
          ? [...Array(8)].map((_, i) => <CardSkeleton key={i} />)
          : newestCardData.map((card) => (
              <CardView key={card.id} data={card} />
            ))}
      </div>

      <div className='flex justify-center'>
        <ButtonLink
          href={`/card-game/${cardgame_id}?type=card#card`}
          size='lg'
          variant='outline'
        >
          See More
        </ButtonLink>
      </div>
    </div>
  );
}

function ButtonOption({
  option,
  showSkeleton,
}: {
  option: SelectOptions;
  showSkeleton?: boolean;
}) {
  const { setValue, watch } = useFormContext();

  if (showSkeleton)
    return (
      <Skeleton className='min-h-[2.25rem] min-w-[10rem] rounded-full md:min-h-[2.5rem]' />
    );

  const isSelected = option.value === watch('cardgame_id');

  if (isSelected)
    return (
      <Button className='whitespace-nowrap hover:translate-y-0 hover:shadow-none'>
        {option.label}
      </Button>
    );

  return (
    <Button
      className='whitespace-nowrap hover:translate-y-0 hover:shadow-none'
      variant='outline'
      onClick={() => setValue('cardgame_id', option.value)}
    >
      {option.label}
    </Button>
  );
}

function ButtonSkeleton() {
  return (
    <Skeleton className='min-h-[2.25rem] min-w-[10rem] rounded-full md:min-h-[2.5rem]' />
  );
}
