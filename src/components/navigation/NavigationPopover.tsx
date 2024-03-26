import { Popover, Transition } from '@headlessui/react';
import React from 'react';
import { IconType } from 'react-icons';

import IconButton from '@/components/buttons/IconButton';

import { ExtractProps } from '@/types/helper';

type NavigationNavigationPopoverProps = {
  icon: IconType;
  children: React.ReactNode;
} & Omit<ExtractProps<typeof Popover>, 'children'>;

export default function NavigationPopover({
  icon: Icon,
  children,
  ...rest
}: NavigationNavigationPopoverProps) {
  return (
    <Popover {...rest}>
      <Popover.Button
        as={IconButton}
        variant='ghost'
        size='lg'
        icon={Icon}
        className='text-typo-secondary'
      />
      <Transition
        as={React.Fragment}
        enter='transition ease-out duration-200'
        enterFrom='opacity-0 -translate-y-1'
        enterTo='opacity-100 translate-y-0'
        leave='transition ease-in duration-150'
        leaveFrom='opacity-100 translate-y-0'
        leaveTo='opacity-0 -translate-y-1'
      >
        <Popover.Panel className='bg-secondary-950/80   absolute left-0 top-[calc(100%-1px)] z-10 w-screen backdrop-blur-md'>
          <div className='layout py-8'>{children}</div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
