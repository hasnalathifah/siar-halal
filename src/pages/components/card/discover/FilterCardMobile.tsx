import * as React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { generateOptions } from '@/lib/generate-options';
import { useGetRarityByCardGame } from '@/hooks/query/rarity';

import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import SearchableSelectInput from '@/components/forms/SearchableSelectInput';
import Modal from '@/components/Modal';
import Typography from '@/components/typography/Typography';

import { DEFAULT_ICON } from '@/constant/icon';
import { FilterCardForm } from '@/pages/components/card/discover/DiscoverCard';

type FilterCardMobile = {
  children: (props: ModalReturnType) => JSX.Element;
  cardGameId?: number;
  state: FilterCardForm;
  setState: React.Dispatch<React.SetStateAction<FilterCardForm>>;
};

//#region  //*=========== Type ===========
type ModalReturnType = {
  openModal: () => void;
};
//#endregion  //*======== Type ===========

export default function FilterCardMobile({
  children,
  state,
  setState,
  cardGameId,
}: FilterCardMobile) {
  const [open, setOpen] = React.useState(false);

  const modalReturn: ModalReturnType = {
    openModal: () => setOpen(true),
  };

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
    setOpen(false);
  };

  const onReset = () => {
    setState({ price_max: '', price_min: '', rarity_id: '' });
    reset();
    setOpen(false);
  };
  //#endregion  //*======== Form Submit ===========

  return (
    <>
      {children(modalReturn)}

      <Modal
        open={open}
        setOpen={setOpen}
        title='Filter'
        containerClassName='overflow-y-visible w-full'
      >
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='divide-typo-divider w-full divide-y'
          >
            <Modal.Section className='gap-4'>
              <div className='flex items-center gap-2'>
                <DEFAULT_ICON.price className='text-xl' />
                <Typography variant='s2'>Price</Typography>
              </div>
              <div className='flex flex-row items-center gap-1'>
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
              </div>
            </Modal.Section>
            <Modal.Section className='gap-4'>
              <div className='flex items-center gap-2'>
                <DEFAULT_ICON.rarity className='text-xl' />
                <Typography variant='s2'>Rarity</Typography>
              </div>
              <SearchableSelectInput
                id='rarity_id'
                label={null}
                placeholder='Select Rarity'
                options={rarityOptions}
                isLoading={isRarityDataFetching}
              />
            </Modal.Section>
            <Modal.Section className='flex flex-row justify-end gap-2'>
              <Button variant='outline' onClick={onReset}>
                Reset
              </Button>
              <Button
                type='submit'
                variant={isDirty ? 'primary' : 'light'}
                disabled={!isDirty}
              >
                Apply
              </Button>
            </Modal.Section>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
}
