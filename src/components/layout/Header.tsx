import { Menu } from 'lucide-react';
import * as React from 'react';

import NavigationActionButton from '@/components/navigation/NavigationActionButton';
import NavigationLogo from '@/components/navigation/NavigationLogo';
import NavigationPopover from '@/components/navigation/NavigationPopover';
import NavigationSearchInput from '@/components/navigation/NavigationSearch';

export const links = [
  { href: '/', label: 'Discover' },
  { href: '/', label: 'About' },
];

export default function Header() {
  return (
    <header className='bg-secondary-900 sticky top-0 z-[100]'>
      {/* Desktop Navigation */}
      <div className='layout hidden h-[4.5rem] items-center gap-4 md:flex'>
        <div className='divide-typo-divider flex items-center space-x-6 divide-x-[1px]'>
          <NavigationLogo href='/' />
        </div>
        <NavigationSearchInput />

        <NavigationActionButton />
      </div>
      {/* Mobile Navigation */}
      <div className='layout flex h-[4.5rem] items-center justify-between md:hidden'>
        <NavigationLogo href='/' />
        <div className='flex gap-2'>
          <NavigationPopover icon={Menu}>
            <NavigationSearchInput />
            <NavigationActionButton />
          </NavigationPopover>
        </div>
      </div>
      <hr className='border-typo-divider absolute inset-x-0 bottom-0 h-[1px] w-full' />
    </header>
  );
}
