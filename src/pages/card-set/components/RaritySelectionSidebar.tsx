import { Tab } from '@headlessui/react';
import * as React from 'react';

import clsxm from '@/lib/clsxm';

import { SelectOptions } from '@/components/forms/SearchableSelectInput';
import UnstyledLink from '@/components/links/UnstyledLink';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/Tooltip';
import Typography from '@/components/typography/Typography';

type RaritySelectionSidebar = {
  options: SelectOptions[];
} & React.ComponentPropsWithoutRef<'div'>;

export default function RaritySelectionSidebar({
  options,
  className,
  ...rest
}: RaritySelectionSidebar) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleChangedTabs = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div
      className={clsxm([
        'ml-4 hidden md:flex',
        'relative flex-col pr-2',
        'sticky top-[calc(4.5rem+3.25rem)] h-[calc(100vh-4.5rem-3.25rem)]',
        'max-w-[4rem]',
        className,
      ])}
      {...rest}
    >
      <Tab.Group
        vertical
        selectedIndex={selectedIndex}
        onChange={(index) => handleChangedTabs(index)}
      >
        <TooltipProvider delayDuration={100}>
          <Tab.List className='z-10 mt-4 flex w-full flex-col gap-2'>
            {options.map(({ value, label }) => (
              <Tab
                key={value}
                as={UnstyledLink}
                nextLinkProps={{ replace: true }}
                href={`#${value}`}
                className='group focus:outline-none'
              >
                {({ selected }) => (
                  <div
                    className={clsxm([
                      'w-full pl-2',
                      'border-l-2 border-transparent',
                      selected
                        ? 'border-primary-400'
                        : 'group-hover:border-typo-outline',
                    ])}
                  >
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Typography
                          variant='s3'
                          className={clsxm([
                            'truncate font-medium uppercase tracking-wider',
                            selected
                              ? 'text-primary-400'
                              : 'text-typo-tertiary group-hover:text-typo-secondary',
                          ])}
                        >
                          {label}
                        </Typography>
                      </TooltipTrigger>
                      <TooltipContent side='left'>
                        <Typography variant='b3'>{label}</Typography>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                )}
              </Tab>
            ))}
          </Tab.List>
        </TooltipProvider>
      </Tab.Group>
    </div>
  );
}
