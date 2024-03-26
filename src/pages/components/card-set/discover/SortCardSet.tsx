import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { SetPaginationState } from '@/lib/pagination';

import SearchableSelectInput from '@/components/forms/SearchableSelectInput';

type SortCardSet = {
  setState: SetPaginationState;
};

type SortCardSetFormSet = {
  sort: string;
};

export default function SortCardSet({ setState }: SortCardSet) {
  //#region  //*=========== Form ===========
  const methods = useForm<SortCardSetFormSet>({
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
        options={[{ label: 'Newest', value: 'newest' }]}
      />
    </FormProvider>
  );
}
