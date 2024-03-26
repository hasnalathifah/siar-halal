import clsx from 'clsx';
import { Check } from 'lucide-react';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';

import clsxm from '@/lib/clsxm';

import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/components/Menubar';

import { FilterCardSetForm } from '@/pages/components/card-set/discover/DiscoverCardSet';

import { Category } from '@/types/entities/category';

type CategoryProps = { data: Category[] };
export default function CategorySelectDesktop({ data }: CategoryProps) {
  return (
    <Menubar>
      {data.map((language) => (
        <React.Fragment key={language.id}>
          {language?.child ? (
            <CategoryMenu data={language} />
          ) : (
            <CategoryItem data={language} />
          )}
        </React.Fragment>
      ))}
    </Menubar>
  );
}

function CategoryItem({
  data,
  type = 'main',
}: {
  data: Category;
  type?: 'main' | 'sub';
}) {
  const { watch, setValue } = useFormContext<FilterCardSetForm>();

  const value = watch('category_id');
  const isSelected = data.id === +value;

  return (
    <button
      type='button'
      onClick={() => {
        setValue('category_id', data.id + '', { shouldDirty: true });
        setValue('category_name', data.name, { shouldDirty: true });
      }}
      className={clsxm([
        'w-full',
        ' focus:text-typo relative',
        'flex select-none items-center rounded-sm px-3 py-1.5',
        'text-base font-medium outline-none',
        [type === 'main' && 'focus:bg-secondary-800 hover:bg-secondary-800'],
        [type === 'sub' && 'focus:bg-secondary-900 hover:bg-secondary-900'],

        isSelected &&
          'bg-primary-800 hover:bg-primary-700 focus:bg-primary-800 pl-8',
      ])}
    >
      {isSelected && (
        <Check className='absolute left-2  top-1/2 h-4 w-4 -translate-y-1/2' />
      )}
      {data.name}
    </button>
  );
}

function CategoryMenu({ data }: { data: Category }) {
  const { watch } = useFormContext<FilterCardSetForm>();

  const value = watch('category_id');

  // Recursively check if any children is active
  function checkActive(category: Category[] | null): boolean {
    if (!category) return false;

    return category.some((c) => {
      if (!c.child) {
        const isActive = c.id === +value;

        return isActive;
      }

      return checkActive(c.child);
    });
  }

  return (
    <MenubarMenu>
      <MenubarTrigger
        className={clsx([
          checkActive(data.child) && [
            'bg-primary-800 hover:bg-primary-700 focus:bg-primary-800 ',
            'data-[state=open]:bg-primary-700',
          ],
        ])}
      >
        {data.name}
      </MenubarTrigger>
      <MenubarContent side='right'>
        {data?.child?.map((category) => (
          <React.Fragment key={category.id}>
            {category.child ? (
              <CategorySubMenu data={category} />
            ) : (
              <CategoryItem data={category} type='sub' />
            )}
          </React.Fragment>
        ))}
      </MenubarContent>
    </MenubarMenu>
  );
}

function CategorySubMenu({ data }: { data: Category }) {
  const { watch } = useFormContext<FilterCardSetForm>();

  const value = watch('category_id');

  // Recursively check if any children is active
  function checkActive(category: Category[] | null): boolean {
    if (!category) return false;

    return category.some((c) => {
      if (!c.child) {
        const isActive = c.id === +value;

        return isActive;
      }

      return checkActive(c.child);
    });
  }

  return (
    <MenubarSub>
      <MenubarSubTrigger
        className={clsx([
          checkActive(data.child) && [
            'bg-primary-800 hover:bg-primary-700 focus:bg-primary-800 ',
            'data-[state=open]:bg-primary-700',
          ],
        ])}
      >
        {data.name}{' '}
      </MenubarSubTrigger>
      <MenubarSubContent>
        {data?.child?.map((category) => (
          <React.Fragment key={category.id}>
            {category.child ? (
              <CategorySubMenu data={category} />
            ) : (
              <CategoryItem data={category} type='sub' />
            )}
          </React.Fragment>
        ))}
      </MenubarSubContent>
    </MenubarSub>
  );
}
