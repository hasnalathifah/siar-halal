import * as React from 'react';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-secondary-900 flex flex-col'>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
