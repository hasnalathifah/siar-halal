import { Disclosure } from '@headlessui/react';
import clsx from 'clsx';
import { ChevronUp } from 'lucide-react';
import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { generateOptions } from '@/lib/generate-options';
import { useGetRarityByCardGame } from '@/hooks/query/rarity';

import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import SearchableSelectInput from '@/components/forms/SearchableSelectInput';
import Typography from '@/components/typography/Typography';

import { DEFAULT_ICON } from '@/constant/icon';
import { FilterCardForm } from '@/pages/components/card/discover/DiscoverCard';

type FilterCard = {
  cardGameId?: number;
  state: FilterCardForm;
  setState: React.Dispatch<React.SetStateAction<FilterCardForm>>;
} & React.ComponentPropsWithoutRef<'div'>;

export default function FilterCardDesktop({
  state,
  setState,
  cardGameId,
  className,
  ...rest
}: FilterCard) {
  //#region  //*=========== Form ===========
  const methods = useForm<FilterCardForm>({
    mode: 'onTouched',
    values: React.useMemo(() => state, [state]),
  });
  const {
    handleSubmit,
    formState: { isDirty },
    reset,
  } = methods;
  //#endregion  //*======== Form ===========

  //#region  //*=========== Rarity Data ===========
  const { data: rarityQueryData, isFetching: isRarityDataFetching } =
    useGetRarityByCardGame({ cardgame_id: cardGameId });

  const rarityOptions = React.useMemo(
    () =>
      generateOptions({
        data: rarityQueryData?.response,
        key: { value: 'id', label: 'name' },
      }) ?? [],
    [rarityQueryData?.response]
  );
  //#endregion  //*======== Rarity Data ===========

  //#region  //*=========== Form Submit ===========
  const onSubmit: SubmitHandler<FilterCardForm> = (data) => {
    setState(data);
  };
  //#endregion  //*======== Form Submit ===========

  const onReset = () => {
    setState({ price_max: '', price_min: '', rarity_id: '' });
    reset();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <div
          className={clsx([
            'flex flex-col gap-3',
            'bg-secondary-900 w-full rounded-2xl p-3',
            'border-typo-outline border-2',
            className,
          ])}
          {...rest}
        >
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button
                  as={Button}
                  variant='ghost'
                  size='sm'
                  className='w-full justify-between rounded-lg text-left'
                  rightIcon={ChevronUp}
                  rightIconClassName={clsx([
                    open ? 'rotate-180 transform' : '',
                    'w-5 ml-auto',
                  ])}
                >
                  <div className='flex items-center  gap-2'>
                    <DEFAULT_ICON.price className='text-xl' />
                    <Typography variant='s2'>Price</Typography>
                  </div>
                </Disclosure.Button>
                <Disclosure.Panel className='flex items-center gap-1 pt-0'>
                  <Input
                    inputMode='numeric'
                    id='price_min'
                    label={null}
                    placeholder='min'
                  />
                  <Typography variant='s3'>-</Typography>
                  <Input
                    inputMode='numeric'
                    id='price_max'
                    label={null}
                    placeholder='max'
                  />
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <hr className='bg-typo-outline h-[2px] w-full border-none' />
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button
                  as={Button}
                  variant='ghost'
                  size='sm'
                  className='w-full justify-between rounded-lg text-left'
                  rightIcon={ChevronUp}
                  rightIconClassName={clsx([
                    open ? 'rotate-180 transform' : '',
                    'w-5 ml-auto',
                  ])}
                >
                  <div className='flex items-center  gap-2'>
                    <DEFAULT_ICON.rarity className='text-xl' />
                    <Typography variant='s2'>Rarity</Typography>
                  </div>
                </Disclosure.Button>
                <Disclosure.Panel className='pb-2'>
                  <SearchableSelectInput
                    id='rarity_id'
                    label={null}
                    placeholder='Select Rarity'
                    options={rarityOptions}
                    isLoading={isRarityDataFetching}
                  />
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>

        <div className='flex items-center gap-2'>
          <Button variant='outline' onClick={onReset}>
            Reset
          </Button>
          {isDirty && (
            <Button
              type='submit'
              variant={isDirty ? 'primary' : 'light'}
              disabled={!isDirty}
            >
              Apply
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
