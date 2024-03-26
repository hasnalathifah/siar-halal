import { Transition } from '@headlessui/react';
import clsx from 'clsx';
import { Search } from 'lucide-react';
import { useRouter } from 'next/router';
import * as React from 'react';
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from 'react-hook-form';

import clsxm from '@/lib/clsxm';
import { generateOptions } from '@/lib/generate-options';
import logger from '@/lib/logger';
import { useGetCardGameQuery } from '@/hooks/query/card-game';

import Input from '@/components/forms/Input';
import { SelectOptions } from '@/components/forms/SearchableSelectInput';
import CardResult from '@/components/navigation/card/CardResult';
import CardSetResult from '@/components/navigation/card-set/CardSetResult';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/Popover';
import Typography from '@/components/typography/Typography';

import { UNCATEGORIZED_ID } from '@/constant/common';
import { DiscoverType } from '@/pages/components/discover/Discover';
import DiscoverTabs from '@/pages/components/discover/DiscoverTabs';

type SearchForm = {
  search: string;
  cardgame_id: string;
  cardgame_name: string;
};

export default function NavigationSearchInput() {
  const router = useRouter();

  const [show, setShow] = React.useState<boolean>(false);
  const [type, setType] = React.useState<DiscoverType>('card');

  //#region  //*=========== Card Game Data ===========
  const {
    data: cardGameQueryData,
    isLoading: isCardGameDataLoading,
    isError: isCardGameDataError,
  } = useGetCardGameQuery({ retry: 0 });

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

  //#region  //*=========== Form ===========
  const methods = useForm<SearchForm>({
    mode: 'onTouched',
    values: React.useMemo(
      () => ({
        cardgame_id: cardGameOptions?.[0]?.value,
        cardgame_name: cardGameOptions?.[0]?.label,
        search: '',
      }),
      [cardGameOptions]
    ),
  });
  const { handleSubmit, watch } = methods;

  const search = watch('search');
  const cardgame_name = watch('cardgame_name');
  const cardgame_id = watch('cardgame_id');
  //#endregion  //*======== Form ===========

  //#region  //*=========== Form Submit ===========
  const onSubmit: SubmitHandler<SearchForm> = (data) => {
    logger({ data }, 'search input');

    router.push(
      `/card-game/${cardgame_id}?type=${type}&search-${type}=${search}#${type}`,
      undefined,
      { shallow: true, scroll: true }
    );
    return;
  };
  //#endregion  //*======== Form Submit ===========

  //#region  //*=========== Show Result ===========
  const shouldShowResult = search?.length >= 3;

  const onInputFocus = () => {
    if (shouldShowResult) setShow(true);
    else return;
  };

  React.useEffect(() => {
    if (shouldShowResult) setShow(true);
    else setShow(false);
  }, [shouldShowResult]);
  //#endregion  //*======== Show Result ===========

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='relative z-10 flex w-full'
      >
        <Popover>
          <PopoverTrigger
            disabled={isCardGameDataLoading || isCardGameDataError}
            className={clsxm([
              'inline-flex items-center px-4',
              'min-h-[2.25rem] md:min-h-[2.5rem]',
              'border-typo-outline border-2 border-r-0',
              'bg-secondary-900 text-typo ',
              'hover:bg-secondary-800 active:bg-secondary-800 focus:outline-none',
              'transition-all duration-200 ease-out',
              'w-full max-w-[8rem]',
              show
                ? 'rounded-bl-none rounded-tl-[1.125rem] md:rounded-tl-[1.25rem]'
                : 'rounded-bl-full rounded-tl-full',
              'disabled:cursor-not-allowed',
            ])}
          >
            {isCardGameDataLoading ? (
              <span className='text-typo-tertiary'>loading...</span>
            ) : isCardGameDataError ? (
              <span className='text-typo-tertiary'>Error</span>
            ) : (
              <span className='truncate'>{cardgame_name}</span>
            )}
          </PopoverTrigger>
          <PopoverContent
            side='bottom'
            className={clsxm(['w-fit space-y-1 p-1'])}
          >
            {cardGameOptions?.map((option) => (
              <CardGameOption key={option.value} option={option} />
            ))}
          </PopoverContent>
        </Popover>

        <Input
          id='search'
          disabled={isCardGameDataLoading || isCardGameDataError}
          label={null}
          onFocus={onInputFocus}
          placeholder={`Partial Card Name + Set${
            cardgame_name ? ` in ${cardgame_name}` : ''
          }`}
          leftIcon={Search}
          className={clsx([
            ' focus:border-secondary-800 rounded-l-none focus:ring-0',
            show
              ? 'rounded-br-none rounded-tr-[1.125rem] md:rounded-tr-[1.25rem]'
              : 'rounded-br-full rounded-tr-full',
          ])}
          containerClassName='w-full'
        />

        <Transition
          as={React.Fragment}
          show={show}
          enter='transition ease-out duration-200'
          enterFrom='opacity-0 -translate-y-1'
          enterTo='opacity-100 translate-y-0'
          leave='transition ease-in duration-150'
          leaveFrom='opacity-100 translate-y-0'
          leaveTo='opacity-0 -translate-y-1'
        >
          <div
            className={clsx([
              'bg-secondary-900 border-typo-outline absolute inset-x-0 top-full z-10 w-full border-2 border-t-0',
              'overflow-hidden rounded-b-[1.125rem] md:rounded-b-[1.25rem]',
            ])}
          >
            <DiscoverTabs
              type={type}
              setType={setType}
              className='pl-4'
              size='sm'
            />
            {type === 'card' && (
              <CardResult cardgameId={cardgame_id} search={search} />
            )}
            {type === 'set' && (
              <CardSetResult cardgameId={cardgame_id} search={search} />
            )}
          </div>
        </Transition>
      </form>

      <div
        className={clsx([
          'fixed inset-0 bg-black bg-opacity-50 transition-opacity',
          show ? 'opacity-100' : 'pointer-events-none opacity-0',
        ])}
        onClick={() => setShow(false)}
      />
    </FormProvider>
  );
}

function CardGameOption({ option }: { option: SelectOptions }) {
  const { setValue, watch } = useFormContext<SearchForm>();

  const cardgame_id = watch('cardgame_id');

  const onUpdate = () => {
    setValue('cardgame_id', option.value);
    setValue('cardgame_name', option.label);
  };

  return (
    <button
      key={option.value}
      className={clsxm([
        'bg-secondary-800 hover:bg-secondary-900/30 flex w-full items-center gap-3 rounded-md  pr-8',
        +cardgame_id === +option.value && 'bg-primary-600 hover:bg-primary-700',
      ])}
      onClick={() => onUpdate()}
    >
      <div
        className={clsx([
          'h-8 w-8 ',
          'flex shrink-0 items-center justify-center rounded-md text-white',
          'from-secondary-900/50 to-secondary-900 bg-gradient-to-tr ',
        ])}
      >
        {option.label[0]}
      </div>
      <Typography variant='b3'>{option.label}</Typography>
    </button>
  );
}
