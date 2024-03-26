import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { IconType } from 'react-icons';

import clsxm from '@/lib/clsxm';

import Typography from '@/components/typography/Typography';

import { DEFAULT_ICON } from '@/constant/icon';
import { DiscoverType } from '@/pages/components/discover/Discover';

type DiscoverOptionsType = {
  icon: IconType;
  value: DiscoverType;
  title: string;
};

export const DISCOVER_OPTIONS: DiscoverOptionsType[] = [
  {
    icon: DEFAULT_ICON.card,
    value: 'card',
    title: 'Card',
  },
  {
    icon: DEFAULT_ICON['card-set'],
    value: 'set',
    title: 'Card Set',
  },
];

type DiscoverTabsForm = {
  discover: DiscoverType;
};

export default function DiscoverTabs({
  type,
  setType,
  className,
  size = 'base',
}: {
  type?: DiscoverType;
  setType: React.Dispatch<React.SetStateAction<DiscoverType>>;
  className?: string;
  size?: 'sm' | 'base';
}) {
  //#region  //*=========== Form ===========
  const methods = useForm<DiscoverTabsForm>({
    mode: 'onTouched',
    defaultValues: {
      discover: type ?? 'card',
    },
  });
  const { watch, setValue } = methods;

  const discover = watch('discover');
  //#endregion  //*======== Form ===========

  //#region  //*=========== Update Value ===========
  const getSelectedIndex = DISCOVER_OPTIONS.findIndex(
    ({ value }) => value === discover
  );

  const handleOnChange = (index: number) => {
    setValue('discover', DISCOVER_OPTIONS[index].value);
  };

  React.useEffect(() => {
    setType(discover);
  }, [discover, setType]);

  //#endregion  //*======== Update Value ===========

  return (
    <FormProvider {...methods}>
      <Tab.Group
        as='div'
        className={clsxm(['border-secondary-800 w-full border-b-2', className])}
        selectedIndex={getSelectedIndex}
        onChange={handleOnChange}
      >
        <Tab.List className='flex'>
          {DISCOVER_OPTIONS.map((data) => (
            <DiscoverTab key={data.value} size={size} {...data} />
          ))}
        </Tab.List>
      </Tab.Group>
    </FormProvider>
  );
}

function DiscoverTab({
  icon: Icon,
  value,
  title,
  size,
}: DiscoverOptionsType & { size?: 'sm' | 'base' }) {
  return (
    <Tab
      as='button'
      key={value}
      className={({ selected }) =>
        clsx(
          'flex items-center gap-2 border-b-4  px-3 py-2 transition-all duration-200 md:gap-3',
          ' focus:text-primary-200 focus:shadow focus:outline-none',
          selected ? 'border-b-primary-500' : 'border-b-transparent'
        )
      }
    >
      <Icon
        className={clsx(
          [size === 'base' && 'text-lg'],
          [size === 'sm' && 'text-base']
        )}
      />
      <Typography
        variant={size === 'base' ? 's1' : 's3'}
        className='text-inherit'
      >
        {' '}
        {title}
      </Typography>
    </Tab>
  );
}
