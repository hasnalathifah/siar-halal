import * as React from 'react';

import withAuth from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import LandingSection from '@/pages/landing/LandingSection';
import NewestCardSection from '@/pages/landing/NewestCardSection';

export default withAuth('optional')(IndexPage);
function IndexPage() {
  return (
    <Layout>
      <Seo />

      <main className='flex flex-col'>
        <LandingSection />
        <NewestCardSection />
      </main>
    </Layout>
  );
}
