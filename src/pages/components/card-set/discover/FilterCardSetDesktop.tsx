import { Disclosure } from '@headlessui/react';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { ChevronUp } from 'lucide-react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Button from '@/components/buttons/Button';
import Skeleton from '@/components/Skeleton';
import Tag from '@/components/Tag';
import Typography from '@/components/typography/Typography';

import { DEFAULT_ICON } from '@/constant/icon';
import CategorySelectDesktop from '@/pages/components/card-set/category/CategorySelectDesktop';
import { FilterCardSetForm } from '@/pages/components/card-set/discover/DiscoverCardSet';
import { getCategoryFromId } from '@/pages/components/card-set/discover/helper';

import { ApiResponse } from '@/types/api';
import { Category } from '@/types/entities/category';

type FilterCardSet = {
  categoryId?: number;
  state: FilterCardSetForm;
  setState: React.Dispatch<React.SetStateAction<FilterCardSetForm>>;
} & React.ComponentPropsWithoutRef<'div'>;

export default function FilterCardSetDesktop({
  categoryId,
  state,
  setState,
  className,
  ...rest
}: FilterCardSet) {
  //#region  //*=========== Fetch Data ===========
  const { data: queryData, isLoading } = useQuery<
    ApiResponse<Category[]>,
    Error
  >(['/category/user']);

  const categoryData =
    getCategoryFromId(queryData?.response, categoryId)?.child ?? [];
  //#endregion  //*======== Fetch Data ===========

  //#region  //*=========== Form ===========
  const methods = useForm<FilterCardSetForm>({
    mode: 'onTouched',
    values: React.useMemo(() => state, [state]),
  });
  const { watch, reset } = methods;

  const category_id = watch('category_id');
  const category_name = watch('category_name');
  //#endregion  //*======== Form ===========

  React.useEffect(() => {
    setState({ category_id: category_id, category_name: category_name });
  }, [category_id, category_name, setState]);

  const onReset = () => {
    setState({ category_id: '', category_name: '' });
    reset();
  };

  return (
    <FormProvider {...methods}>
      <form className='flex flex-col gap-4'>
        <div
          className={clsx([
            'flex flex-col gap-3',
            'bg-secondary-900 w-full rounded-2xl p-3',
            'border-typo-outline border-2',
            className,
          ])}
          {...rest}
        >
          <Disclosure defaultOpen={true}>
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
                  <div className='flex items-center gap-2'>
                    <DEFAULT_ICON.category className='text-xl' />
                    <Typography variant='s2'>Category</Typography>
                  </div>
                </Disclosure.Button>
                <Disclosure.Panel className=' pt-0'>
                  {isLoading ? (
                    <Skeleton className='h-16 w-full' />
                  ) : (
                    <CategorySelectDesktop data={categoryData} />
                  )}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          {category_name && (
            <div className='flex flex-col gap-1'>
              <Typography variant='c1' className='whitespace-nowrap'>
                Active Filter
              </Typography>
              <Tag className='truncate' color='DEFAULT'>
                {category_name}
              </Tag>
            </div>
          )}
        </div>

        <div className='flex items-center gap-2'>
          <Button variant='outline' onClick={onReset}>
            Reset
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
