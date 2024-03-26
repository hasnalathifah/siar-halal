import { Disclosure } from '@headlessui/react';
import clsx from 'clsx';
import { Check, ChevronDown } from 'lucide-react';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';

import clsxm from '@/lib/clsxm';

import { FilterCardSetForm } from '@/pages/components/card-set/discover/DiscoverCardSet';

import { Category } from '@/types/entities/category';

export default function CategorySelectMobile({ data }: { data: Category[] }) {
  return (
    <div className='bg-secondary-900 border-typo-outline flex max-h-[50vh] flex-col overflow-y-scroll rounded-md border-2 p-1'>
      {data.map((language) => (
        <React.Fragment key={language.id}>
          {language.child ? (
            <NestedCategory key={language.name} data={language} />
          ) : (
            <CategoryButton key={language.name} data={language} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function NestedCategory({ data }: { data: Category }) {
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
    <Disclosure as='div' defaultOpen={checkActive(data.child)}>
      {({ open }) => (
        <div>
          <Disclosure.Button
            className={clsx(
              'w-full',
              'focus:bg-secondary-800 focus:text-typo relative',
              'flex select-none items-center rounded-sm px-3 py-1.5',
              'text-base font-medium outline-none',
              'hover:bg-secondary-800'
            )}
          >
            <span className={clsx('text-left', !open && 'truncate')}>
              {data.name}
            </span>
            <ChevronDown
              size={18}
              className={clsx(
                'flex-shrink-0',
                'text-typo ml-auto',
                open && 'mt-[1px] rotate-180 self-start'
              )}
            />
          </Disclosure.Button>
          <Disclosure.Panel className={clsx(['mt-1 space-y-0.5', 'ml-7'])}>
            {data.child?.map((item, i) => (
              <div
                className={clsxm([
                  'relative',

                  //* horizontal line
                  "before:bg-typo-divider before:absolute before:content-['']",
                  'before:-left-3',
                  // hack for nested navigation
                  item.child
                    ? 'before:top-[18px]'
                    : 'before:top-1/2 before:-translate-y-1/2',
                  'before:h-px before:w-3',

                  //* vertical line
                  "after:bg-typo-divider after:absolute after:content-['']",
                  'after:-left-3 after:top-1/2 after:-translate-y-1/2',
                  'after:h-[calc(100%+4px)] after:w-px',

                  // last child
                  i === (data.child?.length ?? 0) - 1 && [
                    item.child ? 'after:h-[22px]' : 'after:h-[calc(50%+4px)]',
                    'after:top-0 after:-translate-y-1',
                  ],
                ])}
                key={item.name}
              >
                {item.child ? (
                  <NestedCategory data={item} />
                ) : (
                  <CategoryButton data={item} />
                )}
              </div>
            ))}
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}

function CategoryButton({ data }: { data: Category }) {
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
        'w-full shrink-0 text-left',
        ' focus:text-typo relative',
        'flex select-none items-center rounded-sm px-3 py-1.5',
        'text-base font-medium outline-none',

        isSelected
          ? 'bg-primary-800 hover:bg-primary-700 focus:bg-primary-800 pl-8'
          : 'focus:bg-secondary-800 hover:bg-secondary-800 truncate',
      ])}
    >
      {isSelected && (
        <Check className='absolute left-2  top-1/2 h-4 w-4 -translate-y-1/2' />
      )}
      {data.name}
    </button>
  );
}
