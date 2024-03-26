import { useQuery } from '@tanstack/react-query';
import * as React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import Button from '@/components/buttons/Button';
import Modal from '@/components/Modal';
import Skeleton from '@/components/Skeleton';
import Typography from '@/components/typography/Typography';

import { DEFAULT_ICON } from '@/constant/icon';
import CategorySelectMobile from '@/pages/components/card-set/category/CategorySelectMobile';
import { FilterCardSetForm } from '@/pages/components/card-set/discover/DiscoverCardSet';
import { getCategoryFromId } from '@/pages/components/card-set/discover/helper';

import { ApiResponse } from '@/types/api';
import { Category } from '@/types/entities/category';

type FilterCardSetMobile = {
  children: (props: ModalReturnType) => JSX.Element;
  categoryId?: number;
  state: FilterCardSetForm;
  setState: React.Dispatch<React.SetStateAction<FilterCardSetForm>>;
};

//#region  //*=========== Type ===========
type ModalReturnType = {
  openModal: () => void;
};
//#endregion  //*======== Type ===========

export default function FilterCardSetMobile({
  children,
  categoryId,
  state,
  setState,
}: FilterCardSetMobile) {
  const [open, setOpen] = React.useState(false);

  const modalReturn: ModalReturnType = {
    openModal: () => setOpen(true),
  };

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

  const {
    formState: { isDirty },
    reset,
    handleSubmit,
  } = methods;
  //#endregion  //*======== Form ===========

  //#region  //*=========== Form Submit ===========
  const onSubmit: SubmitHandler<FilterCardSetForm> = (data) => {
    setState(data);
    setOpen(false);
  };

  const onReset = () => {
    setState({ category_id: '', category_name: '' });
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
              <div className='flex items-center  gap-2'>
                <DEFAULT_ICON.category className='text-xl' />
                <Typography variant='s2'>Category</Typography>
              </div>
              {isLoading ? (
                <Skeleton className='h-16 w-full' />
              ) : (
                <CategorySelectMobile data={categoryData} />
              )}
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
