import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import clsxm from '@/lib/clsxm';
import { scrollToComponent } from '@/lib/helper';

import SearchableSelectInput, {
  SelectOptions,
} from '@/components/forms/SearchableSelectInput';

type RarityForm = {
  rarity: string;
};

type RaritySelectionInput = {
  options: SelectOptions[];
} & React.ComponentPropsWithoutRef<'div'>;
export default function RaritySelectionInput({
  options,
  className,
  ...rest
}: RaritySelectionInput) {
  //#region  //*=========== Form ===========
  const methods = useForm<RarityForm>({
    mode: 'onTouched',
    defaultValues: {},
  });
  const { watch } = methods;

  const rarity = watch('rarity');
  //#endregion  //*======== Form ===========

  React.useEffect(() => {
    setTimeout(() => scrollToComponent(rarity), 100);
  }, [rarity]);

  return (
    <header
      className={clsxm([
        'flex md:hidden',
        'bg-secondary-900 border-secondary-800 sticky top-[4.5rem] z-10 h-[3.25rem] items-center border-b',
        className,
      ])}
      {...rest}
    >
      <FormProvider {...methods}>
        <form className='layout z-10'>
          <SearchableSelectInput
            id='rarity'
            label={null}
            placeholder='Select Rarity'
            options={options}
          />
        </form>
      </FormProvider>

      <div className='bg-secondary-800/50 absolute inset-0 w-full' />
    </header>
  );
}
