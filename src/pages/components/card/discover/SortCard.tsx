import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { SetPaginationState } from '@/lib/pagination';

import SearchableSelectInput from '@/components/forms/SearchableSelectInput';

type SortCard = {
  setState: SetPaginationState;
};

type SortCardForm = {
  sort: string;
};

export default function SortCard({ setState }: SortCard) {
  //#region  //*=========== Form ===========
  const methods = useForm<SortCardForm>({
    mode: 'onTouched',
  });
  const { watch } = methods;
  const sort = watch('sort');
  //#endregion  //*======== Form ===========

  React.useEffect(() => {
    const sortQuery = (() => {
      switch (sort) {
        case 'newest':
          return {
            id: 'created_at',
            desc: true,
          };
        case 'highest-price':
          return {
            id: 'price',
            desc: true,
          };
        case 'lowest-price':
          return {
            id: 'price',
            desc: false,
          };
        default:
          return null;
      }
    })();

    if (sortQuery) {
      setState.setSorting([sortQuery]);
    } else {
      setState.setSorting([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  return (
    <FormProvider {...methods}>
      <SearchableSelectInput
        id='sort'
        label={null}
        placeholder='Sort by'
        options={[
          { label: 'Newest', value: 'newest' },
          {
            label: 'Highest Price',
            value: 'highest-price',
          },
          {
            label: 'Lowest Price',
            value: 'lowest-price',
          },
        ]}
      />
    </FormProvider>
  );
}
