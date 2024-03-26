import { XCircle } from 'lucide-react';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Input from '@/components/forms/Input';

type SearchForm = {
  search: string;
};

const DEBOUNCE_MS = 300;

export default function SearchCard({
  search,
  setSearch,
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
  //#region  //*=========== Form ===========
  const methods = useForm<SearchForm>({
    mode: 'onTouched',
    values: React.useMemo(() => ({ search: search }), [search]),
  });
  const { watch } = methods;

  const input = watch('search');
  //#endregion  //*======== Form ===========
  const handleResetInput = () => {
    setSearch('');
  };

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(input);
    }, DEBOUNCE_MS);
    return () => clearTimeout(timeout);
  }, [input, setSearch]);

  return (
    <FormProvider {...methods}>
      <Input
        id='search'
        label={null}
        placeholder='Search ...'
        rightNode={
          <button type='button' className='p-1' onClick={handleResetInput}>
            <XCircle className='text-typo-icons text-xl' />
          </button>
        }
      />
    </FormProvider>
  );
}
